import { asyncHandeler } from "../utilities/asyncHandler.js";
import { AddressModel } from '../modules/address.modules.js'

const createAddress = (data) => {
    try {
        const { street, city, state, pincode, user } = data
        const resposne = AddressModel.create({
            street,
            city,
            state,
            pincode,
            user
        })  
        
        if (!resposne) {
            throw new Error('address Model is not created')
        }
        return resposne._id;
    } catch (err) {
        throw err
    }


}

export {createAddress}