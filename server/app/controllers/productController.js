const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');

//Importing the model here 
const ProductModel = mongoose.model('Product')

let getAllProduct = (req, res) => {
    ProductModel.find()
        .select('-__v -_id')
        .lean() //make it plain javascript object,not mongoose object
        .exec((err, result) => { //trying to execute this function
            if (err) {
                logger.error(err, 'productController: getAllProduct()', 5)
                let apiResponse = response.generate(true, 'Failed To Find Products', 500, null)
                res.send(apiResponse)
            } else if (result == undefined || result == null || result == '') {
                logger.error('No Product Found', 'productController: getAllProduct()', 5)
                let apiResponse = response.generate(true, 'No Product Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Product Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all products

/**
 * function to get single product.
 */
let viewByProductId = (req, res) => {

    ProductModel.findOne({ 'id': req.params.id }, (err, result) => {

        if (err) {
            logger.error(err, 'productController: viewByProductId()', 5)
            let apiResponse = response.generate(true, 'Failed To Find Product Details', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Product Found', 'productController: viewByProductId()', 5)
            let apiResponse = response.generate(true, 'No Product Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Product Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}


/**
 * function to edit product by admin.
 */
let editProduct = (req, res) => {

    // console.log('id',id);
    editProduct=req.body
    //console.log(req);
    //  console.log('title',req.body['title']);
     console.log('watchers->',req.body.watchers);

    console.log('édit Product->',editProduct)
    ProductModel.findOneAndUpdate({ 'id': req.params.id }, {$set:editProduct}, { new: true }).exec((err, result) => {
        if (err) {
            logger.error(err, 'productController: editProduct()', 5)
            let apiResponse = response.generate(true, 'Failed To Edit product', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Product Found', 'productController: editProduct()', 5)
            let apiResponse = response.generate(true, 'No Product Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Product Details Found', 200, result)
            res.send(apiResponse)
        }
    })
}


let deleteProduct = (req, res) => {
    ProductModel.remove({ 'id': req.params.id }, (err, result) => {
        if (err) {
            logger.error(err, 'productController: deleteProduct()', 5)
            let apiResponse = response.generate(true, 'Failed To Delete Product', 500, null)
            res.send(apiResponse)
        } else if (result == undefined || result == null || result == '') {
            logger.error('No Product Found', 'productController: deleteProduct()', 5)
            let apiResponse = response.generate(true, 'No Product Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Product is Deleted Successfully', 200, result)
            res.send(apiResponse)
        }
    })
}

let createProduct = (req, res) => {
    let id = shortid.generate()
    //console.log('id',id);
    let newProduct = new ProductModel({
        id: id,
        name: req.body.name,
        description: req.body.description,
        short_description: req.body.short_description,
        url: req.body.url,
        our_price: req.body.our_price,
        items_in_stock: req.body.items_in_stock,
        date_added: time.now(),
    }) // end new product model

    newProduct.save((err, result) => {
        if (err) {
            logger.error(err.message, 'productController: createProduct', 10)
            let apiResponse = response.generate(true, 'Failed to create new Product', 500, null)
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'All Product Details Found', 200, result)
            res.send(apiResponse)   
        }        
    }) // end new product save
}

module.exports = {
    getAllProduct: getAllProduct,
    createProduct: createProduct,
    viewByProductId: viewByProductId,
    editProduct: editProduct,
    deleteProduct: deleteProduct
}