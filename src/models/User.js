const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Defines the schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
},
{ 
    // Automatically creates timestamps for each entry (createdAt, modifiedAt).
    timestamps: true
}
);

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

// Register the model
module.exports = mongoose.model("User", UserSchema);
