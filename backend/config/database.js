import mongoose from 'mongoose'

const connectdb = async(req,res) => {

   try {
    const connect = await mongoose.connect(process.env.MONGODB_URI,{
      //must add in order to not get any error masseges:
      useUnifiedTopology:true,
      useNewUrlParser: true,
      
  })
    console.log(`DB connected`);
    console.log("MONGODB_URI:", process.env.MONGODB_URI);


    }
    catch (error) {
   console.error(error.message);

    
   }
}

export default connectdb;


