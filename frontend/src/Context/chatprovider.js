import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Chatcontext = createContext()

export const Chatprovider = (({children})=>{
    const [user,setuser] = useState(null);
    const history=useHistory();
    useEffect(()=>{
        const userinfo = JSON.parse(localStorage.getItem('userInfo'))
        setuser(userinfo)
        if(!userinfo){
            history.push("/")
        }
    },[history])
   return <Chatcontext.Provider
   value={{user,setuser}}
   >{children}</Chatcontext.Provider>;
});

export const Chatstate = () =>{
    return useContext(Chatcontext);
}



