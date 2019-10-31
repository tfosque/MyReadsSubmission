# MyReads Project: React Fundamentals

To get started previewing this project:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Application Structure

```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms provided by Udacity workspace.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── .gitignore
├── public
│   ├── favicon.ico # React Icon
│   └── index.html # DO NOT MODIFY
└── src
    ├── Components
        ├── Book
        ├── BookStore
        ├── SearchBar
        ├── SearchPage
        └── Home.js - Component Entry Point
    ├── App.css # Styles
    ├── App.js # Root of app.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # Application Entry Point
```

## Additional Packages

- react-bootstrap (faster ui setup)

## Backend Server Provide by Udacity Workspace

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.
