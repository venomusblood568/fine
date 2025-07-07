import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useTokenExpiryRedirect(){
    const navigate = useNavigate();

    useEffect(()=> {
        const checkExpiry = () => {
            const token = localStorage.getItem("token");
            if(!token){
                console.warn(`token not found or something went wrong`)
                return
            }
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                const exp = payload.exp;
                const now = Math.floor(Date.now()/1000);
                if(now >= exp){
                    console.log(`Token expired. Redirecting...`)
                    localStorage.removeItem("token");
                    navigate('/',{replace:true})
                }
            } catch (error) {
               console.log(`Error decoding token:`,error);
               localStorage.removeItem("token");
               navigate("/",{replace:true}) 
            }
        }
        const interval = setInterval(checkExpiry, 10000);
        return () => clearInterval(interval);
    },[navigate]);
}