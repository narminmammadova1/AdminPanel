"use client"

import React from 'react'
 import Button from "../Button/Button"
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
 
const AdminLogin = () => {
const router=useRouter()
const {push}=router
    const initialValues={
        username:"admin@gmail.com",
        password:"123456"
    }
const validationSchema=Yup.object({
    username:Yup.string().required(" username required"),
    password:Yup.string().required("password required") .min(6,'at least 6 sembols'),
})

const handleSubmit= async(values)=>{
    if(values.username==="admin@gmail.com"  && values.password==="123456"){

      toast.success("Welcome admin")
      await push("admin/users").then


    }
    else {
      alert("username must be admin1@gmail.com password must be 123456");
    }
    
}

  return (
     <div className="flex flex-col justify-center items-center text-white mt-10">
 
      <Formik initialValues={initialValues} 
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      >
    
      <Form className="border-2 border-gray-500 w-2/3 lg:w-1/2 rounded-md flex justify-center my-6 py-6 " action="">
      
      <div className=" flex flex-col w-full p-6 gap-4 justify-center ">
        <div className=" flex justify-center">
        <h3 className=" ">Welcome to the Admin Panel</h3>

        </div>

     
      <Field name="username" className="h-10 rounded-md px-2  text-[14px]  bg-white text-black " placeholder="username" type="text" />
      <ErrorMessage name="username" component="div" className="text-red-400 text-sm" />
      <Field name="password" className="h-10 rounded-md px-2   text-[14px]  text-black  bg-white"  placeholder="password" type="password" />
      <ErrorMessage name="password" component="div" className="text-red-400 text-sm" />

      <Button buttonTitle="Sign in" type='submit'/>

    
      </div>
      </Form>

      </Formik>
     
       {/* <p>
         Go to the <Link href="/admin/users">Admin Dashboard</Link> to manage users, files, and more.
       </p> */}
     </div>
   );
}

export default AdminLogin
