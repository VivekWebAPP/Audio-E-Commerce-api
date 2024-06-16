import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    country:{
        type:String,
        require:true,
    }
},{timestamps:true});

const User = mongoose.model('User',UserModel);

export default User;