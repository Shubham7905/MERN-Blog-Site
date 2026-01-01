import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/blogs", blogRouter)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export { app }