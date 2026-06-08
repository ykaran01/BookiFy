import React from 'react'
import Navbar from '../Navbar'
import { getAllOrders } from './service/service.js'
import { useEffect } from 'react'
import { getTheinformation } from './service/service.js'
import { showErrorToast, showSuccessToast } from '@/helper/toast.helper.js';
const Adminpanel = () => {
  const [response, setResponse] = React.useState([])
  const [info, setInfo] = React.useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response  =  await getAllOrders()
        setInfo(response)
        showSuccessToast("Orders fetched successfully.");
        
      } catch (err) {
        showErrorToast("Failed to fetch orders.");
      }
    }
    const info = async()=>{
      try{
        const response = await getTheinformation()
        setResponse(response.data )
        
      
      } catch (err) {
        showErrorToast("Failed to fetch dashboard information.");
      }    }
    info()
    fetchData()
  }, [])


  return (
    <>
      <div className='main bg-slate-950 w-full h-screen'>
        <Navbar/>
        
          
          <div className='top flex items-center gap-4 p-4 min-h-1/4 bg-slate-950 justify-evenly '>
          <div className='total-orders border rounded border-slate-300 bg-slate-900 text-orange-500 px-6 font-bold p-3 flex flex-col justify-center items-center'>
            <h1 className='text-sm uppercase tracking-wider text-slate-400'>Total Orders</h1>
            <h1 className='text-3xl'>{response?.totalOrders}</h1>
          </div>
          <div className='total-views border rounded border-slate-300 bg-slate-900 px-6 text-blue-700 font-bold p-3 flex flex-col justify-center items-center'>
            <h1 className='text-sm uppercase tracking-wider text-slate-400'>Confirmed</h1>
            <h1 className='text-3xl'>{response?.confirmedOrders}</h1>
          </div>
          <div className='total-views border rounded border-slate-300 bg-slate-900 px-6 text-red-700 font-bold p-3 flex flex-col justify-center items-center'>
            <h1 className='text-sm uppercase tracking-wider text-slate-400'>Cancelled</h1>
            <h1 className='text-3xl'>{response?.cancelledOrders}</h1>
          </div>
          <div className='total-views border rounded border-slate-300 bg-slate-900 px-6 text-green-700 font-bold p-3 flex flex-col justify-center items-center'>
            <h1 className='text-sm uppercase tracking-wider text-slate-400'>Delivered</h1>
            <h1 className='text-3xl'>{response?.deliveredOrders}</h1>
          </div>


          <div className='pending border rounded border-slate-300 bg-slate-900 text-yellow-500 font-bold p-3 px-6 flex flex-col justify-center items-center'>
            <h1 className='text-sm uppercase tracking-wider text-slate-400'>Pending</h1>
            <h1 className='text-3xl'>{response?.pendingOrders}</h1>
          </div>
        </div>
        <div className='w-full h-[2px] bg-slate-800'></div>
        <div className='bottom p-4 w-full'>
          <div className='flex w-full  justify-center mb-2 items-center text-slate-300 font-bold text-3xl' >
            Reacent Orders
          </div>
          <div className='max-h-[300px] overflow-y-auto  scrollContainer' >
          <table className=' text-auto w-full border border-slate-700 text-left p-2 max-h-screen overflow-y-scroll '>
            <thead className='bg-slate-950 text-slate-400 text-xs border-b-2 border-slate-700'>
              <tr className='uppercase'>
                <th className='px-6 py-3'>Order ID</th>
                <th className='px-6 py-3'>Customer</th>
                <th className='px-6 py-3'>Number of Items</th>
                <th className='px-6 py-3'>Amount</th>
                <th className='px-6 py-3'>Status</th>
                <th className='px-6 py-3'>Date</th>

              </tr>
            </thead>

            <tbody className='divide-y divide-slate-700 text-slate-300  overflow-y-visible' >
              {info.map((item) => (
                <tr key={item._id} className='hover:bg-slate-800 cursor-pointer transition-colors duration-200 ease-in-out' >
                  <td className='px-6 py-3 ' >#{item._id.slice(0, 8)}</td>
                  <td className='px-6 py-3'>{item.username}</td>
                  <td className='px-6 py-3'>{item.numberOfItems}</td>
                  <td className='px-6 py-3'>${item.totalPrice}</td>
                  <td className='px-6 py-3'>
                    <span className={     ` uppercase font-bold  ${item.orderStatus === "pending" ? "text-yellow-500" : item.orderStatus === "confirmed" ? "text-blue-500" : item.orderStatus === "cancelled" ? "text-red-500" : "text-green-500"}` }>
                      {item.orderStatus}
                    </span>
                  </td>
                  <td> {new Date(item.createdAt).toDateString()}  </td>
                </tr>
              ))}
             
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adminpanel