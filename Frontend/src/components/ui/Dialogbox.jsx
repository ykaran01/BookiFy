import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeorder } from "../componestsImp/service/service";

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Dialogbox = () => {
    const user  =  useUser()
    let name = user.user.fullName
    const navigate = useNavigate();
    const [Address,setAddress] = useState({
        street:"",
        city:"",
        state:"Uttar Pradesh",
        pincode:"",
        
    })
    const [phoneNumber,setPhoneNumber] = useState("")

    const handleChange  = (e)=>{
        const {name,value} = e.target
        setAddress({...Address, [name]:value})
    }
    const handleSubmit = async()=>{
        try{
            if(!Address.city || !Address.state || !Address.pincode || !Address.street){
                alert('Add the correct Number')
        }
        if(!phoneNumber || phoneNumber.length!=10){
            alert('Fill The Phone Number')
        }
        
        await placeorder(Address,phoneNumber)
       
        }catch(err){
            console.log(err.message)
        }
        
    }


    return (
        <div className="w-screen h-screen bg-cover bg-center bg-[url('https://png.pngtree.com/background/20230524/original/pngtree-several-books-that-are-stacked-together-on-a-dark-black-background-picture-image_2714911.jpg')]" >
            <Dialog open={true}>
                <DialogContent className="bg-zinc-950 text-white w-[92vw] max-w-2xl border-zinc-800 rounded-lg max-h-[90vh] overflow-y-auto p-6 md:p-8">

                    <DialogHeader>
                        <DialogTitle className="text-center text-xl md:text-2xl font-bold tracking-tight">
                            Confirm Your Details
                        </DialogTitle>
                    </DialogHeader>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs md:text-sm font-medium text-zinc-400 mb-1">Full Name</label>
                            <input
                                type="text"
                                readOnly
                                className="border border-zinc-800 rounded-md px-3 py-2 bg-zinc-900 text-zinc-400 outline-none cursor-not-allowed"
                                placeholder={name}
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs md:text-sm font-medium text-zinc-400 mb-1">Street Address</label>
                            <input
                                value={Address.street}
                                name="street"
                                type="text"
                                className="border border-zinc-800 rounded-md px-3 py-2 bg-zinc-900/50 text-white placeholder-zinc-500"
                                placeholder="Enter the Street"
                                onChange={(e)=>{
                                    handleChange(e)
                                }}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs md:text-sm font-medium text-zinc-400 mb-1">City</label>
                            <input
                            value={Address.city}
                                name="city"
                                type="text"
                                className="border border-zinc-800 rounded-md px-3 py-2 bg-zinc-900/50 text-white placeholder-zinc-500"
                                placeholder="Enter the City"
                                onChange={(e)=>{
                                    handleChange(e)
                                }}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs md:text-sm font-medium text-zinc-400 mb-1">State</label>
                            <select
                                value={Address.state}
                                name="state"
                                className="border border-zinc-800 rounded-md px-3 py-2.5 bg-zinc-900 text-white focus:border-green-500 "
                                onChange={(e)=>{
                                    handleChange(e)
                                }}
                                    
                            >
                                <option value="" disabled className="text-zinc-500">Select State</option>
                                {STATES.map((item) => (
                                    <option key={item} value={item} className="bg-zinc-900">{item}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs md:text-sm font-medium text-zinc-400 mb-1">Pincode</label>
                            <input
                                onChange={(e)=>{
                                    handleChange(e)
                                }}
                                value={Address.pincode}
                                name="pincode"
                                type="number"
                                className="border border-zinc-800 rounded-md px-3 py-2 bg-zinc-900/50 text-white placeholder-zinc-500"
                                placeholder="Enter Pincode"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs md:text-sm font-medium text-zinc-400 mb-1">Phone Number</label>
                            <input
                            value={phoneNumber}
                            onChange={(e)=>{
                                setPhoneNumber(e.target.value)
                            }}
                                name="phoneNumber"
                                type="number"

                                className="border border-zinc-800 rounded-md px-3 py-2 bg-zinc-900/50 text-white placeholder-zinc-500"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full sm:w-1/3 text-white bg-zinc-800 hover:bg-zinc-700 active:scale-95 py-2.5 rounded-md text-base font-semibold transition-all cursor-pointer border border-zinc-700"
                        >
                            Back
                        </button>
                        <button
                        onClick={()=>{
                            handleSubmit()
                        }}
                            type="submit"
                            className="w-full sm:w-2/3 text-white bg-blue-600 hover:bg-blue-500 active:scale-95 py-2.5 rounded-md text-base font-semibold transition-all cursor-pointer "
                        >
                            Continue
                        </button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Dialogbox;