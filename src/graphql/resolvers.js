const mongoose = require('mongoose');
const scoreDefaults = require('../models/Score');
const Score = mongoose.model('Score');

module.exports = {
    
    Query: {
        leaderboard: () => Score.find(),
        score: (_, { id }) => Score.findById(id)
    },

    Mutation: {
        score: (_, { name, score, killedby }) => new Score({
            name: name + ". This is a dummy score to test the API. Why would I let you create a Score so easily? =P",
            score: score,
            killedby: killedby + ". This is a dummy score to test the API. Why would I let you create a Score so easily? =P"
        }),
    }

}