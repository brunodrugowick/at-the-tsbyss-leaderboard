const routes = require('express').Router();
const mongoose = require('mongoose');
const scoreDefaults = require('../models/Score');
const Score = mongoose.model('Score');

const index = async function(req, res) {

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
}

const store = async function(req, res) {
    
    /**
     * Searches for a document with the same 'name'.
     * 
     * The logic of verifying the score (lower or higher) happens here.
     */

    console.log("Received score {" + req.body.name + ", " + req.body.score + "}");

    await Score.findOne({name: req.body.name}).then((existentScore) => {

        if (!existentScore) {
        
            console.log(" - creating {" + req.body.name + ", " + req.body.score + "}");
            Score.create(req.body, function (err, doc) {
                if (err) {
                    console.log(" - error creating score: " + err.message);
                    return res.status(500).json(err);
                } else {
                    console.log(" - created new score {" + doc.name + ", " + doc.score + "}");
                    doc.dbOperation = "Created new score.";
                    return res.status(200).json(doc);
                }
            });
        
        } else {
        
            console.log(" - updating {" + existentScore.name + ", " + existentScore.score + "}");
            Score.findOneAndUpdate(
                { 
                    name: req.body.name, 
                    score: {$lt: req.body.score} 
                },
                req.body,
                { new: true },
                (err, doc) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json("There's was an error updating the Score. " + err.message);
                    } else if (doc) {
                        console.log(" - updated to new score {" + doc.name + ", " + doc.score + "}");
                        doc.dbOperation = "Updated existing score.";
                        return res.status(200).json(doc);
                    } else {
                        console.log(" - kept existent score {" + existentScore.name + ", " + existentScore.score + "}");
                        existentScore.dbOperation = "Kept existing score.";
                        return res.status(200).json(existentScore);
                    }
                }
            );
        }

    }).catch((error) => {
        console.log(error);
        return res.status(500).json("There's was an error. " + error.message);
    });

}

const show = async function(req, res) {
    /**
     * Find a score by its _id on the database.
     */
    const score = await Score.findById(req.params.id, 
        function (error, response) {
            if (error) {
                console.log("Error searching for id " + req.params.id);
                
                if (error.name === "CastError") { 
                    return res.status(400).json(
                        {"message": "Not a valid Score ID."}
                    )
                }

                return res.status(500).json(error);
            } else if (response) {
                console.log("Returning Score id " + response.id);
                return res.json(response);
            } else {
                console.log("Score not found " + req.params.id);
                res.status(404).json({"message": "Score not found"});
            }
        }
    );
}

routes.get('/leaderboard', index);
routes.post('/score', store);
routes.get('/score/:id', show);

module.exports = routes;