const router = require("express").Router()
const Blog = require("../mongo_models/Blog")
const User = require("../mongo_models/User")

router.post("/reset", async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = router
