import React from 'react'

const Navbar = () => {
  return (
    <div className='flex border-b-2 p-2.5'>
      <h1 className='w-32'>Check List App</h1>
      <ul className='w-[100%] flex justify-end gap-4 text-slate-500'>
        <button className='hover:text-black '>Home</button>
        <button className='hover:text-black'>About</button>
        <button className='hover:text-black'>Contact</button>
      </ul>
    </div>
  )
}

export default Navbar
