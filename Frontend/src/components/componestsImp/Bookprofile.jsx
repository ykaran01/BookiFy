import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // 1. Added Redux hooks
import { increment, decrement, add, fetchCart } from '../../Redux/features/CartSlice'; // 2. Imported Cart Actions
import { showErrorToast } from "../../helper/toast.helper.js"; // 3. Imported Toast Helper
import { addreview, bookById } from './service/service';
import Navbar from './Navbar';
const Bookprofile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const obook = useSelector((state) => state.cart.value) || [];
    const [ratingnum, setratingnum] = useState(5)
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comment, setComment] = useState("");


    useEffect(() => {
        const getBook = async () => {
            try {
                setLoading(true);
                const response = await bookById(id);
                setBook(response);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };
        if (id) getBook();
        dispatch(fetchCart());
    }, [id, dispatch]);

    const handleSubmit =  async()=>{
        if(!comment){
            showErrorToast("added Comment Also")
            return 
        }
        try{
             const resposne = await addreview(comment,ratingnum,id)
             setComment("")
        }
        catch(err){
            showErrorToast("Can't post The Review")
        }
       
    }
    const incrementQuantity = (bookId, currentQty, maxStock) => {
        if (currentQty >= maxStock) {
            showErrorToast("Cannot add more items. Maximum stock limit reached.");
            return;
        }
        dispatch(increment(bookId));
    };

    const decrementQuantity = (bookId) => {
        dispatch(decrement(bookId));
    };

    const addtoCart = (currentBook) => {
        dispatch(add(currentBook));
    };

    if (loading) {
        return (
            <div className="w-screen h-screen bg-zinc-900 flex justify-center items-center">
                <h1 className="text-white text-2xl">Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-screen bg-zinc-900 flex justify-center items-center">
                <h1 className="text-red-500 text-2xl">{error}</h1>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="w-screen h-screen bg-zinc-900 flex justify-center items-center">
                <h1 className="text-white text-2xl">Book not found</h1>
            </div>
        );
    }
    const cartItem = obook.find((item) => item._id === book._id);
    const maxAvailableStock = book.quantity;

    return (
        <div className="flex flex-col min-h-screen w-screen bg-zinc-900">
            <Navbar />

            <div className="flex-1 flex justify-center items-center p-6">
                <div className="flex flex-col md:flex-row gap-8 bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl relative">


                    <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-zinc-900">
                        <img
                            className="h-[500px] object-cover rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                            src={book.image}
                            alt={book.name}
                        />
                    </div>


                    <div className="w-full md:w-1/2 p-8 flex flex-col gap-8 text-white">


                        <div>
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-orange-400 transition-colors duration-200 mb-4 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Back to Home
                            </Link>

                            <p className="text-orange-400 font-medium mb-2">
                                {book?.category?.name || 'Uncategorized'}
                            </p>

                            <h1 className="text-5xl font-bold mb-3">
                                {book.name}
                            </h1>

                            <h2 className="text-2xl text-zinc-400">
                                By {book.author}
                            </h2>
                        </div>

                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-zinc-400 mb-1">Price</p>
                                <h1 className="text-4xl font-bold text-green-400">
                                    ₹{book.price}
                                </h1>
                            </div>
                            <p className="text-xs text-orange-400 font-medium mb-1">
                                Stock available: {maxAvailableStock}
                            </p>
                        </div>


                        <div>
                            <h2 className="text-xl font-semibold mb-3">
                                Synopsis
                            </h2>
                            <div className="max-h-[150px] overflow-y-auto pr-2 scrollContainer">
                                <p className="text-zinc-300 leading-7">
                                    {book.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-auto h-14">
                            {!cartItem ? (
                                <button
                                    onClick={() => addtoCart(book)}
                                    disabled={maxAvailableStock <= 0}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 h-full ${maxAvailableStock <= 0
                                        ? "bg-zinc-700 text-zinc-400 cursor-not-allowed w-full md:w-auto"
                                        : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
                                        }`}
                                >
                                    {maxAvailableStock <= 0 ? "Out of Stock" : "Add To Cart"}
                                </button>
                            ) : (

                                <div className="flex items-center bg-neutral-900 border border-zinc-700 rounded-lg overflow-hidden h-full shadow-md">
                                    <button
                                        onClick={() => decrementQuantity(book._id)}
                                        className="w-12 h-full flex items-center justify-center text-neutral-400 text-xl font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
                                    >
                                        −
                                    </button>

                                    <input
                                        type="number"
                                        readOnly
                                        value={cartItem.quantity}
                                        className="w-10 h-full text-center outline-none font-bold text-sm text-white pointer-events-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />

                                    <button
                                        onClick={() => incrementQuantity(book._id, cartItem.quantity, maxAvailableStock)}
                                        disabled={cartItem.quantity >= maxAvailableStock}
                                        className={`w-12 h-full flex items-center justify-center text-xl font-medium transition-colors ${cartItem.quantity >= maxAvailableStock
                                            ? "text-zinc-600 cursor-not-allowed bg-zinc-800/40"
                                            : "text-neutral-400 hover:bg-zinc-800 cursor-pointer"
                                            }`}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <div className='Review flex  items-center p-6   justify-evenly gap-3'>
                <div className='  bg-slate-950 text-white mt-2 shadow-xl flex flex-col border gap-5 w-120 border-white rounded-2xl p-4 '>
                    <h1 className='text-xl font-medium'>Add Review</h1>
                    <div className='text-3xl flex gap-2'>
                        {
                            [1, 2, 3, 4, 5].map((num) => (
                                <button
                                    className={(num <= ratingnum) ? 'text-orange-400 cursor-pointer' : 'text-zinc-600 cursor-pointer'}
                                    value={num}
                                    onClick={() => {
                                        setratingnum(num)
                                    }}
                                >
                                    ★
                                </button>
                            ))
                        }
                    </div>
                    <textarea value={comment}
                        onChange={(e) => setComment(e.target.value)} rows={5} className='border px-2 py-1' placeholder='Add Your Comments...' ></textarea>
                    <button   
                    onClick={handleSubmit}
                    className='bg-orange-400 py-2 rounded-2xl '>Sumbit</button>
                </div>
                <div className='Comments w-160 h-[340px] overflow-y-auto '>
                    <h1 className='text-2xl font-bold text-zinc-200 mb-7'>Comments</h1>
                    <div className='w-full p-5 gap-2 rounded flex mb-6 bg-zinc-950 '>
                        <div className='text-white tracking-tighter text-xs'>
                            <h1 className='mb-1 text-sm text-blue-400'>Karan</h1>
                            <p className='text-zinc-300'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde aliquid quis, ducimus doloribus nobis distinctio vitae facere rerum vel ab, cum voluptates? Consectetur, amet.</p>
                        </div>

                        <div className='text-orange-400 text-xl  flex gap-2' >★★★★★</div>
                    </div>
                    <div className='w-full p-5 gap-2 rounded flex  bg-zinc-950 '>
                        <div className='text-white tracking-tighter text-xs'>
                            <h1>Karan</h1>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde aliquid quis, ducimus doloribus nobis distinctio vitae facere rerum vel ab, cum voluptates? Consectetur, amet.</p>
                        </div>
                        <div className='text-orange-400 text-xl  flex gap-2' >★★★★★</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookprofile;