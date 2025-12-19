import { Link } from "react-router-dom";

export default function BlogCard({blog}) {
    return(
        <Link
            to={`/blog/${blog._id}`}
            className="bg-white rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:shadow-xl dark:bg-[#1e2a43] dark:shadow-[#454444]"
        >
            <img
                src={blog.coverImageUrl}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h2 className="text-xl font-bold line-clamp-2 text-black dark:text-white">
                    {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1 dark:text-gray-200">
                    {blog.author.username}
                </p>
                <div className="flex justify-between mt-3 text-gray-700 text-sm dark:text-gray-200">
                    <span>❤️ {blog.likesCount}</span>
                    <span>💬 {blog.commentsCount}</span>
                    <span>👁️ {blog.views}</span>
                </div>
            </div>

        </Link>
    )
}