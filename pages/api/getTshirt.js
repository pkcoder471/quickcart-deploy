import Product from '@/models/Product';
import connectToDb from '@/middleware/mongoose';

const handler = async (req,res) =>{

    try {
        let product = await Product.findOne({"itemCode": req.query.slug});
        let variants = await Product.find({"name": product.name});
        let colorSizeSlug={};

        for(let item of variants){
            if(item.color in colorSizeSlug){
                colorSizeSlug[item.color][item.size]={"slug":item.itemCode};
            }
            else{
                colorSizeSlug[item.color]={};
                colorSizeSlug[item.color][item.size]={"slug":item.itemCode};
            }
        }

        return res.status(200).json({product,colorSizeSlug});
    } catch (err) {
        console.log(err);
        return res.status(500).json({"errror":"Internal Server error!!"})
    }
}
export default connectToDb(handler);
  