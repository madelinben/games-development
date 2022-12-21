/* CANVAS CONTEXT */

// const CONTAINER = document.getElementById('viewport-wrapper');
// const ctx = canvas.getContext('2d');

let INIT = true;

/* IMPORT DATA */

// TODO - IMPORT LOCALSTORAGE SAVE DATA [TERRAIN, CHARACTER, INVENTORY]

/* GLOBAL DATA */

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
    SEED: 99,
    ELEVATION: TERRAIN_ELEVATION,
    CONFIG: {
        TYPE: 'perlin', /* simplex */
        AMPLITUDE: 0.01,
        // AMPLITUDE_COEFFICIENT: 0.5,
        FREQUENCY: 1,
        // FREQUENCY_COEFFICIENT: 0.5,
        GENERATE_SEED: true,
        GENERATE_STRUCTURES: false,
        ENABLE_SHADOW: false
    },
    CHUNK: {
        SIZE: 10,
    },
    BLOCK: {
        SIZE: 1
    },
    MAP: {
        DATA: [],
        POINTER: {
            X: 0,
            Y: 0
        },
        ORIGIN: {
            X: 0,
            Y: 0,
            DISTANCE: Infinity
        },
        WIDTH: null,
        HEIGHT: null,
        TOTAL_COLS: null,
        TOTAL_ROWS: null
    }
}

const CHARACTER = {
    NAME: 'MadBenitezXD',
    /* SPRITE: 'sprite-001', */
    SPAWN: {
        X: 0,
        Y: 0,
        DISTANCE: Infinity
    },
    POS: {
        X: 0,
        XSPEED: TERRAIN.CHUNK.SIZE,
        Y: 0,
        YSPEED: TERRAIN.CHUNK.SIZE,
    },
    CURSOR: {
        X: 0,
        Y: 0,
        COLOR: '#DE73FF'
    },
    SIZE: {
        HEIGHT: TERRAIN.CHUNK.SIZE,
        WIDTH: TERRAIN.CHUNK.SIZE
    },
    // TODO - XP LEVELLING
    /* LEVEL: {
        RANK: 0,
        XP: 0,
        PROMO: 10,
    },
    // TODO - MOB COMBAT SYSTEM
    COMBAT: {
        HEALTH: 50,
        ARMOUR: 20,
        ATTACK: 5,
        DEFENCE: 3,
        MAGIC: 0,
    },
    // CHARACTER ABILITIES AND PROGRESSION
    SKILL: {
        SPEECH: 5,
        STEALTH: 0,
        LOCKPICKING: 1,
        ENCHANTING: 0,
    } */
}

/* INITIAL SETUP */

function setup() {
    createCanvas(floor(windowWidth/TERRAIN.CHUNK.SIZE)*TERRAIN.CHUNK.SIZE, floor(windowHeight/TERRAIN.CHUNK.SIZE)*TERRAIN.CHUNK.SIZE); /* WEBGL */

    frameRate(1);

    // angleMode(DEGREES);
    // rectMode(CENTER);

    noStroke();

    TERRAIN.MAP.WIDTH = width;
    TERRAIN.MAP.HEIGHT = height;

    TERRAIN.MAP.TOTAL_COLS = floor(width/TERRAIN.CHUNK.SIZE);
    TERRAIN.MAP.TOTAL_ROWS = floor(height/TERRAIN.CHUNK.SIZE);

    TERRAIN.MAP.ORIGIN.X = TERRAIN.CHUNK.SIZE * floor(TERRAIN.MAP.TOTAL_COLS/2);
    TERRAIN.MAP.ORIGIN.Y = TERRAIN.CHUNK.SIZE * floor(TERRAIN.MAP.TOTAL_ROWS/2);
    CHARACTER.SPAWN.X = TERRAIN.MAP.ORIGIN.X;
    CHARACTER.SPAWN.Y = TERRAIN.MAP.ORIGIN.Y;
    CHARACTER.POS.X = TERRAIN.MAP.ORIGIN.X;
    CHARACTER.POS.Y = TERRAIN.MAP.ORIGIN.Y;
    CHARACTER.CURSOR.X = TERRAIN.MAP.ORIGIN.X + TERRAIN.CHUNK.SIZE;
    CHARACTER.CURSOR.Y = TERRAIN.MAP.ORIGIN.Y + TERRAIN.CHUNK.SIZE;

    if (TERRAIN.CONFIG.GENERATE_SEED === true) {
        TERRAIN.SEED = floor(random(0, 999999));
    } else {
        // TODO - SEED INPUT 
        TERRAIN.SEED = 0;
    }

    // TODO - VALIDATE SEED INPUT AND ISOLATE INTO FUNCTION

    noiseSeed(TERRAIN.SEED);

    background('#FFFFFF');
}

function windowResized() {
    resizeCanvas(floor(windowWidth/TERRAIN.CHUNK.SIZE)*TERRAIN.CHUNK.SIZE, floor(windowHeight/TERRAIN.CHUNK.SIZE)*TERRAIN.CHUNK.SIZE); // WEBGL
}

/* GRAPHIC LOOP */

function draw() {
    let noiseValue;
    let SELECTED_CHUNK, SELECTED_BLOCK;

    clear();

    SELECTED_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => {chunk.X === Math.floor(CHARACTER.POS.X/5)*5 && chunk.Y === Math.floor(CHARACTER.POS.Y/5)*5});

    let GRAPHIC = {
        STEP: TERRAIN.CHUNK.SIZE,
        // TODO - INITIALISE MAP DATA AND GENERATED BIOME STRUCTURE
        POINTER: {
            X: TERRAIN.MAP.POINTER.X,
            Y: TERRAIN.MAP.POINTER.Y,
        },
        PIXEL: TERRAIN.CHUNK.SIZE
    } 
    
    // TODO - ADJUST CAMERA TO CENTER BASED ON SELECTED CHUNK AND CHARACTER POSITION
    if (SELECTED_CHUNK !== -1 && INIT === false) {
        GRAPHIC.STEP = TERRAIN.BLOCK.SIZE;
        GRAPHIC.POINTER.X = TERRAIN.MAP.DATA[SELECTED_CHUNK].X;
        GRAPHIC.POINTER.Y = TERRAIN.MAP.DATA[SELECTED_CHUNK].Y;
    } else {
        console.log(`Could not identify current chunk.\nIndex: ${SELECTED_CHUNK}\nSpawn: ${CHARACTER.POS.X} ${CHARACTER.POS.Y}`);
    }

    for (let x=GRAPHIC.POINTER.X; x<width; x+=GRAPHIC.STEP) {
        for (let y=GRAPHIC.POINTER.Y; y<height; y+=GRAPHIC.STEP) {
            noiseValue = noise(TERRAIN.CONFIG.AMPLITUDE*x, TERRAIN.CONFIG.AMPLITUDE*y);

            let CHUNK = {
                DATA: [],
                X: x,
                Y: y,
                NOISE: noiseValue,
                BIOME: 'VOID',
                COLOR: '#FFFFFF',
                // SIZE: TERRAIN.CHUNK.SIZE,
                MOVE: false,
                STRUCTURE: null
            }

            // console.log(noiseValue);

            // TODO - IDENTIFY VISIBLE CHUNKS
            SELECTED_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => {chunk.X === x && chunk.Y === y});
            
            if (SELECTED_CHUNK !== -1) {
                // TODO - DETERMINE WORLD LEVEL AND ISOLATE FUNCTIONALITY
                // TODO - ANIMATE SAVED CHUNK
                if (INIT === true) {
                    fill(color(TERRAIN.MAP.DATA[SELECTED_CHUNK].COLOR));
                    // TODO - ESTABLISH CONSISTENT GRAPHIC PIXEL DENSITY
                    rect(TERRAIN.MAP.DATA[SELECTED_CHUNK].X, TERRAIN.MAP.DATA[SELECTED_CHUNK].Y, GRAPHIC.STEP, GRAPHIC.STEP);
                // TODO - ANIMATE SAVED BLOCK
                } else {
                    SELECTED_BLOCK = TERRAIN.MAP.DATA[SELECTED_CHUNK].findIndex((block) => {block.X === x && block.Y === y});

                    // TODO - IDENTIFY SAVED CHUNK BLOCKS
                    if (SELECTED_BLOCK !== -1) {
                        // TODO - ADJUST MAP COORDINATES TO APPROPRIATE VECTOR AND SCALE
                        fill(color(TERRAIN.MAP.DATA[SELECTED_CHUNK].DATA[SELECTED_BLOCK].COLOR));
                        rect((TERRAIN.MAP.DATA[SELECTED_CHUNK].DATA[SELECTED_BLOCK].X - GRAPHIC.POINTER.X) * GRAPHIC.PIXEL, (TERRAIN.MAP.DATA[SELECTED_CHUNK].DATA[SELECTED_BLOCK].Y - GRAPHIC.POINTER.Y) * GRAPHIC.PIXEL, GRAPHIC.PIXEL, GRAPHIC.PIXEL);
                    } else {
                        // TODO - GENERATE BLOCK

                        let isSet = false;
                        let isStructure = random();
                        // TODO - IDENTIFY MOB SPAWN OR STRUCTURE SPAWN ON CHUNK GENERATION
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.DEEP_WATER && isSet === false) {
                            CHUNK.BIOME = 'DEEP_WATER';
                            CHUNK.COLOR = '#005C99';
                            CHUNK.MOVE = false;
                            isSet = true;
                            if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'SHIP_WRECK';
                                CHUNK.COLOR = '#002E4D';
                            }
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.SHALLOW_WATER && isSet === false) {
                            CHUNK.BIOME = 'SHALLOW_WATER';
                            CHUNK.COLOR = '#0099FF';
                            CHUNK.MOVE = false;
                            isSet = true;
                            if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'CORAL_REEF';
                                CHUNK.COLOR = '#99005C';
                            }
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.SANDY_BEACH && isSet === false) {
                            CHUNK.BIOME = 'SANDY_BEACH';
                            CHUNK.COLOR = '#FFFF00';
                            CHUNK.MOVE = true;
                            isSet = true;
                            if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'TREASURE_CHEST';
                                CHUNK.COLOR = '#E6CF00';
                            }
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.GRASS_PLAINS && isSet === false) {
                            CHUNK.BIOME = 'GRASS_PLAINS';
                            CHUNK.COLOR = '#00FF00';
                            CHUNK.MOVE = true;
                            isSet = true;
                            if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'CASTLE';
                                CHUNK.COLOR = '#737373';
                            } else if (isStructure < 0.03) {
                                CHUNK.STRUCTURE = 'TOWN';
                                CHUNK.COLOR = '#A5682A';
                            }
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.DENSE_FORREST && isSet === false) {
                            CHUNK.BIOME = 'DENSE_FORREST';
                            CHUNK.COLOR = '#00CC00';
                            CHUNK.MOVE = true;
                            isSet = true;
                            if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'WITCH_HUT';
                                CHUNK.COLOR = '#A52AA5';
                            }
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.STONE_COBBLES && isSet === false) {
                            CHUNK.BIOME = 'STONE_COBBLES';
                            CHUNK.COLOR = '#595959';
                            CHUNK.MOVE = true;
                            isSet = true;
                            if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'ANCIENT_FOSSIL';
                                CHUNK.COLOR = '#333333';
                            }
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.STEEP_MOUNTAIN && isSet === false) {
                            CHUNK.BIOME = 'STEEP_MOUNTAIN';
                            CHUNK.COLOR = '#999999';
                            CHUNK.MOVE = false;
                            isSet = true;
                            if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'CAVE_TROLL';
                                CHUNK.COLOR = '#4D4D4D';
                            }
                        }
                        if (CHUNK.NOISE < TERRAIN.ELEVATION.SNOW_PEAK && isSet === false) {
                            CHUNK.BIOME = 'SNOW_PEAK';
                            CHUNK.COLOR = '#FFFFFF';
                            CHUNK.MOVE = true;
                            isSet = true;
                            /* if (isStructure < 0.01) {
                                CHUNK.STRUCTURE = 'HUNTING_LODGE';
                                CHUNK.COLOR = '#E6E6E6';
                            } */
                        }

                        // TODO - SHADE BLOCK COLOR BASED ON RELATIVE ELEVATION
                        /* let ELEVATION_LIMIT = Object.keys(TERRAIN.ELEVATION);
                        let ELEVATION_LOWER = ELEVATION_LIMIT.indexOf(CHUNK.BIOME);
                        let ELEVATION_UPPER = ELEVATION_LIMIT.indexOf(CHUNK.BIOME + 1) || 1;
                        // TODO - RELATIVE ELEVATION CORRELATES TO OPACITY VALUE
                        let SHADE = color(CHUNK.COLOR, map(CHUNK.NOISE, ELEVATION_LOWER, ELEVATION_UPPER, 1, 0.5)); */

                        TERRAIN.MAP.DATA[SELECTED_CHUNK].DATA.push(CHUNK);

                        // TODO - DRAW SELECTED CHUNK OR BLOCK
                        fill(CHUNK.COLOR);
                        // TODO - ESTABLISH CONSISTENT GRAPHIC PIXEL DENSITY
                        // TODO - ADJUST MAP COORDINATES TO APPROPRIATE VECTOR AND SCALE
                        rect((CHUNK.X - GRAPHIC.POINTER.X) * GRAPHIC.PIXEL, (CHUNK.Y - GRAPHIC.POINTER.Y) * GRAPHIC.PIXEL, GRAPHIC.PIXEL, GRAPHIC.PIXEL);
                    }
                    


                }

            } else {
                let isSet = false;

                // TODO - DETERMINE WORLD LEVEL AND ISOLATE FUNCTIONALITY
                // TODO - GENERATE CHUNK AND STRUCTURES
                /* if (INIT) { */
                let isStructure = 1;
                if (TERRAIN.CONFIG.GENERATE_STRUCTURES === true) {
                    isStructure = random();
                } 
                if (CHUNK.NOISE < TERRAIN.ELEVATION.DEEP_WATER && isSet === false) {
                    CHUNK.BIOME = 'DEEP_WATER';
                    CHUNK.COLOR = '#005C99';
                    CHUNK.MOVE = false;
                    isSet = true;
                    if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'SHIP_WRECK';
                        CHUNK.COLOR = '#002E4D';
                    }
                }
                if (CHUNK.NOISE < TERRAIN.ELEVATION.SHALLOW_WATER && isSet === false) {
                    CHUNK.BIOME = 'SHALLOW_WATER';
                    CHUNK.COLOR = '#0099FF';
                    CHUNK.MOVE = false;
                    isSet = true;
                    if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'CORAL_REEF';
                        CHUNK.COLOR = '#99005C';
                    }
                }
                if (CHUNK.NOISE < TERRAIN.ELEVATION.SANDY_BEACH && isSet === false) {
                    CHUNK.BIOME = 'SANDY_BEACH';
                    CHUNK.COLOR = '#FFFF00';
                    CHUNK.MOVE = true;
                    isSet = true;
                    if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'TREASURE_CHEST';
                        CHUNK.COLOR = '#E6CF00';
                    }
                }
                if (CHUNK.NOISE < TERRAIN.ELEVATION.GRASS_PLAINS && isSet === false) {
                    CHUNK.BIOME = 'GRASS_PLAINS';
                    CHUNK.COLOR = '#00FF00';
                    CHUNK.MOVE = true;
                    isSet = true;
                    if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'CASTLE';
                        CHUNK.COLOR = '#737373';
                    } else if (isStructure < 0.03) {
                        CHUNK.STRUCTURE = 'TOWN';
                        CHUNK.COLOR = '#A5682A';
                    }
                }
                if (CHUNK.NOISE < TERRAIN.ELEVATION.DENSE_FORREST && isSet === false) {
                    CHUNK.BIOME = 'DENSE_FORREST';
                    CHUNK.COLOR = '#00CC00';
                    CHUNK.MOVE = true;
                    isSet = true;
                    if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'WITCH_HUT';
                        CHUNK.COLOR = '#A52AA5';
                    }
                }
                if (CHUNK.NOISE < TERRAIN.ELEVATION.STONE_COBBLES && isSet === false) {
                    CHUNK.BIOME = 'STONE_COBBLES';
                    CHUNK.COLOR = '#595959';
                    CHUNK.MOVE = true;
                    isSet = true;
                    if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'ANCIENT_FOSSIL';
                        CHUNK.COLOR = '#333333';
                    }
                }
                if (CHUNK.NOISE < TERRAIN.ELEVATION.STEEP_MOUNTAIN && isSet === false) {
                    CHUNK.BIOME = 'STEEP_MOUNTAIN';
                    CHUNK.COLOR = '#999999';
                    CHUNK.MOVE = false;
                    isSet = true;
                    if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'CAVE_TROLL';
                        CHUNK.COLOR = '#4D4D4D';
                    }
                }
                if (CHUNK.NOISE < TERRAIN.ELEVATION.SNOW_PEAK && isSet === false) {
                    CHUNK.BIOME = 'SNOW_PEAK';
                    CHUNK.COLOR = '#FFFFFF';
                    CHUNK.MOVE = true;
                    isSet = true;
                    /* if (isStructure < 0.01) {
                        CHUNK.STRUCTURE = 'HUNTING_LODGE';
                        CHUNK.COLOR = '#E6E6E6';
                    } */
                }

                TERRAIN.MAP.DATA.push(CHUNK);

                if (INIT === true) {
                    // TODO - IDENTIFY CHARACTER SPAWN FROM MAP ORIGIN
                    let currentX = (x - TERRAIN.MAP.ORIGIN.X) + TERRAIN.CHUNK.SIZE;
                    let currentY = (y - TERRAIN.MAP.ORIGIN.Y) + TERRAIN.CHUNK.SIZE;
                    let distance = Math.sqrt((currentX*currentX) + (currentY*currentY));
                    if ((distance <= CHARACTER.SPAWN.DISTANCE) && (CHUNK.MOVE === true)) {
                        CHARACTER.SPAWN.DISTANCE = distance;
                        CHARACTER.SPAWN.X = x;
                        CHARACTER.SPAWN.Y = y;
                    }
                }

                // TODO - DRAW SELECTED CHUNK OR BLOCK
                fill(CHUNK.COLOR);
                // TODO - ESTABLISH CONSISTENT GRAPHIC PIXEL DENSITY
                rect(CHUNK.X, CHUNK.Y, GRAPHIC.STEP, GRAPHIC.STEP);

                /* } else {
                    // TODO - GENERATE CHUNK BLOCKS AND STRUCTURE

                }

                // TODO - DRAW SELECTED CHUNK OR BLOCK
                fill(CHUNK.COLOR);
                // TODO - ESTABLISH CONSISTENT GRAPHIC PIXEL DENSITY
                rect(CHUNK.X, CHUNK.Y, GRAPHIC.STEP, GRAPHIC.STEP); */
            }
        }
    }

    // TODO - INIT SET CHARACTER SPAWN
    if (INIT === true) {
        CHARACTER.POS.X = CHARACTER.SPAWN.X;
        CHARACTER.POS.Y = CHARACTER.SPAWN.Y;
        CHARACTER.CURSOR.X = CHARACTER.POS.X + TERRAIN.CHUNK.SIZE;
        CHARACTER.CURSOR.Y = CHARACTER.POS.Y;
    }

    // TODO - ANIMATE MAP ORIGIN
    fill(color('#DE73FF'));
    rect(TERRAIN.MAP.ORIGIN.X, TERRAIN.MAP.ORIGIN.Y, TERRAIN.CHUNK.SIZE, TERRAIN.CHUNK.SIZE);

    // TODO - ANIMATE CHARACTER SPAWN
    fill(color('#DE73FF'));
    rect(CHARACTER.SPAWN.X, CHARACTER.SPAWN.Y, TERRAIN.CHUNK.SIZE, TERRAIN.CHUNK.SIZE);

    // TODO - ANIMATE CHARACTER POSITION
    fill(color('#800080'));
    rect(CHARACTER.POS.X, CHARACTER.POS.Y, CHARACTER.SIZE.WIDTH, CHARACTER.SIZE.HEIGHT);

    // TODO - ANIMATE CHARACTER CURSOR
    fill(color(CHARACTER.CURSOR.COLOR));
    rect(CHARACTER.CURSOR.X, CHARACTER.CURSOR.Y, TERRAIN.CHUNK.SIZE, TERRAIN.CHUNK.SIZE);

    // TODO - ALTER WORLD LEVEL
    INIT = false;

    // Generate Loot and Quest Objectives

    // Draw player and generated sprites/buildings

    // Check possible moves or selected chunk

    // Update player movement


    // Store updated chunks

    // setTerrain(TERRAIN_STORAGE);
    
    // Empty Chunk Cache
    // TERRAIN.MAP.DATA = [];
}



/* Event listeners and user actions */

/* function keyPressed() {
  console.log(`${key}: ${keyCode}.`);

  const CURRENT_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => chunk.X === CHARACTER.POS.X && chunk.Y === CHARACTER.POS.Y);
  if (CURRENT_CHUNK !== -1) {
      console.log(`CHHARACTER X:${TERRAIN.MAP.DATA[CURRENT_CHUNK].X} Y:${TERRAIN.MAP.DATA[CURRENT_CHUNK].Y}`);

      if (canvas.key === 'ArrowUp') {
          const CURSOR_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => chunk.X === CHARACTER.POS.X && chunk.Y === (CHARACTER.POS.Y - TERRAIN.MAP.CHUNK));
          if (CURSOR_CHUNK !== -1) {
              if (TERRAIN.MAP.DATA[CURRENT_CHUNK].MOVE === true) {
                  CHARACTER.CURSOR.Y = CHARACTER.POS.Y - TERRAIN.MAP.CHUNK;
                  console.log(`CURSOR X:${CHARACTER.CURSOR.X} Y:${CHARACTER.CURSOR.Y}`);
              } else {
                  console.log(`Cannot move to this chunk.`);
              }
          } else {
              console.log(`Could not identify cursor chunk.`);
          }
      } else if (canvas.key === 'ArrowDown') {
          const CURSOR_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => chunk.X === CHARACTER.POS.X && chunk.Y === (CHARACTER.POS.Y + TERRAIN.MAP.CHUNK));
          if (CURSOR_CHUNK !== -1) {
              if (TERRAIN.MAP.DATA[CURRENT_CHUNK].MOVE === true) {
                  CHARACTER.CURSOR.Y = CHARACTER.POS.Y + TERRAIN.MAP.CHUNK;
                  console.log(`CURSOR X:${CHARACTER.CURSOR.X} Y:${CHARACTER.CURSOR.Y}`);
              } else {
                  console.log(`Cannot move to this chunk.`);
              }
          } else {
              console.log(`Could not identify cursor chunk.`);
          }
      } else if (canvas.key === 'ArrowLeft') {
          const CURSOR_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => chunk.X === (CHARACTER.POS.X - TERRAIN.MAP.CHUNK) && chunk.Y === CHARACTER.POS.Y);
          if (CURSOR_CHUNK !== -1) {
              if (TERRAIN.MAP.DATA[CURRENT_CHUNK].MOVE === true) {
                  CHARACTER.CURSOR.X = CHARACTER.POS.X - TERRAIN.MAP.CHUNK;
                  console.log(`CURSOR X:${CHARACTER.CURSOR.X} Y:${CHARACTER.CURSOR.Y}`);
              } else {
                  console.log(`Cannot move to this chunk.`);
              }
          } else {
              console.log(`Could not identify cursor chunk.`);
          }
      } else if (canvas.key === 'ArrowRight') {
          const CURSOR_CHUNK = TERRAIN.MAP.DATA.findIndex((chunk) => chunk.X === (CHARACTER.POS.X + TERRAIN.MAP.CHUNK) && chunk.Y === CHARACTER.POS.Y);
          if (CURSOR_CHUNK !== -1) {
              if (TERRAIN.MAP.DATA[CURRENT_CHUNK].MOVE === true) {
                  CHARACTER.CURSOR.X = CHARACTER.POS.X + TERRAIN.MAP.CHUNK;
                  console.log(`CURSOR X:${CHARACTER.CURSOR.X} Y:${CHARACTER.CURSOR.Y}`);
              } else {
                  console.log(`Cannot move to this chunk.`);
              }
          } else {
              console.log(`Could not identify cursor chunk.`);
          }
      } else if (canvas.key === 'q') { // DIG

      } else if (canvas.key === 'w') { // PLACE

      } else if (canvas.key === 'e') { // INVENTORY

      } else if (canvas.key === ',') { // <
          TERRAIN.MAP.POINTER.X = TERRAIN.MAP.POINTER.X - TERRAIN.MAP.CHUNK;

      } else if (canvas.key === '.') { // >
          TERRAIN.MAP.POINTER.X = TERRAIN.MAP.POINTER.X + TERRAIN.MAP.CHUNK;

      }



  } else {
      console.log(`Could not identify current chunk.`);
  } 
} */



/* Feature isolation and util/helper operations */

