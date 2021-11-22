describe("Blog app", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.visit("http://localhost:3000")
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "root",
      password: "root",
      name: "Denis",
    })
  })

  it("Login form is shown", () => {
    cy.contains("log in").click()
    cy.contains("Username")
    cy.contains("Password")
  })

  describe("Login", () => {
    it("succeeds with correct credentials", () => {
      cy.contains("log in").click()
      cy.get("#username").type("root")
      cy.get("#password").type("root")
      cy.get("#login-button").click()

      cy.contains("Denis logged in")
    })

    it("fails with wrong credentials", () => {
      cy.contains("log in").click()
      cy.get("#username").type("asdasd")
      cy.get("#password").type("asdasd")
      cy.get("#login-button").click()

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("after logging in and adding 1 blog", () => {
    beforeEach(() => {
      cy.contains("log in").click()
      cy.get("#username").type("root")
      cy.get("#password").type("root")
      cy.get("#login-button").click()
      cy.contains("Create new blog").click()
      cy.get("#title").type("New title")
      cy.get("#author").type("New author")
      cy.get("#url").type("New url")
      cy.get("#add-blog-button").click()
    })

    it("blog can be added and liked", () => {
      cy.contains("New title")

      cy.contains("show").click()
      cy.get("#like-button").click()
      cy.contains("Likes: 1")
    })

    it("blog can be deleted", () => {
      cy.contains("show").click()
      cy.get("#delete-button").click()

      cy.get("html").should("not.contain", "New title")
    })

    it("blog with most likes is the first", () => {
      cy.contains("Create new blog").click()
      cy.get("#title").type("Should be the first")
      cy.get("#author").type("First author")
      cy.get("#url").type("New url")
      cy.get("#add-blog-button").click()
      cy.wait(1000)

      cy.get(".blog").should("have.length", 2)
      cy.get(".blog").then(blogs =>
        cy.wrap(blogs[0]).should("contain", "New title")
      )
      cy.contains("Should be the first").parent().as("secondBlog")
      cy.get("@secondBlog").contains("show").click()
      cy.get("@secondBlog").contains("like").click()
      cy.wait(3000)
      cy.get(".blog").then(blogs => {
        console.log(blogs)
        cy.wrap(blogs[0]).should("contain", "Should be the first")
      })
    })
  })
})
