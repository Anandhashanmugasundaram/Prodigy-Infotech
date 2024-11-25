import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/database.js';
import productRouter from './routes/product.route.js';
import cors from 'cors';
import path from 'path';


dotenv.config();


console.log("MONGODB_URI:", process.env.MONGODB_URI);  // Check if this prints correctly
console.log("NODE_ENV:", process.env.NODE_ENV);  //



const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve()

//middle ware
app.use(express.json())
app.use('/api/products',productRouter)
app.use(cors());
if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/dist')))
    app.get('*',(req,res) => {
      res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
    })

}

app.listen(port ,() => {
    connectdb()
    console.log(`Server is running on port ${port}`);
})
