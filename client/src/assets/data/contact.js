import React from 'react'
import * as FaIcons from 'react-icons/fa';

const contactData = [
    {
        'title': 'Email',
        'src': 'mailto:ben.madelin@ntlworld.com',
        'icon': <FaIcons.FaEnvelope color='#be3144' onMouseEnter='' /> //FaRegEnvelope
    },{
        'title': 'GitHub',
        'src': 'https://github.com/madelinben',
        'icon': <FaIcons.FaGithub />
    },{
        'title': 'LinkedIn',
        'src':'https://www.linkedin.com/in/madelinben/',
        'icon': <FaIcons.FaLinkedin />
    }
];
  export default contactData;
  