# Computer Games Development



# Starting Your Adventure!

* Clone this repo into a directory on your computer. `git clone https://github.com/madelinben/games-development.git`

* Navigate to the backend directory that is hosting the application through serve. `cd ./server/`
  
* Run the application locally executing the script: `npm run dev`



# Documentation 



# Repository Setup

* Install the necessary libraries to run the following scripts in the command line. 

* `npm install -g typescript`
* `npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin`
* `npm init @eslint/config`

* `npm install -g create-react-app`
  
* `npm install -g express-generator-typescript`

* If you are experiencing any issues with this, try clearing your npm cache, updating, and attempt again.

* `npm cache clean --force`
  
* `npm install -g npm@latest --force`

## Create-React-App

* Run the npx command below to establish an organised and efficient application for React development. `npx create-react-app client --template redux-typescript`

* Convert existing project to utilise typescript capabilities, altering jsx filenames to tsx. `npm install --save typescript @types/node @types/react @types/react-dom @types/jest`

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

* `npm start` Runs the app in your browser under development mode at [http://localhost:3000](http://localhost:3000). 

* `npm run build` Builds and optimizes the app for production to the `build` folder. 

## Express Toolkit

* Run the npx command to initialise an organised and secure api structure. `npx express-generator-typescript server`

* Enable Cross Script Communications between client and server ports. 
* `npm install --save cors`
* `const cors = require('cors');`
* `app.use(cors());`
  
* Configure Development script to run client and server concurrently. 
* `"server": "nodemon index.ts",`
* `"client": "npm run start --prefix ../client",`
* `"dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",`

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

* `npm run dev` Run the server in development mode.

* `npm run lint` Check for linting errors. 
  
* `npm test -- --testFile="name of test file" (i.e. --testFile=Users).` Run a unit-test.

* `npm run build` Build the project for production.

* `npm start` Run the production build (Must be built first).



# Canvas Environment

## Animation Library

Graphical and Interactive experiences on the webpage are processed through the [p5.js](https://p5js.org/) library. 

* Install the ported package for react to our client. `npm i --save react-p5`

## Viewport







# Character Generation

## Precedural Sprite Design

Sprites are randomly generated based on several constraints that dictate how pixels are filled in. 

More detail about this topic can be found at [Dave Gollinger's Article](http://web.archive.org/web/20080228054410/http://www.davebollinger.com/works/pixelspaceships/).

Weapons/Tools and some additional Accessories were collected using the [Univeral LPC Spritesheet](https://github.com/sanderfrenken/Universal-LPC-Spritesheet-Character-Generator). [Try it out here](https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/#?body=Body_color_light&head=Human_male_light).







# Terrain Generation

## Perlin Noise Algorithm

## Biome Diversity

## Precedurally Generated Structures









## Licensing

According to the rules of the LPC all art submissions were dual licensed under both GNU GPL 3.0 and CC-BY-SA 3.0. These art submissions are considered all images present in the directory `spritesheets` and it's subdirectories. Further work produced in this repository is licensed under the same terms.

CC-BY-SA 3.0:
 - http://creativecommons.org/licenses/by-sa/3.0/
 - See the file: [cc-by-sa-3.0](cc-by-sa-3_0.txt)

GNU GPL 3.0:
 - http://www.gnu.org/licenses/gpl-3.0.html
 - See the file: [gpl-3.0](gpl-3_0.txt)