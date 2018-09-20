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
        image: {
            type: String,
            default:
                'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1192200/580/404/m1/fpnw/wm0/b052_09-.jpg?1461043071&s=7b41fa81152c905a30b356168d1fdc97'
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
