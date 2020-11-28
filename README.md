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
