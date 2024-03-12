import connectToDb from '@/middleware/mongoose';
import User from '@/models/User';

const handler = async (req, res) => {
    let success = false;
    const {name, address, phone, pincode, email} = req.body;
    try {
        if (req.method === 'POST') {
            await User.findOneAndUpdate({email:email},{name:name, address:address, phone:phone, pincode:pincode});
            success=true;
            return res.status(200).json({success});
        }
        else{
            return res.status(400).json({ success, "errror": "Bad Request!" })

        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({success, "errror": "Internal server error!" })
    }
    
}
export default connectToDb(handler);
