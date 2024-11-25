import mongoose from 'mongoose';
import Product from '../models/product.model.js';


export const addProduct = async (req, res) => {
    const product = req.body
    try {
        if(!product.name || !product.price || !product.description) {
            return res.status(400).json({ message: 'Please fill in all fields' })
        }
        const newProduct = new Product(product)
        await newProduct.save()
        res.status(201).json({ message: 'Product created successfully' })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Error creating product' })
        
    }
}

export const listAllProducts = async (req, res) => {
    try {
        if(Product){
            const displayProducts = await Product.find({})
            
            res.status(200).json({success:true,data:displayProducts})
        }
        else{
            res.status(404).json({success:false,data:"No products found"})
        }
    } catch (error) {
        res.status(500).json({ success: false, data: error.message})
        
    }
}

export const removeProduct = async(req,res) => {
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:'Product deleted successfully'})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success:false,message:'Error deleting product'})
    }
}

export const updateProduct = async(req,res) => {
    const {id} = req.params
    const product = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:'Invalid product id'})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,message:'Product updated successfully',data:updatedProduct})

    }
    catch(error){
        console.error(error.message)
       console.log(res.status(400).json({success:false,message:error.message}));
    

    }
}