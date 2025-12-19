import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { createBlog } from "../api/blogApi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("coverImage", coverImage);

        try {
            await createBlog(formData);
            toast.success("Blog Published !!")
            navigate("/", { replace: true })
        } catch (error) {
            toast.error("Error creating blog")
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Create New Blog</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input 
                    className="border p-3 w-full rounded-md shadow-sm placeholder-gray-400"
                    placeholder="Blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />

                <input 
                    type="file"
                    className="border p-2 w-full rounded-md"
                    onChange={(e) => setCoverImage(e.target.files[0])} 
                />

                <Editor 
                    apiKey={conf.tinyKey}
                    init={{
                        height: 500,
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
                    onEditorChange={(content) => setContent(content)}
                />

                <button className="bg-linear-to-r from-purple-600 to-blue-600 text-white w-full p-3 rounded-md shadow hover:opacity-90 transition">
                    Publish Blog
                </button>
            </form>
        </div>
    )
}