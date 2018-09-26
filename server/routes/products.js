const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../configs/cloudinary'); //???

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'my-images',
    allowedFormats: ['jpg', 'png', 'gif'],
    transformation: [
        {
            angle: 0
        }
    ]
});

const parser = multer({ storage });

// Route to get all products
router.get('/', (req, res, next) => {
    Product.find()
        .populate('_owner')
        .then(products => {
            res.json(products);
        })
        .catch(err => next(err));
});

// Route to one product (detail)
router.get('/:id', (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Product.findById(req.params.id)
        .then(product => {
            res.json(product);
        })
        .catch(error => next(error));
});

// Route to add a product
router.post('/', isLoggedIn, (req, res, next) => {
    let _owner = req.user._id;
    let { name, subtitle, description, image } = req.body;
    Product.create({ name, subtitle, description, _owner, image })
        .then(product => {
            res.json({
                success: true,
                product
            });
        })
        .catch(err => next(err));
});
// Route to edit the product
router.get('/:id', isLoggedIn, (req, res, next) => {
    Product.findById(req.params.id)
        .then(products => {
            res.json(products);
        })
        .catch(err => next(err));
});

router.put('/:id', isLoggedIn, (req, res, next) => {
    let { name, subtitle, description } = req.body;
    Product.findByIdAndUpdate(req.params.id, { $set: { name, subtitle, description } }, { new: true })
        .then(product => {
            res.json({
                success: true,
                product
            });
        })
        .catch(err => next(err));
});

// Route to delete a product
router.delete('/:id', isLoggedIn, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Product.remove({ _id: req.params.id })
        .then(message => {
            return res.json({
                message: 'Product has been removed!'
            });
        })
        .catch(error => next(error));
});

/*first route {multiple image upload}*/
router.post('/multiple_uploads', async (req, res) => {
    /* we would receive a request of file paths as array */
    let filePaths = req.body.filePaths;

    let multipleUpload = new Promise(async (resolve, reject) => {
        let upload_len = filePaths.length,
            upload_res = new Array();

        for (let i = 0; i <= upload_len + 1; i++) {
            let filePath = filePaths[i];
            await cloudinary.v2.uploader.upload(filePath, (error, result) => {
                if (upload_res.length === upload_len) {
                    /* resolve promise after upload is complete */
                    resolve(upload_res);
                } else if (result) {
                    /*push public_ids in an array */

                    upload_res.push(result.public_id);
                } else if (error) {
                    console.log(error);
                    reject(error);
                }
            });
        }
    })
        .then(result => result)
        .catch(error => error);

    /*waits until promise is resolved before sending back response to user*/
    let upload = await multipleUpload;
    res.json({ response: upload });
});

router.post('/add-new-product', parser.single('picture'), (req, res, next) => {
    Product.findOneAndUpdate({}, { pictureUrl: req.file.url }).then(() => {
        res.json({
            success: true,
            pictureUrl: req.file.url
        });
    });
});

module.exports = router;
