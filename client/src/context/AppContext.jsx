import { Children, createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const [user,setUser]=useState(null)
    const [showLogin,setShowLogin]=useState(false)
    const [token,setToken]=useState(localStorage.getItem('token'))
    const [credit,setCredit]=useState(false)

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const navigate=useNavigate()

    const loadCreditsData=async ()=>{   //to get credit data from the api for each user who has logged in
        try {
            const {data}=await axios.get(backendUrl + '/api/user/credits',{headers:{token}})
            if (data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const generateImage= async (prompt)=>{
        try {
            const {data}=await axios.post(backendUrl + '/api/image/generate-img',{prompt},{headers:{token}})
            if (data.success){
                loadCreditsData()
                return data.resultImage
            }else{
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            loadCreditsData()
        }
    }

    const logOut=()=>{
        localStorage.removeItem('token') //will remove token from local storage
        setToken('')    //set token back to empty
        setUser(null)   //set user to null
    }

    useEffect(()=>{
        if (token){
            loadCreditsData()
        }
    },[token])//whenever the token is changed ,func executes

    const value={
        user,setUser,showLogin,setShowLogin,backendUrl,token,setToken,credit,setCredit,loadCreditsData,logOut,generateImage
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider