"use client"
import React, { useState } from 'react'
import Button from '../Button/Button'

const SendMail = () => {
  const [text,setText]=useState("")
  return (
    <div className='flex flex-col items-center justify-center py-6'>
 <h1 className=''>Connection</h1>
<div className='  w-1/2 mt-6'>
    <textarea placeholder='write message here'
     name="message"
      id="message"
      value={text}
      maxLength={300}
      onChange={(e)=>setText(e.target.value)}
      className='w-full h-[150px] p-4 text-base border-2 text-white  border-gray-400  rounded-lg'
      
      ></textarea>
       <div 
       className='mb-2  text-gray-500'>
          {text.length} / 500
        </div>
        <Button buttonTitle="Send"/>

</div>

    </div>
  )
}

export default SendMail
