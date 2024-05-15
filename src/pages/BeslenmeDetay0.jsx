import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/pages/BeslenmeDetay.css';
import '../styles/pages/Arkaplan.css';

const BeslenmeDetay0 = ({ users }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'kiloverme'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setData(data);
      } catch (error) {
        console.error('Veri alımında bir hata oluştu', error);
      }
    };
  
    fetchData();
  }, []); 

  return (
    <div className='dis'>
      <div className="beslenmedetay" style={{ position: 'relative', width: '80%', margin: '20px auto', zIndex: '15' }}>
        <div>
          <h2> KİLO VERMEK İÇİN UYGUN DİYET LİSTESİ </h2>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Gün</th>
                <th>Sabah</th>
                <th>Öğle</th>
                <th>Ara Öğün</th>
                <th>Akşam</th>
                <th>Toplam Kalori</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.Gün}</td>
                  <td>{item.Sabah}</td>
                  <td>{item.Öğle}</td>
                  <td>{item.Ara}</td>
                  <td>{item.Akşam}</td>
                  <td>{item.Kalori}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="background-image"></div>       
      </div>
    </div>
  );
};

export default BeslenmeDetay0;
