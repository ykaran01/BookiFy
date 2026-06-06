import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { useEffect, useState, Fragment } from "react";
import { userHistory } from "./service/service";

export default function OrderHistory({ isOpen, onOpenChange }) {
    const [book, setbook] = useState([]);

    useEffect(() => {
        if (!isOpen) return;

        const userdata = async () => {
            const data = await userHistory();
            setbook(data || []);
        };
        userdata();
    }, [isOpen]);

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
  
            <SheetContent side="left" className="bg-black text-white border-zinc-800 w-full flex flex-col h-full p-0">
                <div className="p-6 border-b border-zinc-800 bg-black">
                    <SheetHeader>
                        <SheetTitle className="text-2xl flex justify-center w-full text-orange-400 font-bold">
                            Your Order History
                        </SheetTitle>
                        <SheetDescription className="text-sm flex justify-center text-gray-400">
                            Review your past orders and their details.
                        </SheetDescription>
                    </SheetHeader>
                </div>

               
                <div className="flex-1 overflow-y-auto p-4 scrollContainer">
                    {book.length === 0 ? (
                        <div className="m-3 flex justify-center text-zinc-700 text-xl font-semibold w-full">
                            No Orders Yet
                        </div>
                    ) : (
                        <div className="bg-zinc-900 rounded-lg overflow-x-scroll .scrollContainer2">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-zinc-950/50">
                                        <th className="text-left p-4 border-b border-zinc-800">Book</th>
                                        <th className="text-center p-4 border-b border-zinc-800">Qty</th>
                                        <th className="text-left p-4 border-b border-zinc-800">Price</th>
                                        <th className="text-left p-4 border-b border-zinc-800">Date</th>
                                        <th className="text-left p-4 border-b border-zinc-800">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {book.map((books) => (
                                        <Fragment key={books._id}>
                                            {books.item?.map((item) => (
                                                <tr key={item._id} className="hover:bg-zinc-800/20 transition-colors">
                                                    <td className="p-4 border-b text-[12px] border-zinc-800 truncate max-w-[150px]">
                                                        {item.product?.name}
                                                    </td>
                                                    <td className="p-4 border-b text-[12px] border-zinc-800 text-center text-zinc-400 font-mono">
                                                        {item.quantity || 1}
                                                    </td>
                                                    <td className="p-4 border-b text-[12px] border-zinc-800 font-mono">
                                                        ₹{item.product?.price}
                                                    </td>
                                                    <td className="p-4 border-b text-[12px] border-zinc-800 whitespace-nowrap">
                                                        {books.createdAt
                                                            ? new Date(books.createdAt).toLocaleDateString()
                                                            : "N/A"}
                                                    </td>
                                                    <td className="p-4 border-b text-[12px] border-zinc-800 capitalize text-amber-400">
                                                        {books.orderStatus}
                                                    </td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}