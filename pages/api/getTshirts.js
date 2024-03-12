import Product from '@/models/Product';
import connectToDb from '@/middleware/mongoose';

const handler = async (req,res) =>{

    try {
        let products = await Product.find({"category":"Tshirts"});
        let tshirts = {};
        
        for(let item of products){
            if(item.name in tshirts){
                if(!tshirts[item.name].color.includes(item.color)){
                    tshirts[item.name].color.push(item.color);
                }
                if(!tshirts[item.name].size.includes(item.size)){
                    tshirts[item.name].size.push(item.size);
                }
            }
            else{
                    tshirts[item.name]=JSON.parse(JSON.stringify(item));
                    tshirts[item.name].color=[item.color];
                    tshirts[item.name].size=[item.size];
            }
        }
        return res.status(200).json(tshirts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({"errror":"Internal Server error!!"})
    }
}
export default connectToDb(handler);
  