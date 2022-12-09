import React from 'react';

import './Tooltip.css';

function Tooltip(props) {
    return (
    <>
        <div className={`tooltip-wrapper ${props.direction}`} /* style={{display: props.isVisible ? 'block' : 'none'}} */>
            <p className='tooltip-text'>{props.text}</p>
        </div>
    </>
    );
}

export default Tooltip;