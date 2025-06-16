import express,{Request,Response}from "express";

const router = express.Router();

router.get("/testroutes",(req:Request, res:Response) => {
    res.status(200).json({Message:"TestRoutes working fine"})
})

export default router;