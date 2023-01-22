const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server")
const pubsub = new PubSub()

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Dataloader = require("dataloader")

const Book = require("./mongoSchemes/Book")
const Author = require("./mongoSchemes/Author")
const User = require("./mongoSchemes/User")

const JWT_SECRET = "VERYSECRETCODE123"
const PASSWORD = "qwerty123"

console.log("connecting to MongoDB")

const MONGODB_URI = process.env.MONGODB_URI
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch(e => console.log("error connecting to MongoDB:", e.message))

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }
  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let toReturn = await Book.find({}).populate("author", {
        name: 1,
        born: 1,
      })
      if (args.author)
        toReturn = toReturn.filter(
          x => x.author.name.toLowerCase() === args.author.toLowerCase()
        )
      if (args.genre)
        toReturn = toReturn.filter(x => x.genres.includes(args.genre))
      return toReturn
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: (root, args, context) => {
      return context.loaders.books
        .load(root._id)
        .then(response => response.length)
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (args.author.length < 4) {
        throw new UserInputError(
          "authors name must be at least 4 letters long",
          { invalidArgs: args }
        )
      }
      if (!context.currentUser) {
        throw new AuthenticationError("not aunthenticated")
      }
      let findedAuthor = await Author.findOne({ name: args.author })
      if (!findedAuthor) {
        let newAuthor = new Author({ name: args.author })
        findedAuthor = await newAuthor.save()
        console.log(findedAuthor)
      }
      const book = new Book({ ...args, author: findedAuthor._id.toString() })
      console.log(book)
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      await book.populate("author", {
        name: 1,
        born: 1,
      })
      pubsub.publish("BOOK_ADDED", { bookAdded: book })
      return book
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== PASSWORD) {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: 3600 }) }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      try {
        await author.save({ validateModifiedOnly: true })
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
}

const batchBooks = async ids => {
  const books = ids.map(id => Book.find({ author: id }))
  return books
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      let currentUser = null
      try {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        currentUser = await User.findById(decodedToken.id)
      } catch (error) {
        currentUser = null
      }
      return { currentUser, loaders: { books: new Dataloader(batchBooks) } }
    }
    return {
      loaders: { books: new Dataloader(batchBooks) },
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
