import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
})
export const fetchCart = createAsyncThunk('featchCart',
    async () => {
        try {
            const response = await API.get('/cart/items',)
            let ans = response.data.data.items || []
            const products = ans.map(item => ({
                ...item.product,
                stock : item.product.quantity,
                quantity: item.quantity
            }));
            console.log(ans);
            
            return products
        } catch (err) {
            throw new Error(err.message)
        }
 

    }
)
const initialState = {
    isLoading: false,
    isErorr: false,
    value: [],

}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value.push({ ...action.payload, quantity: 1 })
        },
        remove: (state, action) => {
            state.value = state.value.filter((items) => items._id !== action.payload)
        },
        increment: (state, action) => {
            const item = state.value.find((items) => items._id === action.payload)
            item.quantity++;
        },
        decrement: (state, action) => {
            const item = state.value.find((items) => items._id === action.payload)
            if (item.quantity == 1) {
                state.value = state.value.filter((items) => items._id !== action.payload)
            } else {
                item.quantity--;

            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.value = action.payload;
        })
        builder.addCase(fetchCart.pending, (state, action) => {
            state.isLoading = true;
        }),
            builder.addCase(fetchCart.rejected, (state, action) => {
                state.isErorr = true;
            })

    }
})

export const { increment, decrement, add, remove } = CartSlice.actions

export default CartSlice.reducer