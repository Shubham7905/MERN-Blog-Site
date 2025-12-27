import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Blog } from "../models/blog.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResonse.js"

//Create a new blog
const createBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        throw new ApiError(400, "Title and content are required");
    }

    const coverImagePath = req.file?.path;

    if (!coverImagePath) {
        throw new ApiError(400, "Cover Image is required");
    }

    //Upload cover image on cloudinary
    const coverImage = await uploadOnCloudinary(coverImagePath);

    const blog = await Blog.create({
        title,
        content,
        coverImageUrl: coverImage.secure_url,
        author: req.user._id
    });

    return res
        .status(201)
        .json(new ApiResponse(200, blog, "Blog created successfully!!!"))
});

//Get all blogs with counts
const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "authorInfo"
            }
        },
        { $unwind: "$authorInfo" },
        {
            $addFields: {
                likesCount: { $size: { $ifNull: ["$likes", []] } },
                commentsCount: { $size: { $ifNull: ["$comments", []] } },
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                coverImageUrl: 1,
                views: 1,
                likesCount: 1,
                commentsCount: 1,
                createdAt: 1,
                updatedAt: 1,
                author: {
                    _id: "$authorInfo._id",
                    username: "$authorInfo.username",
                    fullName: "$authorInfo.fullName",
                    avatar: "$authorInfo.avatar"
                }
            }
        },
        { $sort: { createdAt: -1 } }
    ])

    return res
        .status(200)
        .json(new ApiResponse(200, blogs, "Blogs fetched successfully!!"))
});

//Get a single blog by ID and increment views
const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $inc: { views: 1 } },
        { new: true }
    )
        .populate("author", "username fullName avatar")
        .populate("comments.user", "username fullName avatar");

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const blogWithCounts = {
        ...blog.toObject(),
        likesCount: blog.likes.length,
        commentsCount: blog.comments.length
    }

    return res
        .status(200)
        .json(new ApiResponse(200, blogWithCounts, " Blog fetched successfully!"))
});

//Like or unlike a blog
const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    if (blog.likes.includes(userId)) {
        //Unlike
        blog.likes.pull(userId);
    } else {
        //Like
        blog.likes.push(userId);
    }

    await blog.save()

    return res
        .status(200)
        .json(new ApiResponse(200, { likesCount: blog.likes.length }, "Blog like updated successfully"))
});

//Add comments
const addComment = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, "Comment text is required");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    blog.comments.push({ text, user: req.user._id });
    await blog.save()

    return res
        .status(201)
        .json(new ApiResponse(201, { commentsCount: blog.comments.length }, "Comment added successfully"))
});

//Update a blog
const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    // Check if the current user is the owner
    if (blog.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to edit this blog");
    }

    // Update fields if provided
    if (title) blog.title = title;
    if (content) blog.content = content;

    // Update cover image if uploaded
    const coverImagePath = req.file?.path;
    if (coverImagePath) {
        const coverImage = await uploadOnCloudinary(coverImagePath);
        blog.coverImageUrl = coverImage.url;
    }

    await blog.save();

    const blogWithCounts = {
        ...blog.toObject(),
        likesCount: blog.likes.length,
        commentsCount: blog.comments.length,
    };

    return res
        .status(200)
        .json(
            new ApiResponse(200, blogWithCounts, "Blog updated successfully")
        );
});

export {
    createBlog,
    getAllBlogs,
    getBlogById,
    likeBlog,
    addComment,
    updateBlog
}
