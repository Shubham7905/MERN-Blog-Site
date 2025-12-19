import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: [true, 'Comment text is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
    },
    content: {
        type: String, // Can store HTML or Markdown
        required: [true, 'Content is required'],
    },
    coverImageUrl: {
        type: String, //cloudinary url
        required: [true, 'Cover image URL is required'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    views: {
        type: Number,
        default: 0,
    },
    comments: [commentSchema],
}, { timestamps: true })

export const Blog = mongoose.model("Blog", blogSchema)