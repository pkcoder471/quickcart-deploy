import connectToDb from '@/middleware/mongoose';
import User from '@/models/User';
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {

    let success = false;
    const {token} = req.body;
    try {
        if (req.method === 'POST') {
            const data = jwt.verify(token, JWT_SECRET);
            let user = await User.findOne({_id:data.user.id}).select('-password');
            return res.status(200).json(user);
        }
        else{
            return res.status(400).json({ "errror": "Bad Request!" })

        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ "errror": "Internal server error!" })
    }
    
}
export default connectToDb(handler);
