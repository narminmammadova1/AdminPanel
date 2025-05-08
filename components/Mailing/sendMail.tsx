"use client"
import React, { useState } from 'react'
import Button from '../Button/Button'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { RxHamburgerMenu } from "react-icons/rx";

const SendMail = () => {
  const [text,setText]=useState("")


const sendMail=()=>{
  console.log("message",text);
  toast.success("message was sent")
  setText("")
  
}
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  return (
    <div className='flex flex-col items-center justify-center py-6'>

         <div className="fixed top-1 left-4 z-50 md:hidden">
              <div onClick={toggleSidebar} className="p-2 rounded-md shadow-md">
                <RxHamburgerMenu color="white" size={24} />
              </div>
            </div>
      
            {isSidebarOpen && (
              <div className="fixed inset-0 z-40 flex">
                <div
                  className="absolute inset-0 "
                  onClick={toggleSidebar}
                />
      
                <aside className="relative w-32 text-[12px] bg-gray-800 bg-opacity-90 py-10 text-white shadow-md">
                  <nav className="space-y-4 mt-6 text-start px-4">
                    <Link href="/admin/users" className="block hover:text-yellow-400" onClick={toggleSidebar}>Users</Link>
                    <Link href="/admin/audio" className="block hover:text-yellow-400" onClick={toggleSidebar}>AudioFile</Link>
                    <Link href="/admin/video" className="block hover:text-yellow-400" onClick={toggleSidebar}>VideoFile</Link>
                    <Link href="/admin/mailing" className="block hover:text-yellow-400" onClick={toggleSidebar}>Connection</Link>
                    <Link href="/" className="block hover:text-yellow-400" onClick={toggleSidebar}>Log out</Link>
                  </nav>
                </aside>
              </div>
            )}
 <h1 className=''>Connection</h1>
<div className=' w-full md:w-1/2 mt-6'>
    <textarea placeholder='write message here'
     name="message"
      id="message"
      value={text}
      maxLength={300}
      onChange={(e)=>setText(e.target.value)}
      className='w-full h-[150px] p-4 text-base border-2 text-black bg-white  border-gray-400  rounded-lg'
      
      ></textarea>
       <div 
       className='mb-2  text-gray-500'>
          {text.length} / 500
        </div>
        <Button onClick={sendMail} buttonTitle="Send all users"/>

</div>

    </div>
  )
}

export default SendMail
