import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Log In')
  const {setShowLogin,backendUrl,setToken,setUser}=useContext(AppContext)

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  //function to handle form when submitted either login or signup
  const onSubmitHandler =async (e)=>{ 
    e.preventDefault()
    try {
      if (state==='Log In'){
        const {data}=await axios.post(backendUrl + '/api/user/login',{email,password}) //for login,we hit the mentioned url and provide the email,password
        if (data.success){ //if its true,we are successfully logged in
          setToken(data.token)  //get token from response
          setUser(data.user)
          localStorage.setItem('token',data.token)//store token in local storage
          setShowLogin(false) //to hide the login form
        }else{
          toast.error(data.message) //for error notification 
        }
      }else{
        const {data}=await axios.post(backendUrl + '/api/user/register',{name,email,password}) //for sign,we hit the mentioned url and provide the email,password
        if (data.success){ //if its true,we are successfully signed in
          setToken(data.token)  //get token from response
          setUser(data.user)
          localStorage.setItem('token',data.token)//store token in local storage
          setShowLogin(false) //to hide the form
        }else{
          toast.error(data.message) //for error notification 
        }
      }
    } catch (error) {
       toast.error(data.message) //for error notification 
    }
  }

  useEffect(()=>{   //For disabling the scrolling while login/signup page is on screen
    document.body.style.overflow='hidden';
    return ()=>{
      document.body.style.overflow='unset'
    }
  },[])

  return (
    <div className=' fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form  onSubmit={onSubmitHandler}
         className='relative bg-white p-10 rounded-xl text-slate-500'
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        >
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            {state !=='Log In' &&  <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.profile_icon} alt=""  width={25}/>
                <input onChange={e=>setName(e.target.value)} value={name} type="text" className='outline-none text-sm' placeholder='Full Name'  required />
            </div>}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt=""  width={25}/>
                <input onChange={e=>setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm' placeholder='Email id'  required />
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt=""  width={25}/>
                <input onChange={e=>setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm' placeholder='Password'  required />
            </div>
            <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
            <button className='bg-blue-600  w-full text-white py-2 rounded-full'>{state === 'Log In' ? 'Log In':'Create Account'}</button>
            {state ==='Log In' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign Up</span></p>
            :
            <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Log In')}>Log in</span></p>}

            <img onClick={()=>{
              setShowLogin(false)
            }} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
        </motion.form>
    </div>
  )
}

export default Login