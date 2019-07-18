const mongoose = require('mongoose');

const Score = mongoose.model('Score');

module.exports = {
    async index(req, res) {
        /**
         * Extracts from the request the params page and limit.
         * If not defined, they default to 1 and 10 respectively.
         */
        const { 
            page = 1, 
            limit = 10,
            sortType = 'desc',
            sortField = 'score'
        } = req.query;

        /**
         * Runs the query on MongoDB via Mongoose.
         */
        const leaderboard = await Score.paginate(
            {}, 
            { 
                page: parseInt(page), 
                limit: parseInt(limit),
                sort: { [sortField]: sortType }
            }
        );
        
        return res.json(leaderboard);
    },
    
    async store(req, res) {
        /**
         * Save score.
         * 
         * req.body must contains the fields from the model.
         */
        const score = await Score.create(req.body);
        
        return res.json(score);
    },

    async show(req, res) {
        /**
         * Find a score by its _id on the database.
         */
        const score = await Score.findById(req.params.id);

        return res.json(score);
    },

    async update(req, res) {
        /** 
         * Find by _id and update with the data coming into body.
         * 
         * Body must contain one or more valid fields from the model.
         */
        const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(score);
    },

    async destroy(req, res) {
        /** 
         * Removes a score.
         */
        await Score.findByIdAndRemove(req.params.id);

        return res.send();
    }
}