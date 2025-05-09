"use client"

import React from 'react'

type ButtonProps={
    buttonTitle?:string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
   type?: "submit" | "reset" | "button" | undefined
}



const Button = ({buttonTitle,onClick,type}:ButtonProps) => {
  return (
    <div>
        <button  type={type} onClick={onClick} className=' hover:scale-102 px-4 py-2 cursor-pointer w-full rounded-md text-white'>      {buttonTitle}
        </button>
    </div>
  )
}

export default Button
