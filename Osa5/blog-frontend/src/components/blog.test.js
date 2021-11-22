import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./blog"

describe("Blog component test", () => {
  let component
  const likeHandler = jest.fn()
  beforeEach(() => {
    const blogData = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 0,
      user: {
        name: "test user",
      },
    }
    component = render(<Blog blog={blogData} like={likeHandler} />)
  })

  test("title and author are visible but not others", () => {
    expect(component.container).toHaveTextContent("test title")
    expect(component.container).toHaveTextContent("test author")
    expect(component.container).not.toHaveTextContent("test url")
    expect(component.container).not.toHaveTextContent("test user")
  })

  test("url and author showed after clicking a button", () => {
    const button = component.getByText("show")
    fireEvent.click(button)
    expect(component.container).toHaveTextContent("test url")
    expect(component.container).toHaveTextContent("test user")
    expect(component.container).toHaveTextContent("Likes:")
  })

  test("normal state after closing content", () => {
    const button = component.getByText("show")
    fireEvent.click(button)
    expect(component.container).toHaveTextContent("test url")
    expect(component.container).toHaveTextContent("test user")
    expect(component.container).toHaveTextContent("Likes:")
    const closeButton = component.getByText("hide")
    fireEvent.click(closeButton)
    expect(component.container).not.toHaveTextContent("test url")
    expect(component.container).not.toHaveTextContent("test user")
    expect(component.container).not.toHaveTextContent("Likes:")
  })

  test("like button works correctly", () => {
    const showButton = component.getByText("show")
    fireEvent.click(showButton)
    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
