const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        password: String,
        email: String,
        pictureUrl: String,
        address: {
            street: String,
            number: Number,
            postalCode: Number,
            city: String
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
