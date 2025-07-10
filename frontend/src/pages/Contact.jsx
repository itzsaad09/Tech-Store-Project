import React from 'react'
import "./Contact.css"

function Contact() {
  return (
    <>
    <form className="contactform">
        <span id="contact-lable">Contact Us</span>
        <input className ="input" type="text" placeholder="FirstName" />
        <input className="input" type="text" placeholder="LastName" />
        <input className="input" type="text" placeholder="Email" />
        <textarea className='textarea' name="message" id="textarea" placeholder='Message'/>
        <button id="btn">Submit</button>
      </form>
    </>
  )
}

export default Contact
