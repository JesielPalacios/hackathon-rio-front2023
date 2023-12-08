import React, { useState } from 'react';
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

  const nextSlide = () => {
    setCounter((prevCounter) => (prevCounter + 1) % slides.length);
  };

  const prevSlide = () => {
    setCounter(
      (prevCounter) => (prevCounter - 1 + slides.length) % slides.length
    );
  };

  const transformStyle = {
    transform: `translateX(${-counter * 15.33}%)`, // Ajusta según el valor de flex
  };

  return (
    <div className="slider-container">
        <button onClick={prevSlide} className="slider-button">
          &lt;
        </button>
      <div className="slider" style={transformStyle}>
        {slides.map((slide, index) => (
          <Slide key={index} {...slide} />
        ))}
      </div>
        <button onClick={nextSlide} className="slider-button">
          &gt;
        </button>
      <button onClick={prevSlide}>Anterior</button>
      <button onClick={nextSlide}>Siguiente</button>
    </div>
  );
};

export default Slider;