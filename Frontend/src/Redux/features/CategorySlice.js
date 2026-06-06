import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
const API = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
})
export const fetchCategory = createAsyncThunk('fetchCategory',
    async () => {
        try{
            const response = await API.get('/category')
            const ans = response.data.data || []
            return ans
        }catch(err){
            throw new Error(err.message)
        }
    }
)
const initialState = {
    isLoading: false,
    isError: false,
    values: [],

}
export const CategorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        add: (state, action) => {
            state.values.push({ ...action.payload, quantity: 1 })
        },
        remove: (state, action) => {
            state.values = state.values.filter((items) => items.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.values = action.payload;
        })
        builder.addCase(fetchCategory.pending, (state, action) => {
            state.isLoading = true;
        }),
            builder.addCase(fetchCategory.rejected, (state, action) => {
                state.isError = true;
            })
    }
})

export const {add, remove } = CategorySlice.actions

export default CategorySlice.reducer