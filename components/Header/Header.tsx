"use client"

import React from 'react'
import Button from '../Button/Button'
import Modal from '../Modal/modal'
import useModal from '@/hooks/useModal'
import AudioModal from '../Modal/audioModal'
import { usePathname } from 'next/navigation'
import VideoModal from '../Modal/videoModal'


type HeaderProps={
  onAdded:()=>void,
  title:string,
  buttonTitle:string
}

const Header = ({onAdded,title,buttonTitle}:HeaderProps) => {
const {isOpen,setIsOpen,isOpenAudioMdl,setIsOpenAudioMdl,isOpenVideoMdl,setIsOpenVideoMdl}=useModal()
const pathName=usePathname()
const handleOpenUserModal=()=>{
  if(pathName==="/admin/users"){
    setIsOpen(true)

  }else if(pathName==="/admin/audio"){
    setIsOpenAudioMdl(true)
  }
  else if (pathName==="/admin/video"){
    setIsOpenVideoMdl(true)
  }
}


  return (
    <div>
        <div>
  {isOpen &&( <Modal onUserAdded={onAdded} title="Add User" setIsOpen={setIsOpen} />)}     
  {isOpenAudioMdl &&( <AudioModal 
   title="Add Audio" onAdded={onAdded} setIsOpenAudioMdl={setIsOpenAudioMdl} />)}     
 {isOpenVideoMdl &&( <VideoModal 
   title="Add Video" onAdded={onAdded} setIsOpenVideoMdl={setIsOpenVideoMdl} />)}     

        </div>

       <section className="flex justify-between  p-4">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

           
            <Button  onClick={handleOpenUserModal}   buttonTitle={buttonTitle}/>
            {/* <Button  onClick={onClick}   buttonTitle={buttonTitle}/> */}

            
        </section>
    </div>
  )
}

export default Header
