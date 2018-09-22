const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'The product name is required'],
            minlength: 1
        },
        subtitle: {
            type: [String],
            default: []
        },
        description: {
            type: String
        },
        pictureUrl: {
            type: [String]
        },
        _owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
