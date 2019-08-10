const mongoose = require('mongoose');
const scoreDefaults = require('../models/Score');
const Score = mongoose.model('Score');

module.exports = {
    
    Query: {
        leaderboard: () => Score.find(),
        score: (_, { id }) => Score.findById(id)
    },

    Mutation: {
        score: (_, { name, score, killedby }) => {
            score = new Score({
                name: name,
                score: score,
                killedby: killedby,
            });
            score.message = "This is a dummy score to test the API. " + 
                "Why would I let you create a Score so easily? =P";
            
            return score;
        }
    }

}