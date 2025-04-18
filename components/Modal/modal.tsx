
"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type ModalProps = {
  setIsOpen: (open: boolean) => void;
  title: string;
  onSave?: (user: any) => void; 
};

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required").max(10, "Maximum 10 characters allowed"),
  firstName: Yup.string().required("First name is required").max(10, "Maximum 10 characters allowed"),
  lastName: Yup.string().required("Last name is required").max(10, "Maximum 10 characters allowed"),
  balance: Yup.number().required("Balance is required").min(0, "Must be positive"),
  audioAccess: Yup.string().required("Audio access is required"),
  videoAccess: Yup.string().required("Video access is required"),
});

const Modal = ({ setIsOpen, title, onSave }: ModalProps) => {
  const [imgUrl,setImgUrl] = useState<string | null>(null);

  const handleCloseModal = () => {
    setIsOpen && setIsOpen(false);
  };

  useEffect(() => {
    const localEdit = localStorage.getItem("isEdit");
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 z-50 flex items-center justify-center">
      <div className="w-1/2 flex justify-center bg-white p-6 rounded-lg shadow-lg">
        <Formik
          initialValues={{
            userName: "",
            firstName: "",
            lastName: "",
            balance: "",
            audioAccess: "",
            videoAccess: "",
          }}
          validationSchema={validationSchema}
        
          onSubmit={(values) => {
            console.log("Submit values", values); 
            console.log("Avatar", imgUrl); 
            const id = Math.random().toString(36).substring(2, 8).toUpperCase()
            // const id = Date.now();
            const newUser = { ...values, imgUrl, id };
          
            const raw = localStorage.getItem("usersData");
let existingUsers = [];

try {
  const parsed = JSON.parse(raw || "[]");
  existingUsers = Array.isArray(parsed) ? parsed : [];
} catch (err) {
  existingUsers = [];
}
            console.log("Parsed existing users:", existingUsers);
          
            const updatedUsers = [...existingUsers, newUser];
            localStorage.setItem("usersData", JSON.stringify(updatedUsers));
            console.log("Updated usersData", updatedUsers);
          
            handleCloseModal();
          }}
        >
          <Form className="flex px-4 w-full flex-col gap-3">
            <h3 className="text-black font-bold">{title}</h3>

            <div className="flex justify-center">
              <div className="relative w-20 h-20 rounded-full">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt="Avatar Preview"
                    className="w-20 h-20 object-cover rounded-full border mb-2"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2 text-gray-500">
                    No Avatar
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="cursor-pointer opacity-0 absolute top-0 left-0 rounded-full w-20 h-20"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Field name="userName" placeholder="Username" className="p-2 rounded-md border" />
              <div className="h-2 mt-0">
                <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-col">
              <Field name="firstName" placeholder="First Name" className="p-2 rounded-md border" />
              <div className="h-2 mt-0">
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-col">
              <Field name="lastName" placeholder="Last Name" className="p-2 rounded-md border" />
              <div className="h-2 mt-0">
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-col">
              <Field name="balance" type="number" placeholder="Balance" className="p-2 rounded-md border" />
              <div className="h-2 mt-0">
                <ErrorMessage name="balance" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-col">
              <Field type="date" name="audioAccess" className="p-2 rounded-md border" />
              <div className="h-2 mt-0">
                <ErrorMessage name="audioAccess" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex flex-col">
              <Field type="date" name="videoAccess" className="p-2 rounded-md border" />
              <div className="h-2 mt-0">
                <ErrorMessage name="videoAccess" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button type="button" onClick={handleCloseModal} title="Cancel" />
              <Button type="submit" title="Save" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
