const blogsRouter = require("express").Router()
const Blog = require("../mongo_models/Blog")
const User = require("../mongo_models/User")

const jwt = require("jsonwebtoken")
const { concat } = require("lodash")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  if (blog) {
    res.status(200).json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post("/", async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.tokenId,
  })
  const result = await blog.save()
  await result.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  const user = await User.findById(req.tokenId)
  user.blogs = user.blogs.concat(result._id)
  await user.save({ validateModifiedOnly: true })

  res.status(201).json(result.toJSON())
})

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const findedBlog = await Blog.findById(req.params.id)
  if (!findedBlog) {
    return res.status(404).end()
  }
  if (findedBlog.user.toString() !== req.tokenId.toString()) {
    return res.status(403).json({ error: "Can not modify another users blog" })
  }
  findedBlog.title = body.title
  findedBlog.author = body.author
  findedBlog.url = body.url
  findedBlog.likes = body.likes
  const updatedBlog = await findedBlog.save()
  res.status(200).json(updatedBlog.toJSON())
})

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const findedBlog = await Blog.findById(id)
  if (!findedBlog) {
    return res.status(404).end()
  }
  if (findedBlog.user.toString() !== req.tokenId.toString()) {
    return res.status(403).json({ error: "Can not delete another users blog" })
  }
  await findedBlog.delete()
  const user = await User.findById(req.tokenId)
  const result = await findedBlog.delete()
  user.blogs = user.blogs.filter(x => {
    return x.toString() !== id
  })
  await user.save({ validateModifiedOnly: true })
  res.status(204).end()
})

module.exports = blogsRouter
