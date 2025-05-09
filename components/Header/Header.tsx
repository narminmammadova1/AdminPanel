
"use client"

import React, { useState } from 'react'
import Button from '../Button/Button'
import Modal from '../Modal/modal'
import useModal from '@/hooks/useModal'
import AudioModal from '../Modal/audioModal'
import { usePathname } from 'next/navigation'
import VideoModal from '../Modal/videoModal'
import { RxHamburgerMenu } from "react-icons/rx";
import Link from 'next/link'

type HeaderProps = {
  onAdded: () => void,
  title: string,
  buttonTitle: string
}

const Header = ({ onAdded, title, buttonTitle }: HeaderProps) => {
  const {
    isOpen,
    setIsOpen,
    isOpenAudioMdl,
    setIsOpenAudioMdl,
    isOpenVideoMdl,
    setIsOpenVideoMdl
  } = useModal()

  const pathName = usePathname()

  const handleOpenUserModal = () => {
    if (pathName === "/admin/users") {
      setIsOpen(true)
    } else if (pathName === "/admin/audio") {
      setIsOpenAudioMdl(true)
    } else if (pathName === "/admin/video") {
      setIsOpenVideoMdl(true)
    }
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  return (
    <div className="relative  mt-10 w-full">

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
            <nav className="space-y-4 mt-6 flex flex-col text-start px-4">
              <Link href="/admin/users" className="  hover:scale-110 hover:text-yellow-400" onClick={toggleSidebar}>Users</Link>
              <Link href="/admin/audio" className="  hover:scale-110 hover:text-yellow-400" onClick={toggleSidebar}>AudioFile</Link>
              <Link href="/admin/video" className="  hover:scale-110 hover:text-yellow-400" onClick={toggleSidebar}>VideoFile</Link>
              <Link href="/admin/mailing" className=" hover:scale-110 hover:text-yellow-400" onClick={toggleSidebar}>Connection</Link>
              <Link href="/" className=" hover:scale-110 hover:text-yellow-400" onClick={toggleSidebar}>Log out</Link>
            </nav>
          </aside>
        </div>
      )}

      {isOpen && (
        <Modal onUserAdded={onAdded} title="Add User" setIsOpen={setIsOpen} />
      )}
      {isOpenAudioMdl && (
        <AudioModal
          title="Add Audio"
          onAdded={onAdded}
          setIsOpenAudioMdl={setIsOpenAudioMdl}
        />
      )}
      {isOpenVideoMdl && (
        <VideoModal
          title="Add Video"
          onAdded={onAdded}
          setIsOpenVideoMdl={setIsOpenVideoMdl}
        />
      )}

      <section className="flex justify-between p-4">
        <h1 className="text-xl md:text-2xl font-bold md:mb-4">{title}</h1>
        <Button onClick={handleOpenUserModal} buttonTitle={buttonTitle} />
      </section>
    </div>
  )
}

export default Header
