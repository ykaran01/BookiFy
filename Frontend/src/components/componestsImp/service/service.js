import axios from "axios"
const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
})

export const fetchProducts = async () => {
    try {
        const response = await API.get('/products/all')
        return response.data.data

    } catch (err) {
        throw err
    }
}

export const putelemtincart = async (data) => {
    try {
        
        const items = data.map((item) => ({
            product: item._id,
            quantity: item.quantity
        }
        ))
        const totalPrice = data.reduce((acc,item)=>{
            return acc+(item.price*item.quantity)
        },0)
        const response = await API.patch('/cart/additems',{items,totalPrice});
        return response.data.data

    } catch (err) {
        console.log(err.message)
    }
}

export const userHistory = async()=>{
    try{
        
        const response  = await API.get('/order/history')
        
        return response.data.data
    
    }catch(err){
        throw err
    }
}

export const search = async({query ,selectedCategory})=>{
    try{
        const response =  await API.get('/products/search',{
            params:{
                category: selectedCategory,
                
                query:query || null
                }
            }
        )
        return response.data.data;
        
    }catch(err){
        console.log(err.message)
    }
}

export const placeorder = async(shippingAddress,phoneNumber)=>{
    try{
        const response =  await API.post('/order/place',{ shippingAddress,phoneNumber
        })
    }catch(err){
        console.log(err.message)
    }
}