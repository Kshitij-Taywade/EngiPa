import express from "express"
import router from "./router/user.router.js"
import adminRouter from "./router/admin.router.js"
import paper from "./access/admin.access.js"
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());



app.use("/api/auth", router)
app.use("/api/auth", paper)
app.use("/api/auth", adminRouter)


export default app;