import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { cikis, dogrula, veriAl, veriGuncelle, auth, getDocumentByUid,getDocumentByUidk, veriAlrol } from '../firebase'
import { cikis as cikisYap, giris } from "../store/auth"
import { useNavigate } from 'react-router-dom'

import "../styles/pages/Home.css"
import Ust from '../components/Ust'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Profil from '../components/Profil'

import toast from 'react-hot-toast'
import KisiselBilgiler from '../components/KisiselBilgiler'
import { linkWithCredential } from 'firebase/auth'
import KisiselBilgilera from '../components/KisiselBilgilera'

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const [data, setData] = useState([])
  const [input1, setInput1] = useState()
  const [input2, setInput2] = useState()
  const [docid, setDocid] = useState()
  const [docidkisi,setDocidkisi]=useState()
  const [rol, setRol] = useState()
  const [datakisisel, setDatakisisel] = useState([])
  const [rolDurumu, setRolDurumu] = useState(null);
  const handleVerial = async (tablo, uid) => {
    setDocid(await getDocumentByUid('kullanicilar', `${user.uid}`))
    setData(await veriAl(tablo, uid))
    

  }

  const handleVerialkisisel =async (tablo,uid)=>{
    setDocidkisi(await getDocumentByUid(tablo,`${user.uid}`))
    
    setDatakisisel(await veriAl(tablo,uid))
  }


  useEffect(() => {
    console.log("user changed", user);
  
    const fetchData = async () => {
      if (user) {
        handleVerial("kullanicilar", user.uid);
  
        const result = await veriAlrol("kullanicilar", user.uid);
        setRol(result);
  
        if (result === "Danışan") {
          handleVerialkisisel("danisanlar", user.uid);
        } else if (result === "Antrenör") {
          handleVerialkisisel("antrenorler", user.uid);
        }
      }
    };
  
    fetchData();
  }, [user]);
  



 

  const handleLogout = async () => {
    await cikis()
    dispatch(cikisYap())
    navigate("/", { replace: true })
  }


  const handleDogrula = async () => {
    await dogrula()
  }
  
  const [activeTab, setActiveTab] = useState('personalInfo');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const handleGuncel = async e => {
    e.preventDefault()

    if(input1==="uzmanlik" || input1==="deneyim" )
    {
      await veriGuncelle("antrenorler", docidkisi, input1, input2)
      setInput1("")
      setInput2("")
      handleVerialkisisel("antrenorler", user.uid);

    }
    
    if(input1==="kilo" || input1==="boy" || input1==="yagoran" ||  input1==="kaskutle" ||  input1==="kitleindex" || input1==="hedef")
    {
      await veriGuncelle("danisanlar", docidkisi, input1, input2) 
      setInput1("")
      setInput2("")
      handleVerialkisisel("danisanlar", user.uid);
    }
    
    await veriGuncelle("kullanicilar", docid, input1, input2)
    setInput1("")
    setInput2("")
    handleVerial("kullanicilar", user.uid);


  }



  const handleRolGiris = async () => {

    navigate("/giris", { replace: true })

  }

  const handleRolKayit = async () => {
    navigate("/kayit", { replace: true })

  }





  if (user) {
  

    if (rol === "Danışan") {


      return (
        <div >

          <div>
            <nav className="bg-purple-900 p-4">
              <div className="container flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-white text-2xl font-bold">FITLIFE</div>
                 

                </div>

                <div className="text-white fixed right-20">
                  <button onClick={handleLogout} className="bg-purple-500  text-white px-5 py-3 rounded">ÇIKIŞ</button>
                </div>
              </div>
            </nav>



            <Tabs>
              <TabList>
                <Tab>Profilim</Tab>
                <Tab>Programlar</Tab>
              
                <Tab>Kişisel Bilgiler</Tab>
              </TabList>

              <TabPanel>
              <div className="flex flex-wrap">
 
  <div className="w-full mb-4">
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
    <title>Kişisel Bilgi Paneli</title>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-100 border-b">Ad</th>
                            <th className="px-6 py-3 bg-gray-100 border-b">Soyad</th>
                            <th className="px-6 py-3 bg-gray-100 border-b">Doğum Tarihi</th>
                            <th className="px-6 py-3 bg-gray-100 border-b">Cinsiyet</th>
                            <th className="px-6 py-3 bg-gray-100 border-b">E-posta</th>
                            <th className="px-6 py-3 bg-gray-100 border-b">Telefon Numarası</th>
                            <th className="px-6 py-3 bg-gray-100 border-b">Şifre</th>
                            <th className="px-6 py-3 bg-gray-100 border-b">Rol</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                              <td className="px-6 py-4 border-b">{item.ad}</td>
                              <td className="px-6 py-4 border-b">{item.soyad}</td>
                              <td className="px-6 py-4 border-b">{item.dogum}</td>
                              <td className="px-6 py-4 border-b">{item.cinsiyet}</td>
                              <td className="px-6 py-4 border-b">{item.posta}</td>
                              <td className="px-6 py-4 border-b">{item.tel}</td>
                              <td className="px-6 py-4 border-b">{item.sifre}</td>
                              <td className="px-6 py-4 border-b">{item.rol}</td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>



</div>
</div>



<div className="w-1/2 mb-4">
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
    <title>Bilgi Paneli</title>
      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-100 border-b">Kilo</th>
                              <th className="px-6 py-3 bg-gray-100 border-b">Boy</th>
                              <th className="px-6 py-3 bg-gray-100 border-b">Vücut Yağ Oranı</th>
                              <th className="px-6 py-3 bg-gray-100 border-b">Kas Kütlesi</th>
                              <th className="px-6 py-3 bg-gray-100 border-b">Vücut Kitle İndeksi</th>
                              <th className="px-6 py-3 bg-gray-100 border-b">Hedef</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datakisisel.map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className="px-6 py-4 border-b">{item.kilo}</td>
                                <td className="px-6 py-4 border-b">{item.boy}</td>
                                <td className="px-6 py-4 border-b">{item.yagoran}</td>
                                <td className="px-6 py-4 border-b">{item.kaskutle}</td>
                                <td className="px-6 py-4 border-b">{item.kitleindex}</td>
                                <td className="px-6 py-4 border-b">{item.hedef}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>



</div>
</div>
 



<div className="w-1/2 mb-4">
    <div style={{ width: "500px", marginLeft: "auto" }}>
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-6 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Güncelleme Alanı</h2>


          <form >
                          <div className="mb-4">
                            <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">
                              Güncellenecek Alan
                            </label>
                            <input
                              type="text"
                              id="input1"
                              name="input1"

                              onChange={(e) => setInput1(e.target.value)}
                              className="border border-gray-300 p-2 rounded-md w-full"
                            />
                          </div>

                          <div className="mb-4">
                            <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">
                              Değer
                            </label>
                            <input
                              type="text"
                              id="input2"
                              name="input2"

                              onChange={(e) => setInput2(e.target.value)}
                              className="border border-gray-300 p-2 rounded-md w-full"
                            />
                          </div>

                          <button
                            type="submit"
                            className=" bg-purple-600 text-white px-5 py-2 rounded-md"
                            onClick={handleGuncel}
                          >
                            Gönder
                          </button>
                        </form>




</div>
</div>
</div>
</div>
</div>

              </TabPanel>
              <TabPanel>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Link to="/Egzersiz" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: '300px', margin: '0 15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <img src="https://images.unsplash.com/photo-1606903037631-f09fd0bd74b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUwfHxmaXRuZXNzfGVufDB8fDB8fHww" alt="Card image cap" style={{ width: '100%', height: 'auto' }} />
                      <div style={{ padding: '16px' }}>
                        <h4 className="card-title">EGZERSİZ PROGRAMLARI</h4>
                        <p className="card-text"> Size özel egzersiz planları !!! </p>
                        <p className="card-text"><small className="text-muted"> Hedefizinize uygun set planları, video rehberliği ve daha fazlası... </small></p>
                      </div>
                    </div>
                  </Link>


                  <Link to="/Beslenme" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: '300px', margin: '0 15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Card image cap" style={{ width: '100%', height: 'auto' }} />
                      <div style={{ padding: '16px' }}>
                        <h4 className="card-title">BESLENME PROGRAMLARI </h4>
                        <p className="card-text"> Size özel beslenme planları !!! </p>
                        <p className="card-text"><small className="text-muted"> Günlük beslenme takvimi, kalori değeleri, alternatifler ve daha fazlası...</small></p>
                      </div>
                    </div>
                  </Link>
                </div>



              </TabPanel>
               
              <TabPanel>
                <KisiselBilgiler />

              </TabPanel>
            </Tabs>

          </div>


       </div>
      )

    }

    if (rol === "Antrenör") {


      return (
        <div >

          <div>
            <nav className="bg-purple-900 p-4">
              <div className="container flex justify-between items-center">
                <div className="flex items-center">
                  <div className="text-white text-2xl font-bold">FITLIFE</div>
                  

                </div>

                <div className="text-white fixed right-20">
                  <button onClick={handleLogout} className="bg-purple-500  text-white px-5 py-3 rounded">ÇIKIŞ</button>
                </div>
              </div>
            </nav>



            <Tabs>
              <TabList>
                <Tab>Profilim</Tab>
 
                <Tab>Kişisel Bilgiler</Tab>
              </TabList>

              <TabPanel>
              <div className="flex">
              <div className="w-full">
              <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <title>Kişisel Bilgi Paneli</title>
      <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 bg-gray-100 border-b">Ad</th>
                                <th className="px-6 py-3 bg-gray-100 border-b">Soyad</th>
                                <th className="px-6 py-3 bg-gray-100 border-b">Doğum Tarihi</th>
                                <th className="px-6 py-3 bg-gray-100 border-b">Cinsiyet</th>
                                <th className="px-6 py-3 bg-gray-100 border-b">E-posta</th>
                                <th className="px-6 py-3 bg-gray-100 border-b">Telefon Numarası</th>
                                <th className="px-6 py-3 bg-gray-100 border-b">Şifre</th>
                                <th className="px-6 py-3 bg-gray-100 border-b">Rol</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                  <td className="px-6 py-4 border-b">{item.ad}</td>
                                  <td className="px-6 py-4 border-b">{item.soyad}</td>
                                  <td className="px-6 py-4 border-b">{item.dogum}</td>
                                  <td className="px-6 py-4 border-b">{item.cinsiyet}</td>
                                  <td className="px-6 py-4 border-b">{item.posta}</td>
                                  <td className="px-6 py-4 border-b">{item.tel}</td>
                                  <td className="px-6 py-4 border-b">{item.sifre}</td>
                                  <td className="px-6 py-4 border-b">{item.rol}</td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

 
      </div>
            </div>
           </div>



           <div className="w-1/2">
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <title>Bilgi Paneli</title>
      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-100 border-b">Uzmanlık Alanı</th>
                              <th className="px-6 py-3 bg-gray-100 border-b">Deneyim</th>
                              <th className="px-6 py-3 bg-gray-100 border-b">İletişim</th>
                        
                            </tr>
                          </thead>
                          <tbody>
                            {datakisisel.map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className="px-6 py-4 border-b">{item.uzmanlik}</td>
                                <td className="px-6 py-4 border-b">{item.deneyim}</td>
                                <td className="px-6 py-4 border-b">{item.iletisim}</td>
                         

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                           

</div>
</div>


<div className="w-1/2">
    <div style={{ width: "500px", marginTop: "-25%" ,marginLeft:"140%" }}>
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 p-6 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Güncelleme Alanı</h2>


          <form >
                            <div className="mb-4">
                              <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">
                                Güncellenecek Alan
                              </label>
                              <input
                                type="text"
                                id="input1"
                                name="input1"

                                onChange={(e) => setInput1(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full"
                              />
                            </div>

                            <div className="mb-4">
                              <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">
                                Değer
                              </label>
                              <input
                                type="text"
                                id="input2"
                                name="input2"

                                onChange={(e) => setInput2(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full"
                              />
                            </div>

                            <button
                              type="submit"
                              className=" bg-purple-600 text-white px-5 py-2 rounded-md"
                              onClick={handleGuncel}
                            >
                              Gönder
                            </button>
                          </form>
 
</div>
</div>
</div>
</div>


 


              </TabPanel>
 
              <TabPanel>
                <KisiselBilgilera />

              </TabPanel>
            </Tabs>

          </div>


        </div>
      )

    }

 

  }



  return (

    <div>

      <nav className="bg-purple-900 p-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-white text-2xl font-bold">FITLIFE</div>
            <div className="text-white ml-4 text-2xl font-bold">{user.displayName}</div>

          </div>
        </div>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>


        <form >

          <div style={{ width: '300px', margin: '0 15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <img src="https://media.istockphoto.com/id/1329895913/tr/vekt%C3%B6r/young-woman-jane-with-tangled-thoughts-business-problem-solving-concept-online-communication.jpg?s=612x612&w=0&k=20&c=7KvTBLOId3rnFzp-QGi35N5sB2ZF94hfqM5AfLaIx94= " alt="Card image cap" style={{ width: '100%', height: 'auto' }} />
            <div style={{ padding: '16px' }}>
              <h4 className="card-title">HOŞGELDİNİZ</h4>
              <button onClick={handleRolKayit}>Kayıt</button>
              <button style={{ marginTop: "10px" }} onClick={handleRolGiris}>Giriş</button>
            </div>
          </div>


        </form>





      </div>





    </div>


 
  )
}
