const express = require("express")
const app = express()

require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")

const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

const logger = require("./utils/logger")
const config = require("./utils/config")
const middlewares = require("./utils/middlewares")

logger.info("connecting to", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch(error => logger.error("error connection to MongoDB:", error.message))

app.use(middlewares.tokenExtractor)
app.use(cors())
app.use(express.static("build"))
app.use(express.json())

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/testing")
  app.use("/api/testing", testRouter)
}

app.use("/api/blogs", middlewares.AuthentificationCheck, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app
