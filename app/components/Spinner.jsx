import React from 'react'
import Image from 'next/image'
import loader from './Spinner.gif'

const Spinner = () => {
  return (
    <div className='w-full h-[85vh] flex items-center justify-center'>
      <Image src={loader} alt='Loading...' priority className='w-[8rem] h-[8rem]'/>
    </div>
  )
}

export default Spinner
