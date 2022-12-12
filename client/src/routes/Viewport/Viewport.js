import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import p5 from 'p5';

import { useLocalStorage } from '../../hooks/useStorage/useStorage';

import './Viewport.css';

// import SectionTitle from '../../components/SectionTitle/SectionTitle';

/* class Particle {
        constructor() {
          this.pos = canvas.createVector(canvas.random(canvas.width), canvas.random(canvas.height));
          this.vel = canvas.createVector(0, 0);
          this.acc = canvas.createVector(0, 0);
          this.maxspeed = 4;
          this.prevPos = this.pos.copy();
        }
      
        update() {
          this.vel.add(this.acc);
          this.vel.limit(this.maxspeed);
          this.pos.add(this.vel);
          this.acc.mult(0);
        }
      
        follow(vectors) {
          var x = canvas.floor(this.pos.x / scl);
          var y = canvas.floor(this.pos.y / scl);
          var index = x + y * cols;
          var force = vectors[index];
          this.applyForce(force);
        }
      
        applyForce(force) {
          this.acc.add(force);
        }
      
        show() {
          canvas.stroke(255, 10);
          canvas.strokeWeight(1);
          canvas.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
          this.updatePrev();
        }
      
        updatePrev() {
          this.prevPos.x = this.pos.x;
          this.prevPos.y = this.pos.y;
        }
      
        edges() {
          if (this.pos.x > canvas.width) {
            this.pos.x = 0;
            this.updatePrev();
          }
          if (this.pos.x < 0) {
            this.pos.x = canvas.width;
            this.updatePrev();
          }
          if (this.pos.y > canvas.height) {
            this.pos.y = 0;
            this.updatePrev();
          }
          if (this.pos.y < 0) {
            this.pos.y = canvas.height;
            this.updatePrev();
          }
      
        }
      
      } */

function Sketch(wrapper) {
    // const [terrain, setTerrain, removeTerrain] = useLocalStorage('terrain', null);
    // const [character, setCharacter, removeCharacter] = useLocalStorage('character', null);

    return (canvas) => {
        const CONTAINER = document.getElementById('viewport-wrapper');
        // const ctx = canvas.getContext('2d');

        const TERRAIN_ELEVATION = Object.freeze({
          DEEP_WATER: 0.3,
          SHALLOW_WATER: 0.5,
          SANDY_BEACH: 0.55,
          GRASS_PLAINS: 0.6,
          DENSE_FORREST: 0.65,
          STONE_COBBLES: 0.7,
          STEEP_MOUNTAIN: 0.75,
          SNOW_PEAK: 1
        });
    
        const TERRAIN = {
            ELEVATION: TERRAIN_ELEVATION,
            SEED: null,
            CONFIG: {
                TYPE: 'perlin',
                AMPLITUDE: 1,
                AMPLITUDE_COEFFICIENT: 0.5,
                FREQUENCY: 0.5,
                FREQUENCY_COEFFICIENT: 0.5,
                GENERATE_SEED: false,
                ENABLE_SHADOW: false
            },
            MAP: {
                POINTER: {
                    X: 0,
                    Y: 0
                },
                WIDTH: null,
                HEIGHT: null,
                COL: null,
                ROW: null,
                CHUNK: 10,
                DATA: []
            }
        }

        const CHARACTER = {
            NAME: 'MadBenitezXD',
            SPRITE: 'sprite-001',
            LEVEL: {
                RANK: 0,
                XP: 0,
                PROMO: 10,
            },
            ORIGIN: {
                DISTANCE: 1000,
                X: null,
                Y: null
            },
            POS: {
                X: 0,
                XSPEED: 10,
                Y: 0,
                YSPEED: 10,
            },
            CURSOR: {
                X: 0,
                Y: 0,
                COLOR: '#DE73FF'
            },
            SIZE: {
                HEIGHT: TERRAIN.MAP.CHUNK,
                WIDTH: TERRAIN.MAP.CHUNK
            },
            COMBAT: {
                HEALTH: 50,
                ARMOUR: 20,
                ATTACK: 5,
                DEFENCE: 3,
                MAGIC: 0,
            },
            SKILL: {
                SPEECH: 5,
                STEALTH: 0,
                LOCKPICKING: 1,
                ENCHANTING: 0,
            }
        }
    
        // document.addEventListener('mousemove', MouseEvent);
    
        canvas.setup = () => {
            canvas.createCanvas(canvas.floor(CONTAINER.offsetWidth/TERRAIN.MAP.CHUNK)*TERRAIN.MAP.CHUNK, canvas.floor(CONTAINER.offsetHeight/TERRAIN.MAP.CHUNK)*TERRAIN.MAP.CHUNK).parent(wrapper); /* WEBGL */
            // canvas.createCanvas(CONTAINER.offsetWidth, CONTAINER.offsetHeight).parent(wrapper);
    
            canvas.frameRate(1);
            // canvas.angleMode(canvas.DEGREES);
            // canvas.rectMode(canvas.CENTER);
            // canvas.noStroke();
    
            TERRAIN.SEED = canvas.random();
            TERRAIN.MAP.WIDTH = canvas.width;
            TERRAIN.MAP.HEIGHT = canvas.height;

            TERRAIN.MAP.COL = canvas.floor(canvas.width/TERRAIN.MAP.CHUNK);
            TERRAIN.MAP.ROW = canvas.floor(canvas.height/TERRAIN.MAP.CHUNK);

            CHARACTER.ORIGIN.X = TERRAIN.MAP.CHUNK * (canvas.floor(TERRAIN.MAP.COL/2));
            CHARACTER.ORIGIN.Y = TERRAIN.MAP.CHUNK * (canvas.floor(TERRAIN.MAP.ROW/2));
            CHARACTER.POS.X = TERRAIN.MAP.CHUNK * (canvas.floor(TERRAIN.MAP.COL/2));
            CHARACTER.POS.Y = TERRAIN.MAP.CHUNK * (canvas.floor(TERRAIN.MAP.ROW/2));

            canvas.background('#ffffff');

            // Set perlin noise seed
        }
    
        /* canvas.windowResized = () => {
            canvas.resizeCanvas(CONTAINER.offsetWidth, CONTAINER.offsetHeight);
            // canvas.background(0);
        } */
    
        canvas.draw = () => {
            canvas.clear();

            // Adjust canvas x,y position based on updated player position

            // Iterate through visible chunks
            for (let x=TERRAIN.MAP.POINTER.X; x<canvas.width; x+=TERRAIN.MAP.CHUNK) {
                for (let y=TERRAIN.MAP.POINTER.Y; y<canvas.height; y+=TERRAIN.MAP.CHUNK) {
                    // Generate noise value for chunk
                    let noise = canvas.noise(0.01 * x, 0.01 * y);
                    
                    // Format chunk data
                    let CHUNK = {
                        NOISE: null,
                        BIOME: '',
                        X: 0,
                        Y: 0,
                        COLOR: '',
                        SIZE: TERRAIN.MAP.CHUNK,
                        MOVE: false,
                        STRUCTURE: null
                    }

                    // Check chunk exists in saved cache
                    const SELECTED_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => chunk.X === x && chunk.Y === y);
                    
                    // Generate new chunk and random structures
                    if (SELECTED_CHUNK !== -1) {
                        // Draw chunk graphics
                        canvas.fill(canvas.color(TERRAIN.MAP.DATA[SELECTED_CHUNK].COLOR));
                        canvas.rect(TERRAIN.MAP.DATA[SELECTED_CHUNK].X, TERRAIN.MAP.DATA[SELECTED_CHUNK].Y, TERRAIN.MAP.CHUNK, TERRAIN.MAP.CHUNK);

                    } else {
                        CHUNK.NOISE = noise;
                        CHUNK.X = x;
                        CHUNK.Y = y;
                        CHUNK.SIZE = TERRAIN.MAP.CHUNK;
                        CHUNK.RENDERED = false;

                        let isSet = false;
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.DEEP_WATER && isSet === false) {
                            CHUNK.BIOME = 'DEEP_WATER';
                            CHUNK.COLOR = '#005C99';
                            CHUNK.MOVE = false;
                            isSet = true;
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.SHALLOW_WATER && isSet === false) {
                            CHUNK.BIOME = 'SHALLOW_WATER';
                            CHUNK.COLOR = '#0099FF';
                            CHUNK.MOVE = false;
                            isSet = true;
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.SANDY_BEACH && isSet === false) {
                            CHUNK.BIOME = 'SANDY_BEACH';
                            CHUNK.COLOR = '#FFFF00';
                            CHUNK.MOVE = true;
                            isSet = true;
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.GRASS_PLAINS && isSet === false) {
                            CHUNK.BIOME = 'GRASS_PLAINS';
                            CHUNK.COLOR = '#00FF00';
                            CHUNK.MOVE = true;
                            isSet = true;
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.DENSE_FORREST && isSet === false) {
                            CHUNK.BIOME = 'DENSE_FORREST';
                            CHUNK.COLOR = '#00CC00';
                            CHUNK.MOVE = true;
                            isSet = true;
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.STONE_COBBLES && isSet === false) {
                            CHUNK.BIOME = 'STONE_COBBLES';
                            CHUNK.COLOR = '#595959';
                            CHUNK.MOVE = true;
                            isSet = true;
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.STEEP_MOUNTAIN && isSet === false) {
                            CHUNK.BIOME = 'STEEP_MOUNTAIN';
                            CHUNK.COLOR = '#999999';
                            CHUNK.MOVE = false;
                            isSet = true;
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.SNOW_PEAK && isSet === false) {
                            CHUNK.BIOME = 'SNOW_PEAK';
                            CHUNK.COLOR = '#FFFFFF';
                            CHUNK.MOVE = true;
                            isSet = true;
                        }

                        TERRAIN.MAP.DATA.push(CHUNK);

                        // Draw chunk graphics
                        canvas.fill(canvas.color(CHUNK.COLOR));
                        canvas.rect(CHUNK.X, CHUNK.Y, TERRAIN.MAP.CHUNK, TERRAIN.MAP.CHUNK);
                    }

                    // Identify closest chunk to spawn 
                    let currentX = (x - CHARACTER.ORIGIN.X) + TERRAIN.MAP.CHUNK;
                    let currentY = (y - CHARACTER.ORIGIN.Y) + TERRAIN.MAP.CHUNK;
                    let distance = Math.sqrt((currentX*currentX) + (currentY*currentY));
                    if ((distance <= CHARACTER.ORIGIN.DISTANCE) && (CHUNK.MOVE === true)) {
                        CHARACTER.ORIGIN.DISTANCE = distance;
                        CHARACTER.POS.X = x;
                        CHARACTER.POS.Y = y;
                    }



                }
            }

            canvas.fill(canvas.color('#DE73FF'));
            canvas.rect(CHARACTER.ORIGIN.X, CHARACTER.ORIGIN.Y, TERRAIN.MAP.CHUNK, TERRAIN.MAP.CHUNK);

            // Generate Loot and Quest Objectives

            // Draw player and generated sprites/buildings

            // Check possible moves or selected chunk

            // Update player movement

            canvas.fill(canvas.color('#800080'));
            canvas.rect(CHARACTER.POS.X, CHARACTER.POS.Y, CHARACTER.SIZE.WIDTH, CHARACTER.SIZE.HEIGHT);

            canvas.fill(canvas.color(CHARACTER.CURSOR.COLOR));
            canvas.rect(CHARACTER.CURSOR.X, CHARACTER.CURSOR.Y, TERRAIN.MAP.CHUNK, TERRAIN.MAP.CHUNK);
            // Store updated chunks
    
            // setTerrain(TERRAIN_STORAGE);
            
            // Empty Chunk Cache
            // TERRAIN.MAP.DATA = [];
        }

        canvas.keyPressed = () => {
            console.log(`${canvas.key}: ${canvas.keyCode}.`);
            /* UP DOWN LEFT RIGHT DIG PLACE INVENTORY TOGGLELEFT TOGGLERIGHT */
            const currentIndex = CHARACTER.POS.Y/TERRAIN.MAP.CHUNK * TERRAIN.MAP.COL + CHARACTER.POS.X/TERRAIN.MAP.CHUNK; /* rows * columns + col */

            if (canvas.key === 'ArrowLeft') {
                let newIndex = currentIndex - 1;

                console.log(`X: ${CHARACTER.POS.X/TERRAIN.MAP.CHUNK} Y: ${CHARACTER.POS.Y/TERRAIN.MAP.CHUNK} Current: ${TERRAIN.MAP.DATA[currentIndex].BIOME}, New: ${TERRAIN.MAP.DATA[newIndex].BIOME}`);

                if (TERRAIN.MAP.DATA[newIndex].MOVE === true) {
                    // CHARACTER.POS.X = CHARACTER.POS.X - TERRAIN.MAP.CHUNK;
                    CHARACTER.CURSOR.X = CHARACTER.POS.X - TERRAIN.MAP.CHUNK;
                }
            } else if (canvas.key === 'ArrowUp') {
                let newIndex = currentIndex - TERRAIN.MAP.COL;
                
                console.log(`X: ${CHARACTER.POS.X/TERRAIN.MAP.CHUNK} Y: ${CHARACTER.POS.Y/TERRAIN.MAP.CHUNK} Current: ${TERRAIN.MAP.DATA[currentIndex].BIOME}, New: ${TERRAIN.MAP.DATA[newIndex].BIOME}`);

                if (TERRAIN.MAP.DATA[newIndex].MOVE === true) {
                    // CHARACTER.POS.Y = CHARACTER.POS.Y - TERRAIN.MAP.CHUNK;
                    CHARACTER.CURSOR.Y = CHARACTER.POS.Y - TERRAIN.MAP.CHUNK;
                }
            } else if (canvas.key === 'ArrowRight') {
                let newIndex = currentIndex + 1;
                
                console.log(`X: ${CHARACTER.POS.X/TERRAIN.MAP.CHUNK} Y: ${CHARACTER.POS.Y/TERRAIN.MAP.CHUNK} Current: ${TERRAIN.MAP.DATA[currentIndex].BIOME}, New: ${TERRAIN.MAP.DATA[newIndex].BIOME}`);

                if (TERRAIN.MAP.DATA[newIndex].MOVE === true) {
                    // CHARACTER.POS.X = CHARACTER.POS.X + TERRAIN.MAP.CHUNK;
                    CHARACTER.CURSOR.X = CHARACTER.POS.X + TERRAIN.MAP.CHUNK;
                }
            } else if (canvas.key === 'ArrowDown') {
                let newIndex = currentIndex + TERRAIN.MAP.COL;
                
                console.log(`X: ${CHARACTER.POS.X/TERRAIN.MAP.CHUNK} Y: ${CHARACTER.POS.Y/TERRAIN.MAP.CHUNK} Current: ${TERRAIN.MAP.DATA[currentIndex].BIOME}, New: ${TERRAIN.MAP.DATA[newIndex].BIOME}`);

                if (TERRAIN.MAP.DATA[newIndex].MOVE === true) {
                    // CHARACTER.POS.Y = CHARACTER.POS.Y + TERRAIN.MAP.CHUNK;
                    CHARACTER.CURSOR.Y = CHARACTER.POS.Y + TERRAIN.MAP.CHUNK;
                }
            } else if (canvas.key === 'q') { /* DIG */

            } else if (canvas.key === 'w') { /* PLACE */

            } else if (canvas.key === 'e') { /* INVENTORY */

            } else if (canvas.key === ',') { /* < */
                TERRAIN.MAP.POINTER.X = TERRAIN.MAP.POINTER.X - TERRAIN.MAP.CHUNK;

            } else if (canvas.key === '.') { /* > */
                TERRAIN.MAP.POINTER.X = TERRAIN.MAP.POINTER.X + TERRAIN.MAP.CHUNK;

            }
        }


        
    }
}

function Viewport() {
    const canvasRef = useRef();

    /* Local Storage */
    const [terrain, setTerrain, removeTerrain] = useLocalStorage('terrain', null);

    useLayoutEffect(() => {
        const sketchInstance = new p5(Sketch(canvasRef.current)); /* p5(Sketch, canvasRef.current) */
        return () => sketchInstance.remove();
    }, []);

    return (
        <section aria-label='viewport' id='viewport-wrapper'>
            {/* <SectionTitle title={'Home'} /> */}
            {/* <h1>Success 200: Welcome Home.</h1> */}

            {/* Character Inventory Map Tabs */}

            <div id='canvas-wrapper' ref={canvasRef} />

            {/* D-Pad and Analogue Stick */}

            {/* <pre>{JSON.stringify(terrain, null, 2)}</pre> */}
            
        </section>
    );
}

export default Viewport;