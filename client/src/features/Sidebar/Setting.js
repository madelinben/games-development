import React from 'react';

import {IconContext} from 'react-icons';
import * as FaIcons from 'react-icons/fa';

// import Tooltip from '../Tooltip/Tooltip';
import './Sidebar.css';

function Setting(props) {
    return (
    <>
        <IconContext.Provider value={{color: 'var(--text-primary)'}}>
            <div aria-label='visual settings' className='setting-container'>
                <ul className='setting-items'>
                    <li><div className='horizontal-line'></div></li>
                    <div className='setting-items-container'>
                        <li className='setting-text' onClick={props.toggleTheme}>
                            <div className='setting-link'>
                                {props.theme === 'light' ? <FaIcons.FaMoon /> : <FaIcons.FaSun />}
                            </div>
                        </li>
                        <li className='setting-text' onClick={props.togglePalette}>
                            <div className='setting-link'>
                                <FaIcons.FaPalette /> {/* FaPaintBrush */}
                            </div>
                        </li>
                    </div>
                    <li><div className='vertical-line'></div></li>
                </ul>
            </div>
        </IconContext.Provider>
    </>
    );
}

export default Setting;