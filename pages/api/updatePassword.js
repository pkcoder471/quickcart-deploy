import connectToDb from '@/middleware/mongoose';
import User from '@/models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {
    let success = false;
    const { password, npassword, cpassword, token } = req.body;
    try {
        if (req.method === 'POST') {
            const data = jwt.verify(token, JWT_SECRET);
            let user = await User.findOne({ _id: data.user.id });

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (passwordCompare && npassword == cpassword) {
                const salt = await bcrypt.genSalt(10);
                const pass = await bcrypt.hash(npassword, salt);
                await User.findOneAndUpdate({ email: user.email }, { password: pass });
                success = true;
                return res.status(200).json({ success });
            }
            else{
                return res.status(400).json({ success, "errror": "Invalid Credentials!" })
            }
        }
        else {
            return res.status(400).json({ success, "errror": "Bad Request!" })

        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success, "errror": "Internal server error!" })
    }

}
export default connectToDb(handler);
