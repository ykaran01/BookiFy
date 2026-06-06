import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import Dropdown from "./Dropdown"
import Orderbar from "../componestsimp/Orderbar";
import { BookOpen, ShoppingBag, ShieldCheck } from 'lucide-react'
import SearchBar from "../componestsimp/Search"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, add } from '../../Redux/features/CartSlice'
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { search } from '../componestsImp/service/service.js'
import {showErrorToast} from "../../helper/toast.helper.js"
export default function AppSidebar() {
  const [books, setbooks] = useState([])
  const [sortOrder, setSortOrder] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const navigate = useNavigate()
  const [isOpen, onOpenChange] = useState(false)
  const dispatch = useDispatch()
  const [query, setquery] = useState("")
  
  useEffect(() => {
    if (!query.trim() && selectedCategory === null) {

      return;
    }
    const timer = setTimeout(async () => {
      const data = await search({ sortOrder, selectedCategory, query })
      
      setbooks(data || [])
    }, 600)
    return () => clearTimeout(timer)
  }, [sortOrder, selectedCategory, query])

  const cartItems = useSelector((state) => state.cart.value) || []
  
  const handleAddToCart = (book) => {
    const maxAvailableStock = book.stock || 5;
    if (maxAvailableStock <= 0) {
      showErrorToast("Cannot add this item. Out of stock.");
      return;
    }
    dispatch(add(book))
  }

  const handleIncrement = (bookId, currentQty, maxStock) => {
    if (currentQty >= maxStock) {
      showErrorToast("Cannot add more items. Maximum stock limit reached.");
      return;
    }
    dispatch(increment(bookId))
  }

  const handleDecrement = (bookId) => {
    dispatch(decrement(bookId))
  }

  const { user, isLoaded } = useUser()
  let admin = false;
  if (isLoaded) {
    const email = user?.emailAddresses[0].emailAddress || ""
    admin = (email === import.meta.env.VITE_EMAIL) ? true : false
  }

  return (
    <Sidebar className="bg-zinc-900 text-zinc-100 border-r border-zinc-800">
    
      <SidebarHeader className="bg-zinc-900 border-b border-zinc-800 flex flex-col gap-3 p-4">
        <div className="flex items-center gap-2 px-1 py-0.5">
          <BookOpen size={18} className="text-orange-500" />
          <span className="font-semibold text-sm tracking-wide text-zinc-100">
            BookShelf
          </span>
        </div>
        
        <Orderbar isOpen={isOpen} onOpenChange={onOpenChange}     />
        
        <div className="space-y-2 mt-1">
          <SearchBar query={query} setquery={setquery} />
          <Dropdown 
            sortOrder={sortOrder} 
            setSortOrder={setSortOrder} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory}  
          />
        </div>
      </SidebarHeader>

      
      <SidebarContent className="bg-zinc-900/50">
        <SidebarGroup className="px-3 py-3">
          <SidebarGroupLabel className="px-1 mb-2">
            <h1 className="text-[11px] flex w-full justify-center font-medium tracking-wide uppercase text-zinc-500">
              {books.length ? `${books.length} Books found` : "Discover Books"}
            </h1>
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex flex-col gap-2">
            {books.map((book) => {
              const cartItem = cartItems.find((item) => item._id === book._id);
              
              
              const maxAvailableStock = book.quantity ;
              const isMaxStockReached = cartItem && cartItem.quantity >= maxAvailableStock;

              return (
                <div 
                  key={book._id} 
                  className="w-full rounded-lg border border-zinc-800 p-3 bg-zinc-900/40"
                >
                  <div className="flex gap-3 items-center">
                
                    <div className="relative w-14 min-w-[3.5rem] overflow-hidden rounded bg-zinc-900 border border-zinc-800">
                      <img src={book.image} alt={book.name} className="h-full w-full object-cover" />
                    </div>

                   
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <h3 className="text-xs font-medium text-zinc-200 truncate">
                          {book.name}
                        </h3>
                        <p className="text-[11px] text-zinc-500 truncate">{book.author}</p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2">
                        <span className="text-xs font-semibold text-zinc-300">₹ {book.price}</span>
                        
                        <div>
                          {!cartItem ? (
                            <button 
                              disabled={maxAvailableStock <= 0}
                              className={`text-[11px] font-medium text-white py-1 px-3 rounded transition-all ${
                                maxAvailableStock <= 0
                                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/30"
                                  : "bg-orange-600 hover:bg-orange-700 cursor-pointer"
                              }`}
                              onClick={() => handleAddToCart(book)}
                            >
                              {maxAvailableStock <= 0 ? "OOS" : "Add"}
                            </button>
                          ) : (
                            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded h-6 overflow-hidden">
                              <button 
                                onClick={() => handleDecrement(book._id)} 
                                className="w-6 h-full flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 cursor-pointer"
                              >
                                −
                              </button>
                              <span className="w-5 text-center text-[11px] font-medium text-zinc-300">
                                {cartItem.quantity}
                              </span>
                              <button 
                                disabled={isMaxStockReached}
                                onClick={() => handleIncrement(book._id, cartItem.quantity, maxAvailableStock)} 
                                className={`w-6 h-full flex items-center justify-center transition-colors ${
                                  isMaxStockReached 
                                    ? "text-zinc-600 bg-zinc-800/40 cursor-not-allowed" 
                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 cursor-pointer"
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
                </div>
              )
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      
      <SidebarFooter className="border-t border-zinc-800 p-3 bg-zinc-900 flex flex-col gap-1.5">
        <button 
          onClick={(e) => {
            e.preventDefault()
            onOpenChange(true)
          }} 
          className="flex bg-orange-500 items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-zinc-200 hover:bg-orange-700/50 w-full cursor-pointer rounded transition-colors border border-zinc-700/50"
        >
          <ShoppingBag size={13} className="text-white" />
          Your Orders
        </button>
        
        {(isLoaded && admin) && (
          <button 
            onClick={(e) => {
              e.preventDefault()
              navigate('/admin')
            }} 
            className="flex items-center justify-center gap-2 py-1.5 px-4 text-xs font-medium text-white bg-green-700 hover:bg-emerald-950/60 border border-emerald-900/50 w-full cursor-pointer rounded transition-colors"
          >
            <ShieldCheck size={13} />
            Admin Panel
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}