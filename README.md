# Library REST API

## Description

This project provides [rest API](#endpoints) for library.

## Usage

1. Clone project `git clone https://github.com/VKirbyatev/Library-REST-API.git`
2. `npm install`
3. Setup .development.env file ([example](https://github.com/VKirbyatev/Library-REST-API/blob/master/.example.env))
4. Run server `npm run-script start:dev`

## Endpoints

[Postman collection](https://github.com/VKirbyatev/Library-REST-API/blob/master/postman.collection.json)

| Methods | Endpoints               | Description               |
| ------- | ----------------------- | ------------------------- |
| GET     | api/users/             | Get list of all users       |
| GET    | api/users/:userId        | Get one user by id         |
| POST    | api/users/        | Create new user        |
| PUT    | api/user/:userId       | Update user by id         |
| DELETE    | api/user/:userId        | Delete user by id         |
| GET    | api/books/        | Get list of all books         |
| POST    | api/books/        | Create new book         |
| PUT    | api/books/?bookId&userId        | Give book to user         |
| DELETE    | api/books/:bookId        | Remove book from user         |
| PUT    | api/subscription/:userID      | Give user subscription or extend it       |
