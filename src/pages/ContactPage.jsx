import React from 'react';
import AddForm from '../components/AddFormComponent';

function Contact() {
  return (
    <div>
      <h2>Contact Page</h2> <br />
      <AddForm /> <br />

      <button
      className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
      >Enviar</button>
    </div>
  );
}

export default Contact;