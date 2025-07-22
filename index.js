const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

dotenv.config();

const app=express()
app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`Server running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err)=>console.error(`DB connection error:`,err))
// \end{code}