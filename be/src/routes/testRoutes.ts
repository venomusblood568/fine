import express,{Request,Response}from "express";

const router = express.Router();

router.get("/health",(req:Request, res:Response) => {
    res.status(200).json({status:"Ok",Message:"Heath working fine"})
})

export default router;