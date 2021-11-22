import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./blogForm"

test("adding new blog function works", () => {
  const createBlogHandler = jest.fn()
  const component = render(<BlogForm createBlog={createBlogHandler} />)

  const title = component.container.querySelector("#title")
  const author = component.container.querySelector("#author")
  const url = component.container.querySelector("#url")
  fireEvent.change(title, {
    target: {
      value: "some title",
    },
  })
  fireEvent.change(author, {
    target: {
      value: "some author",
    },
  })
  fireEvent.change(url, {
    target: {
      value: "some url",
    },
  })

  const form = component.container.querySelector("form")
  fireEvent.submit(form)

  expect(createBlogHandler.mock.calls).toHaveLength(1)
  expect(createBlogHandler.mock.calls[0][0]["title"]).toBe("some title")
  expect(createBlogHandler.mock.calls[0][0]["author"]).toBe("some author")
  expect(createBlogHandler.mock.calls[0][0]["url"]).toBe("some url")
})
