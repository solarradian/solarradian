import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    postalCode : {
        type : String
    },
    country : {
        type : String
    },
    status : {
        type : Boolean,
        default : true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        default : ""
    }
},{
    timestamps : true
})

const AddressModel = mongoose.model('Address',addressSchema)

export default AddressModel