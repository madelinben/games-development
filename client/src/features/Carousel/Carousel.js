import React, {useState} from 'react';

// import * as MdIcons from 'react-icons/md';
import {MdArrowForward, MdArrowBack} from 'react-icons/md';
import {CSSTransition, SwitchTransition} from 'react-transition-group';

import './Carousel.css';

function Carousel(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = props.data[activeIndex];

    const handleNext = () => {
        if (activeIndex >= props.data.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex((oldIndex) => oldIndex + 1);
        }
    }

    const handlePrev = () => {
        if (activeIndex === 0) {
          setActiveIndex(props.data.length - 1);
        } else {
          setActiveIndex((oldIndex) => oldIndex - 1);
        }
    }

    return (
        <div className='carousel-wrapper'>
            {/* <SectionTitle heading="Testimonials" subheading="see what our clients say about us" /> */}
            <div className='carousel-container animated-border'>
                <SwitchTransition component={null}>
                    <CSSTransition key={activeSlide.id} timeout={300} classNames="fade">
                        <div className='carousel-content'>
                            <div className="testimonial-info">
                                <h2 className="testimonial-title">
                                    {activeSlide.title}, <br /> {activeSlide.org}
                                </h2>
                                <div className="testimonial-desc">
                                    <p>{activeSlide.desc}</p>
                                </div>
                                {/* <p className="testimonial-name">{activeSlide.name}</p> */}
                            </div>
                            <div className='carousel-button'>
                                <div className='prev-arrow' onClick={handlePrev} onKeyDown={handlePrev}>
                                    <MdArrowBack />
                                </div>
                                <div className='next-arrow' onClick={handleNext} onKeyDown={handleNext}>
                                    <MdArrowForward />
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}

export default Carousel;