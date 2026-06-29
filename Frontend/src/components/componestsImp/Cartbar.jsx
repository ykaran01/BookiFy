import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, } from "@/components/ui/sheet";
import { useEffect, useState, useRef } from "react";
import { Trash } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { remove, increment, decrement } from '../../Redux/features/CartSlice'
import { putelemtincart } from "./service/service";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../helper/toast.helper.js";
import { useAuth } from "@clerk/clerk-react";
export default function Example({ isOpen, onOpenChange }) {
    const navigate = useNavigate()
     const { getToken } = useAuth();
    const firstrender = useRef(true)
    const book = useSelector((state) => state.cart.value) || [];
    const dispatch = useDispatch()
    useEffect(() => {
        if (firstrender.current) {
            firstrender.current = false
            return;
        }
        const timer = setTimeout(() => {
            putelemtincart(book,getToken)
        }, 500)
        return () => clearTimeout(timer)
    }, [book])

    const removeFromCart = (id) => {
        dispatch(remove(id))
    }

    const incrementQuantity = (id, currentQty, maxStock) => {
        if (currentQty >= maxStock) {
            showErrorToast("Cannot add more items. Maximum stock limit reached.");
            return;
        }
        dispatch(increment(id))
    }

    const decrementQuantity = (id) => {
        dispatch(decrement(id))
    }

    const totalprice = book.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="bg-black text-white border-zinc-800">
                <SheetHeader>
                    <SheetTitle className="text-3xl flex justify-center w-full text-orange-400 font-bold" > Your Cart</SheetTitle>
                    <SheetDescription className="text-sm flex justify-center text-gray-400">
                        Review your cart items and proceed to checkout.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col flex-1 overflow-y-auto p-2 custom-scrollbar scrollContainer" >
                    <div>
                        {book.map((books) => {

                            const maxAvailableStock = Number(books.stock);
                            const isMaxStockReached = books.quantity >= maxAvailableStock;

                            return (
                                <div key={books._id} className="flex items-center gap-4 p-4 border-b border-zinc-800 ">
                                    <img src={books?.image} alt={books?.name} className="w-16 h-20 object-cover rounded" />
                                    <div className="flex justify-between w-full items-center">

                                        <div>
                                            <h3 className="text-sm font-medium">{books?.name}</h3>
                                            <p className="text-xs text-gray-400">{books?.author}</p>
                                            <p className="text-sm font-semibold text-zinc-300">₹ {books?.price}</p>
                                            {isMaxStockReached && (
                                                <p className="text-[10px] text-orange-400 mt-1 font-medium">Max stock limit reached</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-center gap-3">
                                            <button className="cursor-pointer" onClick={(e) => {
                                                e.preventDefault();
                                                removeFromCart(books._id);
                                            }} >
                                                <Trash size={20} color="red" />
                                            </button>
                                            <div className="flex items-center bg-neutral-900 border border-zinc-800 rounded-xl overflow-hidden w-fit shadow-md">
                                                <button className="w-8 h-7 flex items-center justify-center text-neutral-400 cursor-pointer hover:bg-zinc-800 transition-colors" onClick={(e) => {
                                                    e.preventDefault();
                                                    decrementQuantity(books._id);
                                                }}>
                                                    −
                                                </button>

                                                <input
                                                    type="number"
                                                    readOnly
                                                    value={books.quantity}
                                                    className="w-8 h-7 text-center outline-none font-semibold text-white pointer-events-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <button
                                                    className={`w-8 h-7 flex items-center justify-center transition-colors ${isMaxStockReached
                                                            ? "text-zinc-600 cursor-not-allowed bg-zinc-800/40"
                                                            : "text-neutral-400 cursor-pointer hover:bg-zinc-800"
                                                        }`}
                                                    disabled={isMaxStockReached}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        incrementQuantity(books._id, books.quantity, maxAvailableStock);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={{ display: book.length === 0 ? "none" : "block" }} className="flex gap-4 flex-col sticky  p-4 bg-black border-t border-zinc-800">
                    <div>
                        <p className=" text-green-500 font-bold mb-1">Total: ₹ {totalprice.toFixed(2)}</p>
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault()
                        navigate('/dialog')

                    }} className="w-full bg-orange-600 py-2 outline-none text-xl rounded-2xl  text-white">Proceed to Checkout</button>
                </div>

            </SheetContent>
        </Sheet>
    );
}