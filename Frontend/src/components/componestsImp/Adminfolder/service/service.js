import axios from "axios"


const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
})


export const addproduct = async (data) => {
    try {
        const response = await API.post('/products/add', data)

        return

    } catch (err) {
        throw err;
    }

}

export const addCategory = async (name) => {
    try {
        const response = await API.post('/category/add', { name });
        return
    } catch (err) {

        throw err;
    }
}

export const deletecategory = async (name) => {
    try {
        const response = await API.delete(`/category/delete/${name}`)
        return
    } catch (err) {

        throw err;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await API.delete(`/products/delete/${id}`)
        return
    } catch (err) {

        throw err;
    }
}
export const updateProduct = async (id, data) => {
    try {
       await API.put(`/products/update/${id}`, data)
    } catch (err) {
        console.error(err.message)
    }
}
export const getorders = async()=>{
    try{
        const response = await API.get('/order/all')
        return response.data
    } catch (err) {
        throw err
    }
}

export const changeOrderStatus = async(orderId,status)=>{
    try{
        const response = await API.put(`/order/status/${orderId}/${status}`)
        return response.data
    }catch(err){
        throw err
    }
}

export const getAllOrders = async()=>{
    try{
        const response = await API.get('/order/rest')
        const array = response.data.data
         array.map((item)=>{
            const numberOfItems = item.item.reduce((arr,item)=>{
                return arr + item.quantity
            },0)
            item.numberOfItems = numberOfItems
         
        })
        
        return array
    }catch(err){
        throw err
    }
}

export const getTheinformation = async()=>{
    try{
        const response = await API.get('/order/info')
        return response.data
    }catch(err){
        throw err
    }
}

