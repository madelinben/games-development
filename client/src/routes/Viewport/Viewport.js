import React, {useState, useEffect, useRef} from 'react';
import p5 from 'p5';

import SectionTitle from '../../components/SectionTitle/SectionTitle';

function Sketch(canvas) {
    canvas.setup = () => {
        canvas.createCanvas(500, 500);
    }

    canvas.draw = () => {
        canvas.background('orangered');
        
        if (canvas.mouseIsPressed) {
            canvas.fill(0);
        } else {
            canvas.fill(255);
        }
        
        canvas.ellipse(canvas.mouseX, canvas.mouseY, 25, 25);
    }



}

function Viewport() {
    const canvasRef = useRef();

    useEffect(() => {
      const sketchInstance = new p5(Sketch, canvasRef.current);
    
      return () => {
        sketchInstance.remove();
      }
    }, []);

    return (
        <section aria-label='home page' id='home'>
            {/* <SectionTitle title={'Home'} /> */}
            {/* <h1>Success 200: Welcome Home.</h1> */}

            <div id='canvas-wrapper' ref={canvasRef} />
            
        </section>
    );
}

export default Viewport;