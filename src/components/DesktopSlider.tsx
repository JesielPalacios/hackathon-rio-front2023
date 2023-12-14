import React, { useState, useEffect } from 'react';
import config from '../utils/config/config';
import './desktopSlider.css';

interface SlideProps {
  imageSrc: string;
  altText: string;
}

// const Slide: React.FC<SlideProps> = ({ imageSrc, altText }) => {
const Slide: React.FC<SlideProps> = (data) => {
  return (
    <div className="slide">
      <img
        // src={imageSrc}
        src={config.imagePath + '/' + data.poster_path}
        // alt={altText}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

interface SliderProps {
  slides: SlideProps[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [counter, setCounter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    //  let intervalId: NodeJS.Timeout;
    let intervalId: any;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCounter((prevCounter) => (prevCounter + 1) % slides.length);
      }, 2000); // Cambia este valor según la velocidad de reproducción que desees
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, slides.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const prevSlide = () => {
    setCounter(
      (prevCounter) => (prevCounter - 1 + slides.length) % slides.length
    );
  };

  const nextSlide = () => {
    setCounter((prevCounter) => (prevCounter + 1) % slides.length);
  };

  const transformStyle = {
    transform: `translateX(${-counter * 15.33}%)`, // Ajusta según el valor de flex
  };

  return (
    <div className="slider-container">
      <button onClick={prevSlide} className="slider-button slider-button-left">
        &lt;
      </button>
      <div className="slider" style={transformStyle}>
        {slides.map((slide, index) => (
          <Slide key={index} {...slide} />
        ))}
      </div>
      <button onClick={nextSlide} className="slider-button slider-button-right">
        &gt;
      </button>
      {/*  */}
      <div className="slider-buttons-wrapper">
        <button onClick={prevSlide}>Anterior</button>
        <button onClick={togglePlay}>
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </button>
        <button onClick={nextSlide}>Siguiente</button>
        <button onClick={nextSlide}>Ver últimos estrenos</button>
      </div>
    </div>
  );
};

export default Slider;
