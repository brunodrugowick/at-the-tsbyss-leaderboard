const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Defines the schema
const ScoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    killedby: {
        type: String,
        required: true
    }
},
{ 
    // Automatically creates timestamps for each entry (createdAt, modifiedAt).
    timestamps: true
}
);

// Paginates the Schema
ScoreSchema.plugin(mongoosePaginate);

// Register the model
module.exports = mongoose.model("Score", ScoreSchema);

// Exports defaults
module.exports = {
    'DEFAULT_SORTFIELD': 'score',
    'DEFAULT_SORTTYPE': 'desc'
}