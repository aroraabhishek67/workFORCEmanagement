'use strict';

const express = require('express');
const app = express();
let bodyParser = require('body-parser');
var methodOverride = require('method-override')

require('dotenv').config();
const port = process.env.PORT || 8080
console.log("port", port);

app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

// using require('./models') to get the models may create more than one connection to the database. To avoid that, the models variable must be somehow singleton-esque. This can be achieved by attaching the models module to the application:
app.set('models', require('./models')); //pulls in models/index.js by default. Index exports all the models you define in the models folder. So cool.
// And when you need to require a class of the model in a controller, use this insise a middleware function rather than a direct import:
// const { Computer } = req.app.get('models');

app.set('view engine', 'pug');
app.locals.globalWow = "Express is, like, MAGIC"; //If we end up needing some value to be available to every pug template, look into using something like this that can be accessed in the templates just like any variable we pass directly to the template.

let d = new Date();
let d2 = d.toISOString();
app.locals.currentDate = d2.slice(0, -14);


let routes = require('./routes/');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Begin middleware stack
app.use(routes);

// Add a 404 error handler
// Add error handler to pipe all server errors to from the routing middleware

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
