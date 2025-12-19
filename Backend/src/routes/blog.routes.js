import { Router } from "express";
import { 
    createBlog,
    getAllBlogs,
    getBlogById,
    likeBlog,
    addComment,
    updateBlog
 } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// Public routes
router.route("/").get(getAllBlogs);
router.route("/:blogId").get(getBlogById);

// Secured routes
router.route("/").post(
    verifyJWT,
    upload.single("coverImage"),
    createBlog
);

router.route("/:blogId").patch(
    verifyJWT,
    upload.single("coverImage"),
    updateBlog
);

router.route("/:blogId/like").post(
    verifyJWT,
    likeBlog
);

router.route("/:blogId/comment").post(
    verifyJWT,
    addComment
);

export default router;