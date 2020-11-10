export const typeDefs = `
type Query {
  me: User
  books(options: PaginatedBooksInput!): PaginatedBooks!
  book(id: Int!): Book
}

type User {
  id: Float!
  email: String!
  firstName: String!
  lastName: String!
  nationality: String
  updatedAt: String!
  createdAt: String!
}

type PaginatedBooks {
  books: [Book!]!
  totalCount: Float!
}

type Book {
  id: Float!
  title: String!
  bookCoverUrl: String
  isbn: String!
  isbn13: String!
  languageCode: String!
  numPages: Float!
  publicationDate: String!
  publisher: String!
  goodreadsRatings: Float!
  categoryId: Float
  authors: [Author!]!
  updatedAt: String!
  createdAt: String!
}

type Author {
  id: Float!
  firstName: String!
  lastName: String!
  books: [Book!]!
  updatedAt: String!
  createdAt: String!
}

input PaginatedBooksInput {
  limit: Float!
  offset: Float = 0
  sort: [SortInput!]!
  value: String
}

"""Possible array of sort options based on the data"""
input SortInput {
  sortField: String!
  sortValue: String!
}

type Mutation {
  register(options: RegisterOptions!): UserResponse!
  login(password: String!, email: String!): UserResponse!
  logout: Boolean!
}

type UserResponse {
  errors: [FieldError!]
  user: User
}

type FieldError {
  field: String!
  message: String!
}

input RegisterOptions {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  nationality: String
}
`