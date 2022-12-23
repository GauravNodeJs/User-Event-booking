import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"
import {nanoid} from 'nanoid'
const userSchema = new Schema({
    _id:{
        type :String,
        default:() =>nanoid()
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    role:{
        type:String,
        enum:{admin:'admin',manger:'manager',user:'user'},
        required:false 
    },
    createdAt:{
        type:Number,
        required:false
    },
    upadtedAt:{
        type:Number,
        required:false
    }
}
)
userSchema.pre('save', async function (next) {
    try {
        const savedPassword = await bcrypt.hash(this.password, 5)
        this.password = savedPassword
        next()
    }
    catch (error) {
        next(error)
    }
})
const user = mongoose.model("User", userSchema);
export default user
