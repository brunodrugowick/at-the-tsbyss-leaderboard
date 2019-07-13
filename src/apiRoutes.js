const express = require('express');
const routes = express.Router();

const ScoreController = require("./controllers/ScoreController");
routes.get('/leaderboard', ScoreController.index);
routes.post('/score', ScoreController.store);
routes.get('/score/:id', ScoreController.show);
routes.put('/score/:id', ScoreController.update);
routes.delete('/score/:id', ScoreController.destroy);

module.exports = routes;