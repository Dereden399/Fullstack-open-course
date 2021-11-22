const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {return sum + blog.likes}, 0)
}

const favoriteBlog = (blogs) => {
  const favourite = blogs.reduce((max, blog) => {return blog.likes > max.likes ? {title: blog.title, author: blog.author, likes: blog.likes} : max}, {likes: 0})
  return favourite
}

const mostBlogs = (blogs) => {
  let authors = {}
  let bestAuthor = ''
  let bestNumber = 0
  blogs.forEach(blog => {
    if(blog.author in authors) {
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
  });
  Object.keys(authors).forEach(author => {
    if(authors[author] > bestNumber) {
      bestAuthor = author
      bestNumber = authors[author]
    }
  });
  return {author: bestAuthor, blogs: bestNumber}
}

const mostLikes = (blogs) => {
  let authors = {}
  let bestAuthor = ''
  let bestNumber = 0
  blogs.forEach(blog => {
    if(blog.author in authors) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  });
  Object.keys(authors).forEach(author => {
    if(authors[author] > bestNumber) {
      bestAuthor = author
      bestNumber = authors[author]
    }
  });
  return {author: bestAuthor, likes: bestNumber}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}