import React, { useState } from 'react';
import Navbar from '../Navbar';
import { addproduct } from './service/service.js';
import { PackagePlus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '@/Redux/features/CategorySlice';
import { showSuccessToast, showErrorToast } from '@/helper/toast.helper.js';
const Addproduct = () => {
    const navigate =  useNavigate()
    const categories = useSelector((state) => state.category.values)
    const [loading, setLoading] = useState(false);
    const initialFormState = {
        name: '',
        author: '',
        price: '',
        category: 'Uncategorized',
        description: '',
        quantity: ''
    };
     const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategory());
      }, [dispatch]);

    const [product, setProduct] = useState(initialFormState);
    const [file, setFile] = useState(null);

    const change = (e) => {
        const f = e.target.files[0];
        if (f) setFile(f);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.price || !file || !product.category || !product.quantity) {
            ShowErrorToast("Please fill in all required fields.");
            return 
        }
        const formdata = new FormData();
        for (let key in product) {
            formdata.append(key, product[key]);
        }
        formdata.append("image", file);
        try {

            setLoading(true);
            await addproduct(formdata);
            showSuccessToast("Product added successfully.");
            setLoading(false);
            setFile(null);
            setProduct(initialFormState);
        } catch (error) {
            console.error("Failed to add product:", error);
            setLoading(false);
            showErrorToast("Failed to add product.");
        }
    };
    return (
        <>

            <div className="min-h-screen bg-black w-full text-neutral-100 p-6 font-sans flex justify-center items-center">
                <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-2xl">

                    <div className="border-b border-neutral-800 pb-4 mb-6  flex  justify-between items-center w-full">
                        <div>
                            <h2 className="text-3xl font-bold text-blue-500 flex items-center gap-2">
                                <span><PackagePlus size={30} /></span> Add New Book Product
                            </h2>
                            <p className="text-xs text-neutral-400 mt-1">Fill out the details below to add this book to your shop.</p>
                        </div>
                        <div>
                            <button  onClick={(e)=>{
                                e.preventDefault()
                                navigate('/category')
                            }} className='bg-blue-600 flex items-center gap-2 px-2 py-2 transition-all scroll-smooth hover:sacle-[1.02] active:scale-[0.98] hover:bg-blue-800 text-xs text-white font-bold rounded-xl' > <CirclePlus size={20} />    <h1>Add new Categories</h1></button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-neutral-400">Book Title *</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                placeholder="e.g., The Great Gatsby"
                                className="bg-black border border-neutral-800 text-sm rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:border-blue-500 outline-none transition"
                            />
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-neutral-400">Author Name</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={product.author}
                                    onChange={handleChange}
                                    placeholder="e.g., F. Scott Fitzgerald"
                                    className="bg-black border border-neutral-800 text-sm rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:border-blue-500 outline-none transition"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-neutral-400">Price (₹) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="bg-black border border-neutral-800 text-sm rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:border-blue-500 outline-none transition"
                                />
                            </div>
                        </div>


                        <div className="flex justify-between gap-3">
                            <div className='flex flex-col gap-1.5 w-1/2'>
                                <label className="text-xs font-semibold text-neutral-400">Genre / Category *</label>
                                <select
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    className="bg-black border border-neutral-800 text-sm rounded-lg px-3 py-2.5 text-white focus:border-blue-500 outline-none cursor-pointer font-medium transition"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col gap-1.5 w-1/2'>
                                <label className="text-xs font-semibold text-neutral-400">Quantity *</label>
                                <input
                                    name='quantity'
                                    type="number"
                                    value={product.quantity}
                                    onChange={handleChange}
                                    placeholder='e.g., 2'
                                    className="bg-black border border-neutral-800 text-sm rounded-lg px-3 py-2.5 text-white focus:border-blue-500 outline-none transition"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-neutral-400">Book Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={product.description}
                                onChange={handleChange}
                                placeholder="Write a brief summary or notes about the book..."
                                className="bg-black border border-neutral-800 text-sm rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:border-blue-500 outline-none transition resize-none"
                            />
                        </div>


                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-neutral-400">Product Image *</label>
                            <div className="bg-black px-4 py-3 border border-neutral-800 border-dashed rounded-xl w-full flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <span className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-4 py-2 rounded-lg font-semibold border border-neutral-700 transition">
                                        Choose File
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={change}
                                        className="hidden"
                                    />
                                </label>
                                <span className="text-xs text-neutral-400 truncate max-w-xs">
                                    {file ? file.name : "No file chosen"}
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 w-full justify-center flex">
                            <button

                                type="submit"
                                className="w-full sm:w-auto px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-lg"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Product to Shop"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default Addproduct;