const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../mongo_models/User")

usersRouter.post("/", async (req, res) => {
  const body = req.body
  if (
    !body.password ||
    !body.username ||
    body.username.length < 3 ||
    body.password.length < 3
  ) {
    res
      .status(400)
      .json({ error: "username and password must be at least 3 letters" })
  } else {
    const passwordHash = await bcrypt.hash(body.password, 10)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  }
})

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  res.json(users.map((u) => u.toJSON()))
})
module.exports = usersRouter
