const Product = require('../models/product.model.js');

//get api for products
const getProducts = async (req, res)=>{
   try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

// getting product by id
const getProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// post method for creating a product
const createProduct = async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
    
}

// api for updating product
const updateProduct = async(req, res)=>{
    try {
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// api for deleting product
const deleteProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message:"Product Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};