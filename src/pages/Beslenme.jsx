import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Ust from '../components/Ust';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [ 
    { src: 'https://media.istockphoto.com/id/1435487227/tr/foto%C4%9Fraf/white-scale-and-upset-and-sad-woman-with-measuring-tape-on-floor.jpg?s=612x612&w=0&k=20&c=V7QCyXLVfauLfqhcFrFqTvyHjLNJI_Acs2rJ7GFsCKM=', caption: 'Kilo Verme Diyetleri' },
    { src: 'https://media.istockphoto.com/id/1457433817/tr/foto%C4%9Fraf/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=pu39wArcRa9qm_RaL4TvHQSX0lXqOr-8_Oq_izOeyt4=', caption: 'Sağlıklı Kilo Alma Diyetleri' },
    { src: 'https://media.istockphoto.com/id/1354892869/tr/foto%C4%9Fraf/woman-asking-coach-to-measure-waist.jpg?s=612x612&w=0&k=20&c=tgDmZhh0_hszsPtJ0ByoMiDiz5-uFEQjt6dTLNA_lpo=', caption: 'Koruma Diyetleri'},
   
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const detailPageLink = `/BeslenmeDetay/${currentIndex}`;

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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px',marginRight: '38%'}}>
        <button
          onClick={prevSlide}
          style={{
            background: "rgb(78, 7, 99)",
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            marginRight: '10px',
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
            marginLeft: '10px',
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
