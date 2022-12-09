import React from 'react';
import Typewriter from 'typewriter-effect';

import HeroImg from '../../assets/img/hero.jpeg';
import statusData from '../../assets/data/status';
import './Hero.css';

function Hero() {
    return (
        <section aria-label='welcome hero' id='hero'>
          <div id='hero-container' className='flex-horizontal'>
              <div className="hero-image">
                  <img src={HeroImg} alt="" />
              </div>
              <div className="center-text">
                  <p className="text-small">Hello there, I am</p>
                  <p className="text-title">Benjamin Madelin.</p>
                  <Typewriter options={{
                      strings: statusData,
                      autoStart: true,
                      delay: 150,
                      deleteSpeed: 30,
                      pauseFor: 2000,
                      loop: true,
                    }}
                  />
              </div>
          </div>
      </section>
    );
}

export default Hero;