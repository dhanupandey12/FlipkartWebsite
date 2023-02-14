import { response } from "express";
import User from "../model/user-schema";


export const userSignup = async (req, res) => {
    try{
        const exist = await User.findOne({username : req.body.username});
        if(exist)
        {
            res.status(401).json({message : 'username already exist'})
        }
   const user = req.body;
   const newUser = new User(user);
   await newUser.save();
   console.log(user)
   res.status(200).json({message: user});
    }
    catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
}

export const userLogin = async (req, res) => {
   try {
const username = req.body.username;
const password = req.body.password;
let user = await User.findOne({username: username, password:password})
//    console.log(user);
     if(user)
     {
        return res.status(200).json({data: user})
     }
     else {
        res.status(401).json('invalid login')
     }
   }
   catch(error)
   {
    res.status(500).json({msg: 'error'})
   }
}