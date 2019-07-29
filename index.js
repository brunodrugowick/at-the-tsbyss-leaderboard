require("dotenv").config();

const express = require('express');

const { GraphQLServer } =  require('graphql-yoga');
const path = require('path');
const resolvers = require('./src/graphql/resolvers');

const mongoose = require('mongoose');

const cors = require('cors');

const requireDir = require('require-dir');

// Starting app
const app = express();
// Allowing JSON
app.use(express.json());

// Defining graphQL app
const graphqlApp = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'src', 'graphql', 'schema.graphql'),
    resolvers
})
const graphQLPort = process.env.PORT_GRAPHQL || 3334;

// Connecting to MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
}).then(console.log("[Mongoose] Am I connected? Not sure, actually."));

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

// Allowing requests from everywhere. Not recommended. NOT RECOMMENDED!
app.use(cors());

// Redirecting /api to the apiRoutes file.
app.use('/api', require("./src/controllers/ScoreController"));

// Starting GraphQL server.
graphqlApp.start({
    port: graphQLPort
});
console.log("GraphQL Express server listening on port %d in %s mode", graphQLPort, app.settings.env)

// Easter egg
app.get('/', (req, res) => {res.json("John is a man of focus, commitment, sheer will... " +
"something you know very little about.")} );

app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });