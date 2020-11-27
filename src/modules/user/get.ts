import {User} from "../../models/user";

async function get(req:any, res:any) {
    try {
        const newUser = await User.findById(req.params.id);
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
export {get}




