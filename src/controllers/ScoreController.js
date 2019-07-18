const mongoose = require('mongoose');
const scoreDefaults = require('../models/Score');
const Score = mongoose.model('Score');

module.exports = {
    async index(req, res) {

        /**
         * Extracts from the request the params page and limit.
         * If not defined, they default to 1 and 10 respectively.
         */
        var { 
            page = 1, 
            limit = 10,
            sortType = scoreDefaults.DEFAULT_SORTTYPE,
            sortField = scoreDefaults.DEFAULT_SORTFIELD
        } = req.query;

        /**
         * Validate inputs
         */
        limit = parseInt(limit);
        if (!Number.isInteger(limit)) { limit = 10 }
        page = parseInt(page);
        if (!Number.isInteger(page)) { page = 1 }
        if (sortType != 'asc' && sortType != 'desc') { 
            sortType = scoreDefaults.DEFAULT_SORTTYPE 
        }
        if (!Score.schema.paths.hasOwnProperty(sortField)) { 
            sortField = scoreDefaults.DEFAULT_SORTFIELD 
        }

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