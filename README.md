# MERN MONGODB ACCESSING WITH CORS

This is a boilerplate using the following technologies:
- [React](https://facebook.github.io/react/) and [React Router](https://reacttraining.com/react-router/) for the frontend
- [Express](http://expressjs.com/) and [Mongoose](http://mongoosejs.com/) for the backend
- [Sass](http://sass-lang.com/) for styles (using the SCSS syntax)
- [Webpack](https://webpack.github.io/) for compilation
- [CORS](https://www.npmjs.com/package/cors) for Cross origin resource sharing


## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```


## Connection

Make sure to add a `config.js` file in the `config` folder with only DB link.
```shell
module.exports = {
    db: 'mongodb://localhost:27017/<address>'
  };
```
## Running

Production mode:

Production mode files are added to the `dist` folder. Production need to run on an `apache` server.
```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```
