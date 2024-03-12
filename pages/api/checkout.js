import connectToDb from '@/middleware/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Razorpay from 'razorpay';
import pincodes from '../../pincodes.json';

const handler = async (req, res) => {

    let success = false;
    let clearCart = false;
    const {email, name, address, phone, city, state, pincode, subTotal, cart} = req.body;
    try {
        if (req.method === 'POST') {

            
            let total = 0;
            for(let item in cart){
                total+=cart[item].price*cart[item].qty;
                let product = await Product.findOne({itemCode:item});
                if(product.price!==cart[item].price){
                    clearCart=true;
                    return res.status(200).json({ clearCart, success, "error": "Price of some item have changed, Please try again!" })
                }
                if(product.qty<cart[item].qty){
                    return res.status(200).json({ clearCart, success, "error": "Some items in your cart are currently Out of Stock!" })
                }
            }
            if(total!==subTotal){
                clearCart=true;
                return res.status(200).json({ clearCart, success, "error": "Price of some item have changed, Please try again!" })
            }

            if(phone.length!==10 || !Number.isInteger(Number(phone))){
                return res.status(200).json({ clearCart, success, "error": "Enter a valid phone number!" })
            }
            if(pincode.length!==6 || !Number.isInteger(Number(pincode))){
                return res.status(200).json({ clearCart, success, "error": "Enter a vaild pincode!" })
            }

            if(!Object.keys(pincodes).includes(pincode)){
                return res.status(200).json({ clearCart, success, "error": "Sorry, Pincode not servicable!" });
            }

            const instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.NEXT_PUBLIC_KEY_SECRET })
    
            const order = await instance.orders.create({
                amount: Number(subTotal*100),
                currency: "INR",
            })
    
            let newOrder = new Order({
                email,
                name,
                address,
                pincode,
                state,
                city,
                phone,
                amount:subTotal,
                orderId:order.id,
                products:cart
    
            })
            await newOrder.save();
            success = true;
            return res.status(200).json({clearCart, success,order})
        }
        else {
            return res.status(400).json({ clearCart, success, "error": "Bad Request!" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ clearCart, success, "error": "Internal server error!" })
    }
    
}
export default connectToDb(handler);
