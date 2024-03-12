const mongoose = require('mongoose');
const URI = process.env.MONGO_URL;

const connectToDb = handler => async (req,res) =>{
    if(mongoose.connections[0].readyState){
        return handler(req,res);
    }
    await mongoose.connect(URI);
    return handler(req,res)
}

export default connectToDb;