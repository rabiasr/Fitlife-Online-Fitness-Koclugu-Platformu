import React from 'react'
import { useState } from 'react'
import { danisankayitEkle } from '../firebase' 
import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
export default function KisiselBilgiler() {
    const [kilo,setKilo]=useState("")
    const [boy,setBoy]=useState("")
    const [yagoran, setYagoran] = useState('');
    const [kaskutle, setKaskutle] = useState('');
    const [kitleindex, setKitleindex] = useState('');
    const[hedef,setHedef]=useState()
    
  const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
  const kayitOl =async e =>{
    e.preventDefault()
    const data=await danisankayitEkle ({
       kilo:kilo,
       boy:boy,
       yagoran:yagoran,
       kaskutle :kaskutle,
       kitleindex:kitleindex,
       hedef:hedef,
        uid:user.uid
    })
     navigate("/", { replace: true })
   
  }


  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">Kişisel Bilgiler</h2>

      <label htmlFor="kilo" className="block text-gray-700">Kilo:</label>
      <input
        onChange={(e) => setKilo(e.target.value)}
        type="kilo"
        id="kilo"
        name="kilo"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />

      <label htmlFor="boy" className="block text-gray-700">Boy:</label>
      <input
        onChange={(e) => setBoy(e.target.value)}
        type="boy"
        id="boy"
        name="boy"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />
      <label htmlFor="yagoran" className="block text-gray-700">Vücut Yağ Oranı: </label>
        <input onChange={(e) => setYagoran(e.target.value)} type="text" id="yagoran" name="yagoran"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />

<label htmlFor="kaskutle"  className="block text-gray-700">Kas Kütlesi: </label>
        <input onChange={(e) => setKaskutle(e.target.value)} type="text" id="kaskutle" name="kaskutle"
         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />

<label htmlFor="kitleindex"  className="block text-gray-700">Vücut Kitle İndeksi: </label>
        <input onChange={(e) => setKitleindex(e.target.value)} type="text" id="kitleindex" name="kitleindex" 
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />
 
 <label htmlFor="hedef"  className="block text-gray-700">Hedef: </label>
        <input onChange={(e) => setHedef(e.target.value)} type="text" id="hedef" name="hedef" 
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500" />
 

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
