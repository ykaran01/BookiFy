import React, { useEffect, useState } from 'react';
import { addreview, getReviews } from './service/service'; 


const Review = ({ id }) => {
    
    const [comment, setComment] = useState("");
    const [ratingnum, setratingnum] = useState(5);
    const [allReviews, setAllReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchComments = async () => {
            if (!id) return;
            setIsLoading(true);
            try {

                const data = await getReviews(id);
                setAllReviews(data || []);
            } catch (err) {
                console.error("Failed to load reviews:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, [id]);


    const handleSubmit = async () => {
        if (!comment.trim()) {
            showErrorToast("Please add a comment first!");
            return;
        }
        try {
            const response = await addreview(comment, ratingnum, id);

            const newReviewObj = response?.data || {
                _id: Date.now().toString(),
                comment: comment,
                rating: ratingnum,
                user: { username: "You" }
            };

            setAllReviews((prev) => [newReviewObj, ...prev]);
            setComment("");
            setratingnum(5);
        } catch (err) {
            showErrorToast("Can't post the review right now");
        }
    };

    return (
        <div className='Review flex items-center p-3 justify-evenly gap-3  bg-zinc-900'>


            <div className='bg-slate-950 text-white mt-2 shadow-xl flex flex-col border gap-5 w-120 border-slate-800 rounded-2xl p-4'>
                <h1 className='text-xl font-medium text-slate-100'>Add Review</h1>


                <div className='text-3xl flex gap-2'>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <button
                            key={num}
                            type="button"
                            className={(num <= ratingnum) ? 'text-orange-400 cursor-pointer scale-110 transition' : 'text-zinc-600 cursor-pointer hover:text-zinc-500 transition'}
                            onClick={() => setratingnum(num)}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    className='border px-3 py-2 rounded-xl bg-slate-900 border-slate-800 text-slate-200 focus:outline-none focus:border-purple-500 transition'
                    placeholder='Add Your Comments...'
                />

                <button
                    onClick={handleSubmit}
                    className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-2xl transition active:scale-[0.99]'
                >
                    Submit
                </button>
            </div>


            <div className='Comments w-160 h-[400px] overflow-y-auto pr-2'>
                <h1 className='text-2xl font-bold text-zinc-200 mb-6 flex items-center gap-2'>
                    <span>Comments</span>
                    <span className='text-sm font-normal text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full'>
                        {allReviews.length}
                    </span>
                </h1>

                {isLoading ? (
                    <div className="text-zinc-500 text-sm italic">Loading feed records...</div>
                ) : allReviews.length === 0 ? (
                    <div className="text-zinc-500 text-sm italic bg-zinc-950/40 border border-dashed border-zinc-800 p-6 text-center rounded-xl">
                        No reviews posted yet. Be the first to leave one!
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {allReviews.map((rev) => (
                            <div key={rev._id || rev.id} className='w-full p-5 gap-4 rounded-xl flex items-start justify-between bg-zinc-950 border border-zinc-900 shadow-md'>
                                <div className='text-white tracking-tighter text-xs flex-1'>

                                    <h1 className='mb-1 text-sm font-semibold text-blue-400'>
                                        {rev.user?.username || rev.username || "Anonymous User"}
                                    </h1>
                                    <p className='text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap'>
                                        {rev.comment}
                                    </p>
                                </div>


                                <div className='text-orange-400 text-lg flex gap-0.5 select-none pt-0.5' >
                                    {"★".repeat(rev.rating || rev.ratingnum || 5)}
                                    {"☆".repeat(5 - (rev.rating || rev.ratingnum || 5))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Review;