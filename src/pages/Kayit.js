import React from 'react'
import { useState } from 'react'
import { kayit,kayitEkle } from '../firebase'

import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
export default function Kayit() {
 
 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [dogumtarihi, setDogum] = useState('');
  const [telefonno, setTel] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [rol, setRol] = useState('');

  const navigate = useNavigate()
   
  const { user } = useSelector(state => state.auth)
  const kayitOl =async e =>{
    e.preventDefault()
    const user=await kayit(email,password)
    const data=await kayitEkle ({
      ad: ad,
      soyad: soyad,
      dogum: dogumtarihi,
      cinsiyet: cinsiyet,
      tel: telefonno,
      rol: rol,
      posta: email,
      sifre: password,
      uid: user.uid
    })
    navigate("/", { replace: true })
   
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">KAYIT OL</h2>

      <label htmlFor="email" className="block text-gray-700">Email:</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
        name="email"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />

      <label htmlFor="password" className="block text-gray-700">Şifre:</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
        name="password"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />
      <label htmlFor="ad" className="block text-gray-700">Kullanıcı Adı: </label>
        <input onChange={(e) => setAd(e.target.value)} type="text" id="ad" name="ad"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />

<label htmlFor="soyad"  className="block text-gray-700">Kullanıcı Soyadı: </label>
        <input onChange={(e) => setSoyad(e.target.value)} type="text" id="soyad" name="soyad"
         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />

<label htmlFor="dogumtarihi"  className="block text-gray-700">Doğum Tarihi: </label>
        <input onChange={(e) => setDogum(e.target.value)} type="text" id="dogumtarihi" name="dogumtarihi" 
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />

<label htmlFor="telefonno" className="block text-gray-700"> Telefon Numarası: </label>
        <input onChange={(e) => setTel(e.target.value)} type="text" id="telefonno" name="telefonno" 
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"/>

 <label htmlFor="cinsiyet" className="block text-gray-700">Cinsiyet: </label>
        <input onChange={(e) => setCinsiyet(e.target.value)} type="cinsiyet" id="cinsiyet" name="cinsiyet"
         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />
       
       <label htmlFor="rol" className="block text-gray-700">Rol: </label>
        <input onChange={(e) => setRol(e.target.value)} type="rol" id="rol" name="rol"
         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />


      <div className="flex justify-end">
        <button
          onClick={kayitOl}
          type="submit"
          className="w-full bg-purple-500 text-white px-5 py-3 rounded"
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  </div>

  )
}


 