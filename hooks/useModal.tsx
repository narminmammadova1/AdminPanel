
"use client"
import { useState } from "react"

function useModal() {
  const [isOpen, setIsOpen] = useState(false)
 const [ isOpenAudioMdl,setIsOpenAudioMdl]=useState(false)
 const [isOpenVideoMdl,setIsOpenVideoMdl]=useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { openModal, closeModal, isOpen, setIsOpen,isOpenAudioMdl,setIsOpenAudioMdl,isOpenVideoMdl,setIsOpenVideoMdl }
}

export default useModal
