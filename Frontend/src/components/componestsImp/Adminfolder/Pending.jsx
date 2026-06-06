import React, { useEffect, useState } from "react";
import { getorders } from "./service/service";
import { changeOrderStatus } from "./service/service";
import {showSuccessToast, showErrorToast} from "../../../helper/toast.helper.js"
const Pending = () => {
  const [orders, setOrders] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("confirmed");
  const fetchOrders = async () => {
    try {
      const data = await getorders();
      setOrders(  data.data || []);
    } catch (err) {
      showErrorToast("Failed to fetch pending orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleStatusChange = async (orderId, newStatus) => {
    try {  
      if (!newStatus) {
        showErrorToast("Please select a status to update.");
        return;
      }
      await changeOrderStatus(orderId, newStatus)
      showSuccessToast("Order status updated successfully.");
      fetchOrders(); 
    } catch (err) {
      showErrorToast("Failed to update order status.");
    }

  }

  return (
    <div className="min-h-screen bg-slate-950 w-full text-slate-100 p-6">
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex w-full justify-between items-center mb-7">
          <h1 className="text-3xl font-bold">Orders Queue</h1>

          <button
            onClick={fetchOrders}
            className="text-xl font-bold border border-white py-1 px-2 rounded-xl cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Refresh
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center text-zinc-500 text-lg">
            No Pending Orders
          </div>
        ) : (
          <div className="space-y-3">
            {orders?.map((order) => (
              <div
                key={order._id}
                className="bg-black border border-zinc-800 rounded-xl p-5 flex justify-between items-center transition-all"
              >
                <div>
                  <span className="text-xs font-mono text-orange-400">
                    #{order._id.slice(-6)}
                  </span>

                  <h3 className="text-white font-semibold mt-1">
                    {order.item?.length || 0} Items
                  </h3>

                  <p className="text-xs text-zinc-400">
                    Phone: {order.phoneNumber}
                  </p>

                  <p className="text-xs text-zinc-500">
                    Total Quantity:{" "}
                    {order.item?.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-green-500">
                      ₹{order.totalPrice}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.orderStatus === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : order.orderStatus === "delivered"
                          ? "bg-green-500/20 text-green-400"
                          : order.orderStatus === "cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <select
                    className="bg-black border border-slate-700 text-slate-200 text-xs rounded px-2 py-1.5 outline-none cursor-pointer font-medium"
                    defaultValue={null}
                    
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      Update Status
                    </option>
                    <option value="confirmed">
                       Confirmed
                    </option>

                    <option value="delivered">
                       Delivered
                    </option>

                    <option value="cancelled">
                       Cancelled
                    </option>
                  </select>
                  <button  onClick={() => handleStatusChange(order._id, selectedStatus)} className="text-xs bg-blue-500 rounded cursor-pointer py-1 px-2 hover:bg-blue-600"> Submit </button>
                </div>
                
              </div>
              
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pending;