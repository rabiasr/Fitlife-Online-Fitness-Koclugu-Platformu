import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Ust from '../components/Ust';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D', caption: 'Başlangıç Seviyesi' },
    { src: 'https://images.unsplash.com/photo-1627483298235-f3bac2567c1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D', caption: 'Orta Seviye' },
    { src: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGZpdG5lc3N8ZW58MHx8MHx8fDA%3D', caption: 'Profesyonel Seviye' },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const detailPageLink = `/EgzersizDetay/${currentIndex}`;

  return (
    

        <>
          <Ust/>



<div style={{ textAlign: 'center', paddingTop: '50px' }}>
  <Link to={detailPageLink}>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      src={images[currentIndex].src}
      alt={`Slide ${currentIndex + 1}`}
      style={{ width: '55%', height: 'auto', maxHeight: '800px', objectFit: 'cover' }}
    />
  </div>
  </Link>
  <div
    style={{
      position: 'absolute',
bottom: "10%",
left: '50%',
transform: 'translateX(-50%)',
width: '50%',

background: 'rgba(0, 0, 0, 0.7)',
color: 'white',
padding: '10px',
    }}
  >
    {images[currentIndex].caption}
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px',marginRight: '38%' }}>
    <button
      onClick={prevSlide}
      style={{
        background: "rgb(78, 7, 99)",
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
      }}
    >
      Önceki
    </button>
    <button
      onClick={nextSlide}
      style={{
        background: "rgb(78, 7, 99)",
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
         marginLeft: '10px'
      }}
    >
      Sonraki
    </button>
  </div>
</div>
        
        </>

    
  );
};

export default Carousel;
