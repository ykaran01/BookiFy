import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Image } from 'lucide-react';
import { fetchProducts} from '../service/service.js';
import { deleteProduct, updateProduct  } from './service/service.js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; 
import { showErrorToast, showSuccessToast } from '@/helper/toast.helper.js';
const ListingProducts = () => {
  const [books, setBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    author: '',
    description: '', 
    quantity: 0,
    price: 0
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setBooks(data);
      } catch (err) {
        showErrorToast("Failed to fetch products.");
      }
    };
    loadProducts();
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        setBooks(books.filter((items) => items._id !== id));
        showSuccessToast("Product deleted successfully.");
      })

      .catch((err) => {
        showErrorToast("Failed to delete product.");
      });
  };

 
  const handleEditClick = (book) => {
    setSelectedBookId(book._id);
    setEditFormData({
      name: book.name,
      author: book.author,
      description: book.description || '',
      quantity: book.quantity,
      price: book.price
    });
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(selectedBookId, editFormData);
      setIsOpen(false); 
      showSuccessToast("Product updated successfully.");
      window.location.reload()
    } catch (err) {
      showErrorToast("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 w-full text-zinc-100 p-6 font-sans">
      <div className="mx-auto max-w-7xl">
        
        <div className="flex justify-center mb-8 gap-4">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-amber-400">Product Inventory</h1>
            <p className="text-sm flex justify-center text-amber-200">Manage your book catalog and stock levels.</p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/80">
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-zinc-300">Book</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-zinc-300">Category</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-zinc-300">Stock</th>
                  <th className="px-6 py-4 text-xs font-medium uppercase tracking-wider text-zinc-300">Price</th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-zinc-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-zinc-800/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-9 flex-shrink-0 bg-zinc-800 rounded border border-zinc-700 overflow-hidden">
                          {book.image ? (
                            <img src={book.image} alt={book.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-zinc-600">
                              <Image className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-200 line-clamp-1 truncate">{book.name}</div>
                          <div className="text-xs text-zinc-500">{book.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded bg-zinc-800/50 px-2 py-0.5 text-xs font-medium text-zinc-400 border border-zinc-800">
                        {book.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">{book.quantity} units</td>
                    <td className="px-6 py-4 text-sm font-mono text-zinc-300">₹ {book.price}</td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <button 
                        onClick={() => handleEditClick(book)}
                        className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors" 
                        aria-label="Edit product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(book._id)}
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                        aria-label="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {books.length === 0 && (
            <div className="py-20 text-center text-zinc-500 text-sm">
              No products found in the database.
            </div>
          )}
        </div>
      </div>

    
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
       
        <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-zinc-100">
          <DialogHeader>
            <DialogTitle className="text-amber-400 text-xl font-semibold">Edit Product Details</DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              Make changes to your book inventory and author profiles here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveSubmit} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Book Title</label>
              <input 
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Author Name</label>
              <input 
                type="text"
                name="author"
                value={editFormData.author}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Description</label>
              <textarea 
                name="description"
                value={editFormData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Write a brief biography or description of the author..."
                className="w-full scrollContainer2 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-amber-400 transition-colors resize-none placeholder:text-zinc-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Current Stock</label>
                <input 
                  type="number"
                  name="quantity"
                  value={editFormData.quantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 font-mono focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">Price (₹)</label>
                <input 
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 font-mono focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-zinc-800 gap-2 sm:gap-0">
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-all"
              >
                Cancel
              </button>
              <button 
              onClick={(e)=>{
                handleSaveSubmit(e)
              }}
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-500 text-zinc-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md font-semibold"
              >
                Save Changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListingProducts;