import { useState, useEffect } from "react";
import { fetchProducts } from "./service/service";
import Navbar from './Navbar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, add } from '../../Redux/features/CartSlice'
import { fetchCart } from "../../Redux/features/CartSlice";
import { fetchCategory } from "../../Redux/features/CategorySlice";
import { showErrorToast } from "../../helper/toast.helper.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
export default function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()
   const { getToken } = useAuth();
  const obook = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setBooks(data);
    };
    loadProducts();
    dispatch(fetchCart(getToken));
    dispatch(fetchCategory(getToken));
  }, [dispatch]);

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

  const addtoCart = (book) => {

    dispatch(add(book))
  }

  return (
    <>
      <div className="bg-black text-zinc-100">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <main className="container mx-auto px-4 py-8 ">

          <section className="mb-12 min-h-full">
            <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
              <a href="#books">
                <img
                  src="main.png"
                  className="w-full h-auto cursor-pointer hover:scale-[1.01] transition duration-300 ease-in-out"
                  alt="Bookify - Your Ultimate Bookstore"
                />
              </a>
            </div>
          </section>

          <section id="books  min-h-full">
            <div>
              <h2 className="w-full text-3xl flex justify-center text-white font-bold p-1 mb-6 border-b-2 border-orange-300">Featured Books</h2>
            </div>
            <div className="Boooks">

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6 m-1.5 ">
                {books.map((book) => {
                  const cartItem = obook.find((item) => item._id === book._id);

                  const maxAvailableStock = book.quantity || 5;

                  return (
                    <HoverCard key={book._id} openDelay={1000} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <div className="bg-zinc-900 p-4 rounded-xl flex flex-col justify-between h-full shadow-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
                          <div>
                            <div className="flex justify-center items-center h-50 w-full mb-4 bg-zinc-900/50 rounded-lg overflow-hidden p-1">
                              <img
                                src={book.image}
                                alt={book.name}
                                onClick={() => {
                                  navigate(`book/${book._id}`)
                                }}
                                className="hover:scale-105 transition duration-300 cursor-pointer max-h-full object-contain rounded"
                              />
                            </div>

                            <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-2 min-h-[2.5rem] text-zinc-200">
                              {book.name}
                            </h3>
                          </div>

                          <div className="flex gap-2 justify-between items-center pt-2 mt-auto border-t border-zinc-800/60">
                            <p className="text-sm font-bold text-green-500 whitespace-nowrap">
                              ₹ {book.price}
                            </p>

                            {!cartItem ? (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addtoCart(book);
                                }}
                                disabled={maxAvailableStock <= 0}
                                className={`rounded-xl text-[11px] lg:text-xs font-medium py-1.5 px-3 transition-all whitespace-nowrap ${maxAvailableStock <= 0
                                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                                    : "bg-orange-500 cursor-pointer hover:scale-[1.02] text-white hover:bg-orange-600"
                                  }`}
                              >
                                {maxAvailableStock <= 0 ? "Out of Stock" : "Add To Cart"}
                              </button>
                            ) : (
                              <div className="flex items-center bg-neutral-900 border border-zinc-700 rounded-xl overflow-hidden w-fit shadow-md">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    decrementQuantity(book._id);
                                  }}
                                  className="w-7 h-7 flex items-center justify-center text-neutral-400 cursor-pointer hover:bg-zinc-800 transition-colors"
                                >
                                  −
                                </button>

                                <input
                                  type="number"
                                  readOnly
                                  value={cartItem.quantity}
                                  className="w-6 h-7 text-center outline-none font-semibold text-xs text-white pointer-events-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />

                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    incrementQuantity(book._id, cartItem.quantity, maxAvailableStock);
                                  }}
                                  disabled={cartItem.quantity >= maxAvailableStock}
                                  className={`w-7 h-7 flex items-center justify-center transition-colors ${cartItem.quantity >= maxAvailableStock
                                      ? "text-zinc-600 cursor-not-allowed bg-zinc-800/40"
                                      : "text-neutral-400 cursor-pointer hover:bg-zinc-800"
                                    }`}
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </HoverCardTrigger>

                      <HoverCardContent
                        side={"bottom"}
                        className="bg-[#1e1e1e] border-zinc-800 text-white w-64 shadow-2xl"
                      >
                        <h3 className="text-sm font-bold mb-1 text-zinc-100">
                          {book.name}
                        </h3>

                        <p className="text-xs text-gray-400 mb-1">
                          by {book.author}
                        </p>

                        <p className="text-[11px] text-orange-400 font-medium mb-3">
                          Stock available: {maxAvailableStock}
                        </p>

                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {book.description.slice(1, 100) + "..." || `${book.name} is a great book!`}
                        </p>
                        <div  
                        onClick={() => {
                                  navigate(`book/${book._id}`)
                                }}
                        className="text-blue-500 tracking-tight cursor-pointer" >Tap to View Details</div>
                      </HoverCardContent>
                    </HoverCard>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        <footer className="bg-zinc-900 border-t border-zinc-800 py-6">
          <div className="container mx-auto px-4">
            <p className="text-center text-zinc-500 text-sm">
              Developed by <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> ❤️ Karan Kumar Yadav</a>
            </p>
          </div>
        </footer>
      </div>

    </>
  );
}