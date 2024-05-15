import React from 'react'
 
export default function Profil() {
  return (
   
        <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries({
                  'Ad': "displayName",
                  'Soyad': 'aaaa',
                  'Doğum Tarihi': 'aaa',
                  'Cinsiyet': 'aaa',
                  'Telefon Numarası': 'aaa',
                  'Rol': 'aa',
                  'E-posta': 'posta',
                  'Şifre': ' sifre',
                  'UID': 'uid',
                }).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-100 border rounded-md">
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
    </div>
  )
}
