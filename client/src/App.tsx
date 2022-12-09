import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

// Custom Hooks
import {useLocalStorage} from './hooks/useStorage/useStorage';

// Redux Reducers
import { Counter } from './features/counter/Counter';

// Global Styles
import './assets/css/App.css';
import './assets/css/Palette.css';
import './assets/css/Scrollbar.css';
import './assets/css/Layout.css';
import './assets/css/Form.css';

// Animation
import './assets/css/Border.css';
import './assets/css/Bubble.css';

// Components
import Setting from './components/Sidebar/Setting';
import Navigation from './components/Sidebar/Navigation';
import Social from './components/Sidebar/Social';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Routes
import Home from './routes/Home/Home';
import NotFound from './routes/NotFound/NotFound';

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [paletteIndex, setPaletteIndex] = useLocalStorage('palette', 0);
  const paletteArray = ['sunset', 'purple', 'moonlight', 'green', 'grey'];
  
  const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
  };
  
  const togglePalette = () => {
      let newPalette = paletteIndex + 1;
      if (newPalette > (paletteArray.length - 1)) {
          newPalette = 0;
      }
      setPaletteIndex(newPalette);
  };

  return (
    <BrowserRouter>
        <div id='layout-wrapper' data-theme={theme} data-palette={paletteArray[paletteIndex]}>                
            <header id='header-wrapper'>
                <a id='skip-nav' href='#content-wrapper'>skip navigation</a>
                {/* <div id='setting-wrapper'><Setting theme={theme} toggleTheme={toggleTheme} togglePalette={togglePalette} /></div> */}
                {/* <div id='nav-wrapper'><Navigation /></div> */}
                {/* <div id='social-wrapper'><Social /></div> */}
                {/* <div id='scroll-wrapper'><ScrollToTop /></div> */}
            </header>

            <div id='content-wrapper'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

            <footer id='footer-wrapper'>
                <p>&copy; Benjamin Madelin {new Date().getFullYear()}</p>
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;