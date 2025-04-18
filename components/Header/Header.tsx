"use client"

import React from 'react'
import Button from '../Button/Button'
import Modal from '../Modal/modal'
import useModal from '@/hooks/useModal'

const Header = () => {
// const [isOpen,setIsOpen]=useState(false)
const {isOpen,setIsOpen}=useModal()

const handleOpenModal=()=>{
    setIsOpen(true)
}
  return (
    <div>
        <div>
  {isOpen &&( <Modal title="Add User" setIsOpen={setIsOpen} />)}     

        </div>

       <section className="flex justify-between  p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>

           
            <Button  onClick={handleOpenModal}   title="add new user"/>
            
        </section>
    </div>
  )
}

export default Header
