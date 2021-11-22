const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const Blog = require("../mongo_models/Blog")
const User = require("../mongo_models/User")

const api = supertest(app)

describe("when there is initially some blogs saved", () => {
  let token = ""
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const user = new User({
      username: "root",
      password: "admin",
      name: "test",
    })
    const savedUser = await user.save()
    const userForToken = {
      username: "root",
      id: savedUser._id,
    }
    token = await jwt.sign(userForToken, process.env.SECRET, { expiresIn: 15 })
    for (let blog of helper.initialBlogs) {
      const newBlogWithId = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.author,
        likes: blog.likes,
        user: savedUser._id,
      })
      await newBlogWithId.save()
    }
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs returned", async () => {
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  })

  test("a specific blog is in db", async () => {
    const response = await helper.blogsInDb()
    const titles = response.map((n) => n.title)
    expect(titles).toContainEqual("The most boring blog")
  })

  test("blog contain id but not _id", async () => {
    const response = await helper.blogsInDb()
    const blog = response[0]
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
  })

  describe("Viewing a specifing blog", () => {
    test("valid id", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
      expect(resultBlog.body.id).toBe(processedBlogToView.id)
      expect(resultBlog.body.user.id).toBe(processedBlogToView.user)
    })

    test("fails with non existing id", async () => {
      const nonId = await helper.nonExistId()
      await api.get(`/api/blogs/${nonId}`).expect(404)
    })

    test("fails with invalid id", async () => {
      invalidId = "a"
      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe("adding a new blog", () => {
    test("a valid blog can be added", async () => {
      const newBlog = {
        title: "Some blog",
        author: "System",
        url: "Blabla",
        likes: 0,
      }
      await api
        .post("/api/blogs")
        .set("authorization", String("bearer " + token))
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map((n) => n.title)
      expect(contents).toContainEqual("Some blog")
    })

    test("if there are not likes in blog to post", async () => {
      const newBlog = {
        title: "Some blog",
        author: "System",
        url: "Blabla",
      }
      await api
        .post("/api/blogs")
        .set("authorization", String("bearer " + token))
        .send(newBlog)
        .expect(201)

      const lastBlog = await Blog.findOne({ title: "Some blog" })
      expect(lastBlog.likes).toBe(0)
    })

    test("validation error in blog", async () => {
      const newBlog = {
        author: "System",
        url: "Blabla",
      }
      await api
        .post("/api/blogs")
        .set("authorization", String("bearer " + token))
        .send(newBlog)
        .expect(400)
    })
  })

  describe("deleting a blog", () => {
    test("delete a valid blog", async () => {
      const newBlog = {
        title: "To delete",
        author: "System",
        url: "Blabla",
      }
      await api
        .post("/api/blogs")
        .set("authorization", String("bearer " + token))
        .send(newBlog)
      const blog = await Blog.findOne({ title: "To delete" })
      const id = blog._id.toString()
      await api
        .delete(`/api/blogs/${id}`)
        .set("authorization", String("bearer " + token))
        .expect(204)
    })

    test("delete non existing id", async () => {
      const id = await helper.nonExistId()
      await api
        .delete(`/api/blogs/${id}`)
        .set("authorization", String("bearer " + token))
        .expect(404)
    })

    test("delete invalid id", async () => {
      const id = "asd"
      await api
        .delete(`/api/blogs/${id}`)
        .set("authorization", String("bearer " + token))
        .expect(400)
    })
  })

  describe("modifying a blog", () => {
    test("normal valid modify", async () => {
      const newBlog = {
        title: "To modify",
        author: "System",
        url: "Blabla",
      }
      const blog = await api
        .post("/api/blogs")
        .set("authorization", String("bearer " + token))
        .send(newBlog)
      const toUpdate = {
        title: "HEHEHE",
        author: "Dereden",
        url: "ASDASD",
        likes: 0,
      }
      const updated = await api
        .put(`/api/blogs/${blog.body.id}`)
        .set("authorization", String("bearer " + token))
        .send(toUpdate)
      expect(updated.body.author).toEqual("Dereden")
    })

    test("try to modify non exist id", async () => {
      const id = await helper.nonExistId()
      const toUpdate = {
        title: "HEHEHE",
        author: "Dereden",
        url: "ASDASD",
      }
      const updated = await api
        .put(`/api/blogs/${id}`)
        .set("authorization", String("bearer " + token))
        .send(toUpdate)
        .expect(404)
    })

    test("try to modify invalid id", async () => {
      const id = "asd123asd"
      const toUpdate = {
        title: "HEHEHE",
        author: "Dereden",
        url: "ASDASD",
      }
      const updated = await api
        .put(`/api/blogs/${id}`)
        .set("authorization", String("bearer " + token))
        .send(toUpdate)
        .expect(400)
    })

    test("modifying other users blogs", async () => {
      const newBlog = {
        title: "To modify",
        author: "System",
        url: "Blabla",
      }
      const blog = await api
        .post("/api/blogs")
        .set("authorization", String("bearer " + token))
        .send(newBlog)
      const toUpdate = {
        title: "HEHEHE",
        author: "Dereden",
        url: "ASDASD",
        likes: 0,
      }

      const newUser = new User({
        username: "other",
        password: "qwe",
        name: "other",
      })
      const savedUser = await newUser.save()
      const userForToken = {
        username: "root",
        id: savedUser._id,
      }
      newToken = await jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 5,
      })
      await api
        .put(`/api/blogs/${blog.body.id}`)
        .set("authorization", String("bearer " + newToken))
        .send(toUpdate)
        .expect(403)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
