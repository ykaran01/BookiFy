import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCategory as addCategoryApi,
  deletecategory
} from './service/service.js';
import { showErrorToast, showSuccessToast } from '@/helper/toast.helper.js';
import { fetchCategory } from '../../../Redux/features/CategorySlice.js';

const Category = () => {
  const [category, setCategory] = useState('');
  const[loading,setLoading] = useState(false)

  const categories = useSelector(
    (state) => state.category.values
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleAddCategory = async () => {
    if (!category.trim()) return;
    try {
      setLoading(true);
      await addCategoryApi(category.trim());
      dispatch(fetchCategory());
      setCategory('')
      showSuccessToast("Category added successfully.");
      
    } catch (error) {
     
      showErrorToast("Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (name) => {
    try {
      setLoading(true);
      await deletecategory(name);
      dispatch(fetchCategory());
      showSuccessToast("Category deleted successfully.");
    } catch (error) {
      showErrorToast("Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl shadow-blue-500/5">
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Categories
          </h1>
          {categories.length > 0 && (
            <span className="bg-blue-950/40 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-900/50">
              {categories.length} Total
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g., Fiction, Learning..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />

          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/15"
          >
            {loading ? "In Process..." : "Add"}
          </button>
        </div>

        <div className="mt-6">
          {categories.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-zinc-800 rounded-xl">
              <p className="text-zinc-500 text-sm">No categories found.</p>
            </div>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              {categories.map((cat, index) => (
                <li
                  key={cat._id}
                  className="flex items-center justify-between border border-zinc-800/60 p-3 rounded-xl bg-zinc-950/40 hover:bg-zinc-800/50 hover:border-blue-900/30 text-zinc-300 font-medium text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-wider text-blue-500 font-bold bg-blue-950/30 px-1.5 py-0.5 rounded border border-blue-900/30 opacity-60 group-hover:opacity-100">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="group-hover:text-white">{cat.name}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteCategory(cat.name)}
                    className="text-zinc-500 hover:text-red-400 hover:bg-red-950/30 px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                    aria-label={`Delete ${cat.name}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Category;