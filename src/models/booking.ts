import mongoose from "mongoose";
import { Schema } from "mongoose";
import {nanoid} from 'nanoid'
const bookingsSchema = new Schema({
    _id:{
        type :String,
        default:() =>nanoid()
    },
    userId: {
        type: String,
        required: false,
    },
    eventId: {
        type: String,
        required: false
    },
    by: {
        type: String,
        enum:{user:'user',admin:'admin',manager:'manager'},
        required: false
    }
},
    { timestamps: true }
)
const booked = mongoose.model("Booked", bookingsSchema);
export default booked