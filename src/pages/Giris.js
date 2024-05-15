import React from 'react'
import { useState } from 'react'
import { giris ,veriAl,veriAlrol} from '../firebase'
 
import { useNavigate } from 'react-router-dom'
import Sifre from './Sifre'
 

 
export default function Giris() {
  const navigate =useNavigate()
 
  const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
  
    const handleSubmit =async e =>{
      e.preventDefault()
      const user=await giris(email,password)
      if(user){ 
         
          navigate("/",{replace:true})
        
      } 
      
    }

    const handleGiris=async e=>{
      
    }
    
    const sifreunutFonk = async() =>{
      window.location="/sifre"
  }
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              placeholder="example@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Şifre:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
              placeholder="******"
            />
          </div>
          <label onClick={sifreunutFonk} className='sifreunuttum' >{"Şifremi Unuttum" }</label>  
          <button
         
            type="submit"
            className="bg-purple-500 text-white px-5 py-3 rounded"
            disabled={!email || !password}
          >
            Giriş Yap
          </button>

        </form>
      </div>
    </div>

    )
}
