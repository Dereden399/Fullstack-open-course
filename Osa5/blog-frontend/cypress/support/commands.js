Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.contains("Create new blog").click()
  cy.get("#title").type(title)
  cy.get("#author").type(author)
  cy.get("#url").type(url)
  cy.get("#add-blog-button").click()
})
