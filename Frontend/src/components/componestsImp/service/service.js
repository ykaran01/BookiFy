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
        throw err
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

export const search = async({query ,selectedCategory ,sortOrder})=>{
    try{
        const response =  await API.get('/products/search',{
            params:{
                category: selectedCategory,
                sortOrder: sortOrder || null,
                query:query || null
                }
            }
        )
        return response.data.data;
        
    }catch(err){
       throw err
    }
}

export const bookById = async(id)=>{
    try{
        const {data} = await API.get(`/products/getproduct/${id}`);
        return data.data
    }catch(err){
        console.log(err.message)
    }
   
}

export const addreview = async(comment,rating,id)=>{
    try{
         const {data} = API.post(`/review/${id}`,{comment,rating})
    }
    catch(err){
        console.log(err.message)
    }
   

}


