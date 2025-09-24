import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js"; 

export const addAddressController = async(req,res)=>{
    try {
        const userId = req.user._id // middleware
        const { street , city, state, postalCode, country } = req.body

        const createAddress = new AddressModel({
            street,
            city,
            state,
            country,
            postalCode,
            userId : userId 
        })
        const saveAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId,{
            $push : {
                address_details : saveAddress._id
            }
        })

        return res.json({
            message : "Address Created Successfully",
            error : false,
            success : true,
            data : saveAddress
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getAddressController = async(req,res)=>{
    try {
        const userId = req.user._id // middleware auth

        const data = await AddressModel.find({ userId : userId }).sort({ createdAt : -1})

        return res.json({
            data : data,
            message : "List of address",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const updateAddressController = async(req,res)=>{
    try {
        const userId = req.user._id // middleware auth 
        const { _id ,street, city,state,country, postalCode  } = req.body 

        const updateAddress = await AddressModel.updateOne({ _id : _id, userId : userId },{
            street,
            city,
            state,
            country,
            postalCode
        })

        return res.json({
            message : "Address Updated",
            error : false,
            success : true,
            data : updateAddress
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteAddresscontroller = async(req,res)=>{
    try {
        const userId = req.user._id // auth middleware    
        const { _id } = req.body 

        const disableAddress = await AddressModel.updateOne({ _id : _id, userId: userId},{
            status : false
        })

        return res.json({
            message : "Address remove",
            error : false,
            success : true,
            data : disableAddress
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
