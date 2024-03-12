import connectToDb from '@/middleware/mongoose';
import User from '@/models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const handler = async (req, res) => {

    let success = false;
    const { email, password } = req.body;

    if (req.method == "POST") {
        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct password" });
            }

            
            const passwordCompare = await bcrypt.compare(password, user.password);


            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

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
            res.status(500).send("Internal Server Error");
        }
    }
    else{
        return res.status(400).json({"errror":"Bad Request!"})
    }
}
export default connectToDb(handler);
