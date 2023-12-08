import { useState } from 'react';
import config from '../utils/config/config';
import './mobileSlider.css';

interface SlideProps {
  imageSrc: string;
  altText: string;
}

// const Slide: React.FC<SlideProps> = ({ imageSrc, altText }) => {
const Slide: React.FC<SlideProps> = (data) => {
  console.log('data', data);
  return (
    <div className="slide">
      {/* <img src={imageSrc} alt={altText} /> */}
      <img src={config.imagePath + '/' + data.poster_path} />
    </div>
  );
};

interface SliderProps {
  slides: SlideProps[];
}

const MobileSlider: React.FC<SliderProps> = ({ slides }) => {
  const [counter, setCounter] = useState(0);

  const nextSlide = () => {
    setCounter((prevCounter) => (prevCounter + 1) % slides.length);
  };

  const prevSlide = () => {
    setCounter(
      (prevCounter) => (prevCounter - 1 + slides.length) % slides.length
    );
  };

  const slideWidth = 150;
  const transformStyle = {
    transform: `translateX(${-counter * slideWidth}px)`,
  };

  return (
    <div className="slider-container">
      <div className="slider" style={transformStyle}>
        {slides.map((slide, index) => (
          <Slide key={index} {...slide} />
        ))}
      </div>
      <button onClick={prevSlide}>Anterior</button>
      <button onClick={nextSlide}>Siguiente</button>
    </div>
  );
};

export default MobileSlider;
