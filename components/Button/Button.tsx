"use client"

import React from 'react'

type ButtonProps={
    title?:string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    // type?:string |undefined
   type?: "submit" | "reset" | "button" | undefined
}


const Button = ({title,onClick,type}:ButtonProps) => {
  return (
    <div>
        <button  type={type} onClick={onClick} className=' px-4 py-2  rounded-md text-white'>      {title}
        </button>
    </div>
  )
}

export default Button
