

"use client"
import { useState } from "react"

function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return { openModal, closeModal, isOpen, setIsOpen }
}

export default useModal
