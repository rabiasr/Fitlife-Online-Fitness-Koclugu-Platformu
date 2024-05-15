import React from 'react'
import { useState } from 'react'
import { antrenorkayitEkle } from '../firebase' 
import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'

export default function KisiselBilgilera() {
    const [uzmanlik,setUzmanlik]=useState("")
    const [deneyim,setDeneyim]=useState("")
    const [iletisim, setIlesim] = useState('');
    
    
  const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
  const kayitOl =async e =>{
    e.preventDefault()
    const data=await antrenorkayitEkle ({
        uzmanlik:uzmanlik,
        deneyim:deneyim,
        iletisim :user.email,
        uid:user.uid
    })
    navigate("/", { replace: true })
   
  }


  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Kişisel Bilgiler</h2>

      <label htmlFor="uzmanlik" className="block text-gray-700">Uzmanlık:</label>
      <input
        onChange={(e) => setUzmanlik(e.target.value)}
        type="uzmanlik"
        id="uzmanlik"
        name="uzmanlik"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />

      <label htmlFor="deneyim" className="block text-gray-700">Deneyim:</label>
      <input
        onChange={(e) => setDeneyim(e.target.value)}
        type="deneyim"
        id="deneyim"
        name="deneyim"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />
 
      <div className="flex justify-end">
        <button
          onClick={kayitOl}
          type="submit"
          className="w-full bg-purple-500 text-white px-5 py-3 rounded"
        >
          Ekle
        </button>
      </div>
    </div>
  </div>

  )
}
