require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const requireDir = require('require-dir');

// Starting app
const app = express();
// Allowing JSON
app.use(express.json());

// Connecting to MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
}).then(console.log("Am I connected? Not sure, actually."));

/**
 * Make Mongoose use `findOneAndUpdate()`. Note that this option is `true` 
 * by default, you need to set it to false.
 * 
 * See https://mongoosejs.com/docs/deprecations.html#findandmodify
 */
mongoose.set('useFindAndModify', false);

// Requiring all models for the application using require-dir module
requireDir("./src/models");

// Redirecting /api to the apiRoutes file.
app.use('/api', require("./src/apiRoutes"));

app.use(cors());
app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });