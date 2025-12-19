import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";   // ⭐ ADDED Link
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchBlogByIdThunk } from "../features/blogs/blogThunks";
import parse from "html-react-parser";
import { commentBlog, likeBlog } from "../api/blogApi";
import { toast } from "react-toastify";              // ⭐ ADDED toast
import Loader from "../components/Loader";

export default function BlogDetails() {
    const [commentText, setCommentText] = useState("");
    const { blogId } = useParams();
    const dispatch = useAppDispatch();
    const { selectedBlog } = useAppSelector((s) => s.blogs);
    const { user } = useAppSelector((s) => s.auth);
    const liked = user && selectedBlog?.likes?.includes(user._id);

    useEffect(() => {
        if (blogId) {
            dispatch(fetchBlogByIdThunk(blogId));
        }
    }, [dispatch, blogId]);

    if (!selectedBlog) return <Loader />

    const handleComment = async () => {
        try {
            await commentBlog(blogId, commentText);
            setCommentText("");
            toast.success("Comment added!");
            dispatch(fetchBlogByIdThunk(blogId));
        } catch {
            toast.error("Failed to comment");
        }
    };

    const handleLike = async () => {
        if(!user) {
            toast.info("Please login to like")
        }
        await likeBlog(blogId);
        dispatch(fetchBlogByIdThunk(blogId));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="relative">
                <img
                    src={selectedBlog.coverImageUrl}
                    className="w-full h-80 object-cover rounded-xl shadow-md"
                />

                <button
                    onClick={handleLike}
                    className="absolute top-2 right-2 text-3xl transition-transform hover:scale-130"
                >
                    <i
                        className={
                            liked
                                ? "ri-heart-fill text-red-500"
                                : "ri-heart-line text-white drop-shadow-lg"
                        }
                    />
                </button>

                {/* ⭐ EDIT BUTTON FOR BLOG OWNER */}
                {user && selectedBlog.author._id === user._id && (
                    <Link
                        to={`/edit/${selectedBlog._id}`}
                        aria-label="Edit blog"
                        title="Edit blog"
                        className="absolute top-12 right-2 text-3xl text-white drop-shadow-lg transition-transform hover:scale-130"
                    >
                        <i className="ri-pencil-line" />
                    </Link>
                )}
            </div>

            <h1 className="text-4xl font-bold mt-6 mb-3">
                {selectedBlog.title}
            </h1>

            <p className="text-gray-600 mb-2 dark:text-gray-200">
                By <b>{selectedBlog.author.username}</b>
            </p>

            <div className="prose">{parse(selectedBlog.content)}</div>

            {/* COMMENTS */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>

                <div className="flex gap-3 mb-6">
                    <input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="border p-3 flex-1 rounded placeholder-gray-400"
                    />
                    <button
                        onClick={handleComment}
                        className="bg-purple-600 text-white px-4 rounded"
                    >
                        Post
                    </button>
                </div>

                <div className="space-y-4">
                    {selectedBlog.comments.map((c) => (
                        <div
                            key={c._id}
                            className="p-4 border rounded shadow-sm bg-white dark:bg-[#1e2a43]"
                        >
                            <p className="font-bold">{c.user.username}</p>
                            <p>{c.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
