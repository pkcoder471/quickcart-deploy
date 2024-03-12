import Product from '@/models/Product';
import connectToDb from '@/middleware/mongoose';

const handler = async (req,res) =>{
    if(req.method == "POST"){
        try {
            
            for(let i=0;i<req.body.length;i++){
                let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
            }
            return res.status(200).json({'success':true})
        } catch (err) {
            console.log(err);
            return res.status(500).json({"errror":"Internal Server error!!"})
        }
    }
    else{
        return res.status(400).json({"errror":"Bad Request!"})
    }
}
export default connectToDb(handler);
  