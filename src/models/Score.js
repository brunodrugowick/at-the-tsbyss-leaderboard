const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Defines the schema
const ScoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
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