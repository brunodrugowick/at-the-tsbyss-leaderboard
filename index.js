require("dotenv").config();

const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const requireDir = require('require-dir');

// Starting app
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', require("./src/controllers/ScoreController"));
app.use('/users', require("./src/controllers/UserController"));

app.use('/graphql', graphqlHTTP({
    schema: require('./src/graphql/schema'),
    graphiql: process.env.GRAPHIQL,
}));

// Connecting to MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
}).then(function(fullfilled) {
    fullfilled.connections.forEach(connection => {
        console.log(`Connected to ${connection.host}:${connection.port}`);
    });
});

/**
 * Make Mongoose use `findOneAndUpdate()`. Note that this option is `true` 
 * by default, you need to set it to false.
 * 
 * See https://mongoosejs.com/docs/deprecations.html#findandmodify
 */
mongoose.set('useFindAndModify', false);

/**
 * Ensures the creation of indexes given https://github.com/Automattic/mongoose/issues/6890.
 */
mongoose.set('useCreateIndex', true);

// Requiring all models for the application using require-dir module
requireDir("./src/models");

// Easter egg
app.get('/', (req, res) => {res.json("John is a man of focus, commitment, sheer will... " +
"something you know very little about.")} );

app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });