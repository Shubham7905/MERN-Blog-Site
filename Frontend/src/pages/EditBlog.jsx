import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { fetchBlogById } from "../api/blogApi";
import { updateBlog } from "../api/blogApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom"

export default function EditBlog() {
    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const { blogId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        fetchBlogById(blogId).then(({ data }) => {
            setTitle(data.data.title);
            setContent(data.data.content);
        });
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            await updateBlog(blogId, formData);
            toast.success("Blog updated!");
            navigate(`/blog/${blogId}`, { replace: true });
        } catch {
            toast.error("Failed to update");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

            <form onSubmit={handleUpdate} className="space-y-5">
                <input
                    className="border p-3 w-full rounded"
                    placeholder="Blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="file"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="border p-2 w-full rounded"
                />

                <Editor
                    apiKey={import.meta.env.VITE_TINY_KEY}
                    value={content}
                    init={{
                        height: 450,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={(c) => setContent(c)}
                />

                <button className="bg-blue-600 text-white p-3 rounded w-full">
                    Update Blog
                </button>
            </form>
        </div>
    );
}