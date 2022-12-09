import { v4 as uuid } from 'uuid';

const projectData = [{
  id: 'online-chess',
  title: 'Online Chess App',
  desc: 'Frontend Chess application to connect two online users in real-time.',
  img: '',
  path: {
    demo: '/project/online-chess',
    src: '',
    git: 'https://github.com/madelinben/chat-app',
    readme: ''
  },
  tech: [{title: 'Node JS', src: 'https://nodejs.org/en/about/'}, {title: 'React', src: 'https://reactjs.org/'}, {title: 'SocketIO', src: 'https://socket.io/'}],
  tags: ['socket io', 'game', 'react', 'webpack', 'javascript', 'js', 'css',],
  fav: true
},{
  id: 'spotify-karaoke',
  title: 'Spotify Karaoke',
  desc: 'Playlist compiler that helps you discover new songs to sing along to on Spotify.',
  img: '',
  path: {
    demo: '/project/spotify-karaoke',
    src: '',
    git: '',
    readme: ''
  },
  tech: [{title: 'Node JS', src: 'https://nodejs.org/en/about/'}, {title: 'React', src: 'https://reactjs.org/'}],
  tags: ['music', 'karaoke', 'spotify', 'api', 'javascript', 'js', 'css',],
  fav: true
},{
  id: 'order-management-system',
  title: '6100COMP Order Management System',
  desc: 'University Final Year Project to demonstrate the efficiency of Big Data algorithms by developing an order management system in TypeScript and NodeJS.',
  img: '',
  path: {
    demo: '/project/order-management-system',
    src: 'client/build',
    git: 'https://github.com/madelinben/final-year-project',
    readme: ''
  },
  tech: [{title: 'Node JS', src: 'https://nodejs.org/en/about/'}, {title: 'React', src: 'https://reactjs.org/'}, {title: 'Material UI', src: 'https://mui.com/'}, {title: 'Tailwind', src: 'https://tailwindui.com/documentation'}, {title: 'Formik', src: 'https://formik.org/'}, {title: 'Google Directions API', src: 'https://developers.google.com/maps/documentation/directions/overview'}],
  tags: ['data', 'sorting', 'management', 'order', 'javascript', 'js', 'css',],
  fav: true
},{
  id: 'djikstras-pathfinder',
  title: 'Djikstras Pathfinder',
  desc: 'Interactive grid produces user generated obstacles for the algorithm to navigate.',
  img: '',
  path: {
    demo: '/project/djikstras-pathfinder',
    src: 'build',
    git: 'https://github.com/madelinben/dijkstras-pathfinder',
    readme: ''
  },
  tech: [{title: 'Node JS', src: 'https://nodejs.org/en/about/'}, {title: 'React', src: 'https://reactjs.org/'}, {title: 'CSS3', src: 'https://developer.mozilla.org/en-US/docs/Web/CSS'}, {title: 'JavaScript', src: 'https://www.javascript.com/'}],
  tags: ['visualisation', 'data', 'djikstra', 'path', 'algorithm', 'javascript', 'js', 'css',],
  fav: true
},{
  id: 'recipe-app',
  title: '5130COMP Recipe Web App',
  desc: 'Discovery tool developed in React Native to find recipes based on the contents of your fridge.',
  img: '',
  path: {
    demo: '/project/recipe-app',
    src: 'build',
    git: '',
    readme: ''
  },
  tech: [{title: 'PHP7', src: 'https://www.php.net/'}, {title: 'Bootstrap5', src: 'https://getbootstrap.com/'}, {title: 'JQuery', src: 'https://jquery.com/'}, {title: 'AJAX', src: 'https://api.jquery.com/jquery.ajax/'}, {title: 'PhpMyAdmin', src: 'https://www.phpmyadmin.net/'}, {title: 'MySQL', src: 'https://www.mysql.com/'}],
  tags: ['javascript', 'js', 'css', 'tailwind', 'recipe'],
  fav: false
},{
    id: 'visual-algorithms',
    title: 'Visual Algorithms',
    desc: 'An animated visualisation of data structures and advanced sorting algorithms.',
    img: '',
    path: {
      demo: '/project/visual-algorithms',
      src: 'index.html',
      git: 'https://github.com/madelinben/visual-algorithms',
      readme: 'https://raw.githubusercontent.com/madelinben/visual-algorithms/c97805146c37d5671b610970ed215c50a8eb2a28/README.md'
    },
    tech: [{title: 'HTML5', src: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'}, {title: 'CSS3', src: 'https://developer.mozilla.org/en-US/docs/Web/CSS'}, {title: 'JavaScript', src: 'https://www.javascript.com/'}],
    tags: ['visualisation', 'data', 'sorting', 'algorithm', 'javascript', 'js', 'css'],
    fav: true
},{
  id: '4122COMP',
  title: '4122COMP Game Recommendation System',
  desc: 'A game recommendation system practising server side rendering, AJAX and jQuery requests.',
  img: '',
  path: {
    demo: '/project/game-recommendation',
    src: 'Coursework/content/index.php',
    git: '',
    readme: ''
  },
  tech: [{title: 'HTML5', src: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'}, {title: 'CSS3', src: 'https://developer.mozilla.org/en-US/docs/Web/CSS'}, {title: 'PHP7', src: 'https://www.php.net/'}, {title: 'Bootstrap5', src: 'https://getbootstrap.com/'}, {title: 'JQuery', src: 'https://jquery.com/'}, {title: 'AJAX', src: 'https://api.jquery.com/jquery.ajax/'}, {title: 'PhpMyAdmin', src: 'https://www.phpmyadmin.net/'}, {title: 'MySQL', src: 'https://www.mysql.com/'}],
  tags: ['php', 'request', 'ajax', 'content', 'javascript', 'js', 'css'],
  fav: false
},{
  id: 'arcade-canvas',
  name: 'Canvas Arcade',
  desc: 'Responsive web application with account and rankings system, showcasing a collection of canvas mini-games.',
  img: '',
  path: {
    demo: '/project/arcade-canvas',
    src: 'pages/index.php',
    git: 'https://github.com/madelinben/arcade-canvas',
    readme: 'https://raw.githubusercontent.com/madelinben/arcade-canvas/feature/project-feedback/README.md'
  },
  tech: [{title: 'HTML5', src: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'}, {title: 'CSS3', src: 'https://developer.mozilla.org/en-US/docs/Web/CSS'}, {title: 'JavaScript', src: 'https://www.javascript.com/'}, {title: 'Canvas API', src: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API'}, {title: 'p5', src: 'https://p5js.org/'}, {title: 'PhpMyAdmin', src: 'https://www.phpmyadmin.net/'}, {title: 'MySQL', src: 'https://www.mysql.com/'}],
  tags: ['canvas', 'js', 'arcade', 'game'],
  fav: false
}];

export default projectData;