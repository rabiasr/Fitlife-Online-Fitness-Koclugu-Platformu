import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/pages/EgzersizDetay.css';
import YouTube from 'react-youtube';
import Ust from '../components/Ust';

const EgzersizDetay0 = ({ users }) => {
  const [data, setData] = useState([]);
  const [videoId, setVideoId] = useState('o9pGc_rXQcM');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'baslangic'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setData(data);
        if (window.YT) {
          const player = new window.YT.Player('youtube-player', {
            height: '300',
            width: '720',
            videoId: data[0]?.videoId, 
            events: {
              onReady: _onReady,
            },
          });
  
          return () => {
            player.destroy();
          };
        }
      } catch (error) {
        console.error('Veri alımında bir hata oluştu', error);
      }
    };
  
    fetchData();
  }, [videoId]); 

  const opts = {
    height: '350',
    width: '500',
    playerVars: {
      autoplay: 1,
    },
  };
  
 
  const videoContainerStyle = {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: '100px',
    marginLeft: '5%',
  };
  
  const videoStyle = {
    width: '100%', 
    maxWidth: '500px', 
  };

  const _onReady = (event) => {
    const player = event.target;

    player.addEventListener('onStateChange', (event) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        
        player.seekTo(0);
        player.playVideo();
      }
    });
   
    player.playVideo();
  };

  return (

    <>
    <Ust/>

    <div className="egzersizdetay">
      <div>
        <h2>BAŞLANGIÇ SEVİYE EGZERSİZ BİLGİLERİ</h2>
        <table>
          <thead>
            <tr>
              <th>Egzersiz Adı</th>
              <th>Yapılması Gereken Sıklık</th>
              <th>Mola Uzunluğu</th>
              <th>Set Sayısı</th>
              <th>Tekrar Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.ad}</td>
                <td>{item.kackez}</td>
                <td>{item.mola}</td>
                <td>{item.set}</td>
                <td>{item.tekrar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="video" style={videoContainerStyle}>
          {videoId && <YouTube videoId={videoId} opts={opts} onReady={_onReady} />}
        </div>

    </div>
    </>
    
  );
};

export default EgzersizDetay0;
