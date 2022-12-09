import React from 'react';
import './SectionTitle.css';

function SectionTitle(props) {
    return (
    <>
        <div className='section-title'>
            <div className='horizontal-line'></div>
            <div className='section-title-text'>
                {props.title}
            </div>
            <div className='horizontal-line'></div>
        </div>
    </>
    );
}

export default SectionTitle;