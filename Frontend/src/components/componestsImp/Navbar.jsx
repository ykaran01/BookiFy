import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react';
import Cartbar from './Cartbar';
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/clerk-react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const book = useSelector((state) => state.cart.value)
  let n = book.length || 0;
  return (
    <header className='w-full sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md'>
      <Cartbar
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />


      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-5 py-2 sm:py-0 h-auto sm:h-16 gap-2 sm:gap-4'>
        <div className='flex items-center justify-between w-full sm:w-auto h-12 sm:h-auto'>
          <div className='flex items-center'>


            <div className='md:hidden' >
              <SidebarTrigger></SidebarTrigger>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-amber-600 ">
              Bookify
            </h1>
          </div>


          <div className='flex sm:hidden items-center gap-4'>
            <div
              onClick={() => setIsSidebarOpen(true)}
              className='relative cursor-pointer'
            >

              <ShoppingCart color='white' size={24} />
              {n > 0 && <div className='absolute -top-1 -right-2 flex items-center justify-center bg-red-600 text-white text-[9px] w-4 h-4 rounded-full'>
                {n}
              </div>}
            </div>

            <div className="flex items-center min-w-[70px] justify-end">
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className='px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg active:scale-95 '>
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>

        <div className='hidden sm:flex items-center gap-5 order-3'>

          <div
            onClick={() => setIsSidebarOpen(true)}
            className='relative cursor-pointer'
          >
            <ShoppingCart color='white' size={24} />
            {n > 0 && <div className='absolute -top-1 -right-2 flex items-center justify-center bg-red-600 text-white text-[9px] w-4 h-4 rounded-full'>
              {n}
            </div>}
          </div>


          <div className="flex items-center min-w-[80px] justify-end">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border border-slate-700"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <button onClick={() => navigate('/signin')} className='px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg active:scale-95 '>
                Sign In</button>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar