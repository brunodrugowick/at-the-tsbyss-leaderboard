const routes = require('express').Router();
const User = require('../models/User').model('User');

/**
 * Register a new user
 * 
 * @param {*} request 
 * @param {*} response 
 */
const register = async function(request, response) {
    const { username, password } = request.body;

    if (await User.findOne({ username })) {
        return response.status(400).json({ error: "User already exists"});
    }

    User.create({ username, password }, function (error, document) {
        if (error) {
            console.log("Error creating user: " + error);
            return response.status(500).json(error);
        } else {
            console.log("Created the user: " + document.username);
            document.password = undefined;
            return response.status(200).json(document);
        }
    });
}

routes.post('/register', register);

module.exports = routes;