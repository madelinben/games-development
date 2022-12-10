import React from 'react';

import './ContactForm.css';

const handleEmail = () => {
  console.log('Email being processed...');
}

function ContactForm() {
    return (
      <div className='contact-wrapper'>
        <div className='contact-container'> {/* animated-border */}

          <form id='contact-form' autoComplete='off' onSubmit={handleEmail}>
            {/* <div className='title'>Message me</div>
            <hr /> */}
              <div className='contact-orient'>
                <div className='contact-header'>
                  <div className='styled-input'>
                    <input type='text' placeholder='' name='name' required/>
                    <label>Name</label>
                  </div>
                  <div className='styled-input'>
                    <input type='text' placeholder='' name='email' required/>
                    <label>Email</label>
                  </div>
                  {/* <div className='styled-input'>
                    <input type='text' placeholder='' name='phone' required/>
                    <label>Phone Number</label>
                  </div> */}
                  {/* <div className='styled-input select-wrapper'>
                    <select name='subject' placeholder='Subject' required>
                      <option value='1' selected>Just saying hi</option>
                      <option value='2' selected>Business enquiry</option>
                    </select>
                  </div> */}
                </div>

                <div className='contact-body'>
                  <div className='styled-input select-wrapper'>
                    <select name='subject' placeholder='Subject' required>
                      <option value='1' selected>Just saying hi</option>
                      <option value='2' selected>Business enquiry</option>
                    </select>
                  </div>
                  <div className='styled-input'>
                    <textarea placeholder='' name='message' rows='10' required></textarea>
                    <label>Message</label>
                  </div>
                </div>
              </div>
              <div className='submit-btn'>
                <button type='submit'>Send Message</button>
              </div>
              
          </form>
            
        </div>
      </div>
    );
}

export default ContactForm;