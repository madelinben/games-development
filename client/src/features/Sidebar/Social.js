import React from 'react';

import {IconContext} from 'react-icons';

import contactData from '../../assets/data/contact';

// import Tooltip from '../Tooltip/Tooltip';
import './Sidebar.css';

function Social() {
    return (
    <>
        <IconContext.Provider value={{color: 'var(--text-primary)'}}>
            <div aria-label='social links' className='social-container'>
                <ul className='social-items'>
                    <li><div className='horizontal-line'></div></li>
                    {contactData && contactData.map((item, index) => {
                        return (
                            <li key={index} className='social-text'>
                                <a href={item.src} className='social-link' target='_blank' rel='noopener noreferrer'>
                                    {item.icon}
                                    <span>{item.title}</span>
                                {/* <Tooltip text={item.title} direction={'right'} isVisible={this.state.index === (index + 1) ? true : false} /> */}
                                </a>
                            </li>
                        )
                    })}
                    <li><div className='vertical-line'></div></li>
                </ul>
            </div>
        </IconContext.Provider>
    </>
    );
}

export default Social;