const mongoose = require('mongoose');

const Score = mongoose.model('Score');

module.exports = {
    async index(req, res) {
        /**
         * Extracts from the request the params page and limit.
         * If not defined, they default to 1 and 10 respectively.
         */
        const { page = 1, limit = 10 } = req.query;

        /**
         * Runs the query on MongoDB via Mongoose.
         */
        const leaderboard = await Score.paginate({}, { page: parseInt(page), limit: parseInt(limit) });
        res.header("Access-Control-Allow-Origin", "*");
        return res.json(leaderboard);
    },
    
    async store(req, res) {
        /**
         * Save score.
         * 
         * req.body must contains the fields from the model.
         */
        console.log(req.query);
        console.log(req.body);
        if (!req.body) console.log('sim');
        if (req.body == '') console.log('sim2');
        if (req.body == null) console.log('null');
        const score = await Score.create(req.query);
        console.log(score);
        res.header("Access-Control-Allow-Origin", "*");
        return res.json(score);
    },

    async show(req, res) {
        /**
         * Find a score by its _id on the database.
         */
        const score = await Score.findById(req.params.id);
        res.header("Access-Control-Allow-Origin", "*");
        return res.json(score);
    },

    async update(req, res) {
        /** 
         * Find by _id and update with the data coming into body.
         * 
         * Body must contain one or more valid fields from the model.
         */
        const score = await Score.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.header("Access-Control-Allow-Origin", "*");
        return res.json(score);
    },

    async destroy(req, res) {
        /** 
         * Removes a score.
         */
        await Score.findByIdAndRemove(req.params.id);
        res.header("Access-Control-Allow-Origin", "*");
        return res.send();
    }
}