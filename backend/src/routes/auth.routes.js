import { Router } from "express";
import { downloadVideo } from "../controllers/auth.controller.js";



const authRouter = Router();

authRouter.get("/download", downloadVideo)



export default authRouter;