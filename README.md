# React app (Vite)

# Team Project : Study Resource Application

## About The Project

The Web application is a React app which allows users to view and vote on study resources, add new resources and save resources to their personalised study list creating a collaborative hub for study resources.

## Installation

```
yarn
```

## Running dev server

```
yarn start
```

This will start a local server listening for http requests on port 3000.
It will also ask your browser to open a tab to `http://localhost:3000/`

## Building and previewing a static version of your app:

This process is normally performed automatically by a build&host service such as Netlify or Vercel.

To run it yourself:

```
yarn build
```

This will bundle your many source files into very few in `dist/`, ready for deployment on a web server. As part of the process, it will convert your TypeScript files into JavaScript, using the TypeScript compiler, `tsc`.

If you've run a local build, you can start a local server to host those files, using:

```
yarn preview
```

## Feature summary

-   React app (hot-reloaded when you make changes)
-   TypeScript
-   ESLint and custom config
-   Formatting with prettier
-   Testing with
    -   vitest (jest-equivalent) and
    -   react-testing-library
-   CI with GitHub Actions
-   vscode default build task configured (in tasks.json) to type-check and lint to problems list
-   vscode debugger launch config
-   Vite
    -   Type-checking and linting errors presented into the browser (vite-plugin-checker)
-   As little other junk as possible

## Repositories

Front-end respository: https://github.com/laurahall93/C7C4-front-end-study-resource-app
Back-end respository: https://github.com/laurahall93/C7C4-back-end-study-resource-app

### Contributers

Adil R - https://github.com/adil-rahman1
Laura H - https://github.com/laurahall93
Rosie S - https://github.com/rosieschofield/
