import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
            const user = await User.findOne( { email});
            if (user) {
              const password_valid =await argon2.verify(
                user.password,
                password,
              );
              if (password_valid) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                res.status(200).json({ token: token});
              } else {
                res.status(400).json({ error: "Password Incorrect" });
              }
            } else {
              res.status(404).json({ error: "User does not exist" });
            }
        

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        
    }

}

export const logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

export const register = async (req, res) => {
    try {
        const {  name ,  email , password } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User found please login" });
        const hashPassword = await argon2.hash(password);
       const  newUser =  new User({ name ,  email , password:hashPassword });
        
        await  newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

        res.status(200).json({ token: token});
        
    } catch (error) {
        console.log('error in login', error);
    }   


}

