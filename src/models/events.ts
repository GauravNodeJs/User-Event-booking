import mongoose from "mongoose";
import { Schema } from "mongoose";
import {nanoid} from 'nanoid'
const eventsSchema = new Schema({
    _id:{
        type :String,
        default:() =>nanoid()
    },
    userId: {
        type: String,
        required: false,
    },
    tittle: {
        type: String,
        required: false
    },
    descryption: {
        type: String,
        required: false
    },
    venue: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state:{
        type: String,
        required: false
    },
    createdAt:{
        type:Number,
        required:true
    },
    updatedAt:{
        type:Number,
        required:false
    }
}
)
const userEvent = mongoose.model("Event", eventsSchema);
export default userEvent