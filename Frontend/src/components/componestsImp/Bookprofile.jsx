import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { increment, decrement, add, fetchCart } from '../../Redux/features/CartSlice'; 
import { showErrorToast } from "../../helper/toast.helper.js";
import {  bookById } from './service/service';
import Navbar from './Navbar';
import Review from './Review';
import { useAuth } from "@clerk/clerk-react";
const Bookprofile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
     const { getToken } = useAuth();
    const obook = useSelector((state) => state.cart.value) || [];
    
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
   


    useEffect(() => {
        const getBook = async () => {
            try {
                setLoading(true);
                const response = await bookById(id,getToken);
                setBook(response);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };
        if (id) getBook();
        dispatch(fetchCart(getToken));
    }, [id, dispatch]);

   
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
        )
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

  <div className="flex flex-col min-h-screen w-screen bg-zinc-900">
  <Navbar />
  <div className="flex-1 flex justify-center items-start p-6 pt-8">
    <div className="flex flex-row bg-zinc-800 rounded-2xl overflow-hidden w-full max-w-3xl shadow-xl">

      <div className="w-72 flex-shrink-0 flex items-center justify-center p-6 bg-zinc-900">
        <img
          className="w-full max-w-[200px] rounded-lg shadow-md hover:scale-105 transition-all duration-300"
          style={{ aspectRatio: '2/3', objectFit: 'cover' }}
          src={book.image} alt={book.name}
        />
      </div>

     
      <div className="flex-1 p-7 flex flex-col gap-4 text-white min-w-0">
        <div>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-orange-400 transition-colors mb-3 group">
            ← Back to home
          </Link>
          <p className="text-orange-400 text-xs font-medium uppercase tracking-wider mb-1">
            {book?.category?.name || 'Uncategorized'}
          </p>
          <h1 className="text-2xl font-semibold leading-tight">{book.name}</h1>
          <p className="text-sm text-zinc-400 mt-1">By {book.author}</p>
        </div>

        <hr className="border-zinc-700" />

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Price</p>
            <p className="text-3xl font-semibold text-green-400">₹{book.price}</p>
          </div>
          <span className="text-xs text-orange-400 border border-orange-400/30 bg-orange-400/10 rounded-md px-2.5 py-1">
            {maxAvailableStock} in stock
          </span>
        </div>

        <hr className="border-zinc-700" />

        <div>
          <p className="text-xs font-medium text-zinc-400 mb-2">Synopsis</p>
          <p className="text-sm text-zinc-300 leading-7 max-h-24 overflow-y-auto pr-1 scrollContainer">
            {book.description}
          </p>
        </div>

       
        <div className="mt-auto pt-2">
         
        </div>
      </div>
    </div>
  </div>
  <Review id={id} />
</div>
};

export default Bookprofile;