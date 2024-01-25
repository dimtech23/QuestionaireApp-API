import User from "../models/User.js";

export const getUser = async (req, res) => {
const {id} = req
    try {
         const user = await User.findById(id).select("-password");
        res.json({ user }).status(200);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: "Something went wrong" });
        
    }
    



}