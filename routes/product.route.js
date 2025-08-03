const express = require('express');
const router = express.Router();
const Product = require('../models/product.model.js');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');
const { productValidationRules, validate } = require('../middleware/validateProduct.js');


router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', productValidationRules, validate, createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;




