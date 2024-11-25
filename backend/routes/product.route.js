    import express from 'express'
    import {addProduct,removeProduct,listAllProducts,updateProduct} from '../controller/product.controller.js'

    const productRouter = express()

    productRouter.post('/add',addProduct)
    productRouter.delete('/delete/:id',removeProduct)
    productRouter.get('/list',listAllProducts)
    productRouter.put('/update/:id',updateProduct)

    export default productRouter