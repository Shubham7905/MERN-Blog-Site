import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import BlogCard from "../components/BlogCard";
import { fetchBlogsThunk } from "../features/blogs/blogThunks";
import Loader from "../components/Loader";
import empty from "../assets/empty.svg";

export default function Profile() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((s) => s.auth);
    const blogs = useAppSelector((s) => s.blogs.list).filter(
        (b) => b.author._id === user?._id
    );

    useEffect(() => {
        if (user) {
            dispatch(fetchBlogsThunk());
        }
    }, [dispatch, user]);

    if (!user) return <Loader />;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Profile Header with Cover Image */}
            <div className="relative w-full h-64 mb-10 rounded-lg overflow-hidden shadow-lg">
                {/* Cover Image */}
                {user.coverImage ? (
                    <img
                        src={user.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                        No Cover Image
                    </div>
                )}

                {/* Overlay for Avatar and User Info */}
                <div className="absolute bottom-0 left-0 flex items-end gap-6 p-6 bg-linear-to-t from-black/60 to-transparent w-full">
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
                    />
                    <div className="text-white">
                        <h1 className="text-3xl font-bold">{user.fullName}</h1>
                        <p className="text-gray-200">@{user.username}</p>
                    </div>
                </div>
            </div>

            {/* Blogs Section */}
            <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>

            {blogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh]">
                    <img
                        src={empty}
                        alt="No blogs"
                        className="w-40 opacity-80 mb-4"
                    />
                    <p className="text-gray-500 font-medium">
                        You haven't created any blogs yet
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
}