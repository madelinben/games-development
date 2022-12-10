export default function sketch(p5) {
    let canvas;

    p5.setup = () => {
        canvas = p5.createCanvas(500, 500);
    }

    p5.draw = () => {
        p5.background('orangered');
        
        if (p5.mouseIsPressed) {
            p5.fill(0);
        } else {
            p5.fill(255);
        }
        
        p5.ellipse(p5.mouseX, p5.mouseY, 25, 25);    
    }



}