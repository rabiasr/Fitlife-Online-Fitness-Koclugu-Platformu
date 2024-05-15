import { useState } from "react"
import { guncelle, auth ,sifreGuncelle} from "../firebase"
import { useDispatch, useSelector } from "react-redux"
import { giris } from "../store/auth"
import "../styles/pages/Profil.css"
import Secenek from "./Secenek"
export default function ProfilGuncelle() {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName] = useState(user.displayName || "")
    const [avatar, setAvatar] = useState(user.photoURL || "")
    const [password, setPassword] = useState("")


    const guncelPro = async e => {
        e.preventDefault()
        await guncelle({
            displayName,
            photoURL: avatar
        })
        dispatch(giris({
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            emailVerified: auth.currentUser.emailVerified,
            photoURL: auth.currentUser.photoURL,
            uid: auth.currentUser.uid
        }))
    }

    const sifreGuncel =async  e=> {
        e.preventDefault()
       const sonuc= await sifreGuncelle(password)
       if(sonuc) 
      {
         setPassword("")
      }

    }


    return (
        
      <>
            <div style={{marginLeft:"0%"}}>
        
            <div className="max-w-md p-4 bg-white shadow-md rounded-md">
  <form onSubmit={guncelPro} className="space-y-4">
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-2">Profili Güncelle</h1>
      <label className="block text-gray-700">AD Soyad:</label>
      <input
        type="text"
        placeholder="ad soyad"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />
    </div>
    <div className="flex flex-col items-center">
      <label className="block text-gray-700">Fotoğraf:</label>
      <input
        type="text"
        placeholder="Fotoğraf URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />
    </div>
    <button
      type="submit"
      className=" bg-purple-500 text-white px-5 py-3 rounded"
    >
      Güncelle
    </button>
  </form>


        

              <div>
  <form onSubmit={sifreGuncel} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
    <div className="mb-4">
      <h1 className="text-2xl font-semibold mb-2">Parolayı Güncelle</h1>
      <label className="block text-gray-700">Parola:</label>
      <input
        type="password"
        placeholder="******"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
      />
    </div>
    <button
      disabled={!password}
      type="submit"
      className=" bg-purple-500 text-white px-2 py-3 rounded disabled:bg-gray-400"
    >
      Şifreyi Güncelle
    </button>
  </form>
</div>
</div>
      
</div>
 
</>

    )

}