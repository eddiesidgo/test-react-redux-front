import React, { useEffect, useState } from 'react'

const HooksPage = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
    return () => {
        console.log('cleanup function called');
    }
  }, [] ) 
  
  const [name, setName] = useState('hello');
  return (
    <>
    <div>HooksPage</div> <br />
    <button 
    className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
    onClick={() => setCount(count + 1)}> 
    Clicked {count} times </button> <br /><br />

    <hr /> <br />

    <div>Name: {name}</div> <br />

    <hr /> <br />

    </>
  )
}

export default HooksPage