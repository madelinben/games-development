import React from 'react';
import {NavLink} from 'react-router-dom';
import {IconContext} from 'react-icons';

import navData from '../../assets/data/nav';

import Tooltip from '../Tooltip/Tooltip';
import './Sidebar.css';

function Navigation() {
    return (
    <>
        <IconContext.Provider value={{color: 'var(--text-primary)'}}>
            <nav aria-label='navigation links' className='nav-container'>
                <ul className='nav-items'>
                    <li><div className='vertical-line'></div></li>
                    {navData && navData.map((item, index) => {
                        return (
                            <li key={index} className='nav-text'>
                                <NavLink to={item.path} className='nav-link' activeClassName='active'>
                                    <Tooltip text={item.title} direction='left' /* isVisible={true} */ />
                                    {item.icon}
                                    {/* <span>{item.title}</span> */}
                                {/* <Tooltip text={item.title} direction={'left'} isVisible={this.state.index === (index + 1) ? true : false} /> */}
                                </NavLink>
                            </li>
                        )
                    })}
                    <li><div className='horizontal-line'></div></li>
                </ul>
            </nav>
        </IconContext.Provider>
    </>
    );
}

export default Navigation;