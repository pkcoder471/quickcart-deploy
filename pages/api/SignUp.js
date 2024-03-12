import connectToDb from '@/middleware/mongoose';
import User from '@/models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {

    let success = false;
    if (req.method === 'POST') {
        try {
            
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({ success, error: "sorry a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const pass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: pass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });
        } catch (err) {
            console.log(err);
            res.status(500).send(success, "Some Error occured");
        }
    }
    else {
        return res.status(400).json({ "errror": "Bad Request!" })
    }
}
export default connectToDb(handler);
