# Personal Library

This is a project/challenage from freeCodeCamp's [Quality Assurance Projects](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker) certification. 

## Services & Architecture

The project depends on a remotely-visible instance of the app to be served to submit the assessment, and something like [REPL.it](https://repl.it/) has done a good job of that for other projects, but the Webpack-bundled front-end might push the limits of that set-up (TBC). You'll need a publicly accessible Mongo database (hosted somewhere like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) to store data/state for the API. The front-end will be a React SPA and data will come from an Express/MongoDB api expecting and serving JSON at `/api`.

A key focus of the freeCodeCamp module is testing, so thorough unit and integration tests will be written along the way.

As with the challenge [preceding this one](https://github.com/dvbsknd/FCC-issue-tracker) I'll be trying to work towards an MVC-ish architecture, with controllers being Express- and MongoDB-agnostic. Unlike with that challenge, I'll be using `Promises` rather than callbacks wherever possible. In future challenges I'll move to `async/await`. I'll also build the front-end with React in order to get some exposure to that and it's build-chain using [Webpack](https://webpack.js.org/).

## Local Development

After cloning this repo locally, you'll need an `.env` file with:

1. `PORT`
1. `MONGO_URI`

The rest is pretty straightforward and covered in the architecture section, with `npm` for package management and scripts in `package.json`.

For the local development environment we're using a combination of `nodemon` and `webpack-dev-server`.

After installing with `npm install` you can use `npm run dev:api` for starting up the API on `:3000` and then `npm run dev:client` for the hot-reloading front-end on `:8080`. `webpac-dev-server` is configured to proxy through to the API during development so there's no need to run a build to test things out end-to-end.

## Architecture

I've attempted to follow some archictural principles that I've picked up along the way although this is likely to be a bit of a patchwork and open to some well-deserved criticism.

~~~ text
.
├── client               All uncompiled source files for the React client
│   ├── components       React components
│   │   └── {Component}  Each component is a folder of js, css and test
│   ├── images           Static images/assets for components
│   ├── index.html       HTML output template for Webpack
│   ├── index.js         JS entry point for Webpack
│   └── index.scss       SASS entry point for Webpack
├── public               Static assets served by Node.js
│   └── build            Webpack builds/bundles
├── routes               API routes/routers in Express
├── controllers          Core application logic, API-agnostic
├── database             Utils for database connection
├── server.js            API/server entry point
└── tests                API/server tests
    ├── api.js
    ├── controllers.js
    └── server.js
~~~

### Architecture Notes

- In theory, the controllers are Express-agnostic and could be used to (for example) work with a CLI or other interface.
- I've tried to have the database connection "shared" as much as possible, but I know this isn't quite right yet and (for example) tests don't seem to love it as they don't finalise and have to be aborted manually on completion.
- Mocha is the test runner and tests client and server, but they can be individually tested using `npm run test;client` and `npm run test:api`.
- The tests for the client are a bit messy and incoherent as I'm still working out how to mock the DOM and Web APIs neatly (not ready to go to `jest` just yet).
- Deployment hasn't been completely worked out yet, although the `npm run build:client` and `npm start` commands will give you a working application.
- Front-end is using `classes` and other ES6 smatterings but the back-end is all standard/Node.js-compatible code.

## Dependencies

Notable packages and concepts include:

1. [Webpack](https://webpack.js.org/) for bundling and building the client React app
1. [Babel](https://babeljs.io/) for transpiling from modern JavaScript
1. [Express](https://www.npmjs.com/package/express)
1. [Helmet](https://www.npmjs.com/package/helmet) and [CORS](https://www.npmjs.com/package/cors) for setting appropriate headers
1. [MongoDB](https://www.npmjs.com/package/mongodb)
1. [Mocha](https://www.npmjs.com/package/mocha) to run tests
1. [Chai](https://www.npmjs.com/package/chai) with [HTTP](https://www.npmjs.com/package/chai-http) to assert
1. [React Testing Library](https://github.com/testing-library/react-testing-library) for rendering & testing components
1. [Nodemon](https://www.npmjs.com/package/nodemon) for running a local dev server with hot-reloading
1. [ESLint](https://www.npmjs.com/package/eslint) for code-checking
1. [React](https://reactjs.org/), of course
1. [React Router](https://reactrouter.com/)

## Goals/Todo

Development steps are documented here for tracking and articulating progress:

### Done

1. Initialise the repo and add some basic framework
1. Getting set-up with and learning Webpack basics
1. Setting up a [Webpack dev server](https://github.com/webpack/webpack-dev-server)
1. Add a `dev:client` script to start the Webpack dev server
1. Get rid of PostCSS and other redundant Webpack configs
1. Serve an emoji favicon
1. Get rid of the EJS static page renders and Bootstrap
1. Set up a production build script for webpack
1. Solve various CSP/Helmet issues
1. Set-up the API development environment
1. Add some basic error handling for the API
1. Add a database and a Books model
1. Add a "create" endpoint
1. Add functional and unit tests for the API
1. Render books from the API
1. Use [Semantic UI](https://react.semantic-ui.com/elements/input/) to style the components
1. Create an API `dev:api` script to run client and API in parallel
1. Find out how to test React components
1. Set up a test framework for React components
1. Add a POST method to the API to add books
1. Stub out a form for adding new books
1. Connect the "add books" form to the API
1. Clear inputs on submission of "Add" form
1. Handle API errors on the front-end
1. Add tests for the AddBookForm to confirm it works with API
1. Add a "delete" button to each card
1. Make the delete button remove the card from the DOM
1. Make the delete button remove the card from the database
1. Handle API errors for deletion
1. Add tests for the delete control and endpoint
1. Get ESLint working (seems not to be enabled)
1. Implement `react-router-dom` so each book can have a "view" URL
1. Tidy up components to work well with the router
1. Ensure tests are passing again
1. Add tests for new components/routes
1. Build out the front-end components for comments
1. Move Loader in to main App rather than in two subcomponents
1. Select which Book to render in the main App component/route
1. Comments should be sub-documents of Books (fix Components to fetch them all on load and pass down to Comments)
1. Add tests for Comments components
1. Add a form to add comments in the book modal
1. Add a link to delete comments in the book modal
1. Build out the API POST endpoint for comments
1. Add React-Router to README

# In Progress
1. Implement the #deleteComment function
1. Finalise the mocked DELETE endpoint for comments
1. Move getBooks, addBook and deleteBook to the API module
1. Add a DELETE endpoint for comments

### Todo

1. Create a unique ObjectID for new Comments (possibly temporary)
1. Clean-up unused dependencies
1. Ensure we have what's required to get [FCC tests](https://github.com/freeCodeCamp/freeCodeCamp/blob/production-current/curriculum/challenges/english/06-quality-assurance/quality-assurance-projects/personal-library.md) to pass
1. Add some form field validation on front-end
1. Ensure forms can be submitted by enter
1. Add API/controller tests for Comments
1. Possibly get the App compontent to be wholly responsible for synch to DB by using a [Context](https://www.robinwieruch.de/react-context)
1. Possibly write a [custom hook or reducer](https://www.robinwieruch.de/react-hooks-fetch-data) for the API stuff
1. Implement [Babel resolvers](https://www.robinwieruch.de/babel-module-resolver/) for components/modules
1. Try to get `webpack-dev-server` to understand the routes on reload
1. Try and get renders to persist across tests
1. Try to get the route to render a modal of the book
1. Try to have the "close" button on the modal take us home
1. Handle database offline case
1. Show a comment count on the books in the home list
1. Perhaps use `concurrently` to make an `npm run dev` command
1. Split ESLint files in to a `root` and `client` ones, like [this](https://stackoverflow.com/questions/36762468/how-do-i-setup-a-folder-with-a-different-rule-and-another-folder-with-a-differen) or [this](https://headway.io/blog/customizing-eslint-for-a-specific-directory)
1. Refactor `_id` to `id` for usability (it's MongoDB specific)
1. Add more granular tests for the delete function on client
1. Return a comment count for each book
1. Make sure _all_ components have at least some tests
1. Probably move client tests to the tests folder
1. Probably flatten components into single files, not folders (for now)
1. Move the API request to the BooksList component
1. Show a message if no books found
1. Possibly restructure the Controllers so that DB connections close and tests finish
1. Make tests add/remove dummy data to the database
1. Document the deployment process
1. Set-up deployments to an actual production environment
1. Possibly try to build a mockable function class for tests by using [Object.setPrototypeOf](https://stackoverflow.com/questions/10341127/can-javascript-constructor-return-function-and-keep-inheritance)
