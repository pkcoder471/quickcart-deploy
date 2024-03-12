import Product from '@/models/Product';
import connectToDb from '@/middleware/mongoose';

const handler = async (req,res) =>{

    try {
        let products = await Product.find({"category":"Hoodies"});
        let hoodies = {};
        
        for(let item of products){
            if(item.name in hoodies){
                if(!hoodies[item.name].color.includes(item.color) &&  item.qty>0){
                    hoodies[item.name].color.push(item.color);
                }
                if(!hoodies[item.name].size.includes(item.size) &&  item.qty>0){
                    hoodies[item.name].size.push(item.size);
                }
            }
            else{
                    hoodies[item.name]=JSON.parse(JSON.stringify(item));
                    hoodies[item.name].color=[item.color];
                    hoodies[item.name].size=[item.size];
            }
        }
        return res.status(200).json(hoodies);
    } catch (err) {
        console.log(err);
        return res.status(500).json({"errror":"Internal Server error!!"})
    }
}
export default connectToDb(handler);
  