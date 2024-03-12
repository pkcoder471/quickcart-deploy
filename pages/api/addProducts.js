import Product from '@/models/Product';
import connectToDb from '@/middleware/mongoose';

const handler = async (req,res) =>{
    if(req.method == "POST"){
        try {
            for(let i=0;i<req.body.length;i++){
                const {itemCode,name,category,desc,img,color,size,qty,price} = req.body[i];
                let p = new Product({itemCode,name,category,desc,img,color,size,qty,price});
                await p.save();
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
  