import React from 'react'
import { auth } from '../firebase'
import { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";

function Sifre() {
    const [email, setEmail] = useState('');
    

    const sifreDegis = async(e) => {
        e.preventDefault();
        const mailDeger = e.target.email.value;

        sendPasswordResetEmail(auth, mailDeger).then(data=> {
            alert("Lütfen Mailinizi Kontrol Ediniz")
           window.location="/"
        }).catch(err => {
            alert(err.code)
        })
    };





    return (
        <div className='sifre flex items-center justify-center h-screen'>
  <div className='sifre-ic p-6 bg-gray-100 rounded-md'>
    <h2 className='text-2xl font-bold mb-4'>E-mail Giriniz</h2>
    <form onSubmit={(e) => sifreDegis(e)}>
      <input className='mb-4 p-2 border border-gray-300 rounded-md' name="email" />
      <br />
      <button className='bg-purple-600 text-white px-4 py-2 rounded-md' name='buton'>Şifre Sıfırla</button>
    </form>
  </div>
</div>




    )


    }
    export default Sifre;