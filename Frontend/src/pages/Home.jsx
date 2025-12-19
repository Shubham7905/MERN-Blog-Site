import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchBlogsThunk } from "../features/blogs/blogThunks"
import BlogCard from "../components/BlogCard"
import Loader from "../components/Loader";
import empty from "../assets/empty.svg"

export default function Home() {
    const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogsThunk())
    }, [])

    if (loading) return <Loader />

    if (list.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-6 min-h-[90dvh] flex flex-col">
                <h1 className="text-4xl font-extrabold mb-6 bg-linear-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                    Explore Blogs
                </h1>

                <div className="flex-[0.8] flex flex-col items-center justify-center">
                    <img
                        src={empty}
                        alt="No blogs"
                        className="w-64 opacity-90 mb-4"
                    />
                    <p className="text-xl text-gray-500 font-medium">No blogs to see here</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-extrabold mb-6 bg-linear-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                Explore Blogs
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                {list.map((blog) => (
                    <BlogCard
                        key={blog._id}
                        blog={blog}
                    />
                ))}
            </div>
        </div>
    )
}