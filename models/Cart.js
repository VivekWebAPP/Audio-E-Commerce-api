import mongoose from "mongoose";

const CartModel = mongoose.Schema({
    id:{
        type:Number,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    img:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
},{timestamps:true});

const Cart = mongoose.model('Cart',CartModel);

export default Cart;