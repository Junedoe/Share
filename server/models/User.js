const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        firstname: String,
        surname: String,
        password: String,
        email: String,
        pictureUrl: String,
        street: String,
        number: String,
        postalCode: String,
        city: String,
        district: String
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
