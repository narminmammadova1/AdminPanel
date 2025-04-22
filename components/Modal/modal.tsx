
"use client";

import React, {   useState } from "react";
import Button from "../Button/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { UserProps } from "../UserTable/UserTable";

type ModalProps = {
  setIsOpen: (open: boolean) => void;
  title: string;
  onUserAdded:()=>void;
  selectedUser?: UserProps | null;
 
};

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required").max(10, "Maximum 10 characters allowed"),
  firstName: Yup.string().required("First name is required").max(10, "Maximum 10 characters allowed"),
  lastName: Yup.string().required("Last name is required").max(10, "Maximum 10 characters allowed"),
  balance: Yup.number().required("Balance is required").min(0, "Must be positive").max(100000,"wrong amount"),
  audioAccess: Yup.string().required("Audio access is required"),
  videoAccess: Yup.string().required("Video access is required"),
});




const Modal = ({ setIsOpen, title,onUserAdded ,selectedUser}: ModalProps) => {
  const [imgUrl, setImgUrl] = useState<string | null>(selectedUser?.imgUrl || null);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  
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


let savedEdit=localStorage.getItem("isEdit")

const defaultValues = {
  userName: "",
  firstName: "",
  lastName: "",
  balance: "",
  audioAccess: "",
  videoAccess: "",
};

const formInitialValues = savedEdit && selectedUser
  ? {
      userName: selectedUser.userName,
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      balance: selectedUser.balance,
      audioAccess: selectedUser.audioAccess,
      videoAccess: selectedUser.videoAccess,
    }
  : defaultValues;



  return (
    <div
     className="fixed top-0 left-0 w-screen h-screen bg-black/60 z-50 flex items-center justify-center">
      <div className="w-1/2 flex justify-center bg-white p-6 rounded-lg shadow-lg">
        <Formik
        
        initialValues={formInitialValues}

          validationSchema={validationSchema}
        
          onSubmit={(values) => {


const raw = localStorage.getItem("usersData");
  const parsed = raw ? JSON.parse(raw) : [];

  let updatedUsers;
  if (savedEdit && selectedUser) {
    updatedUsers = parsed.map((user: UserProps) =>
      user.id === selectedUser.id ? { ...user, ...values, imgUrl: imgUrl || selectedUser.imgUrl } : user
    );
  } else {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newUser = { ...values, imgUrl, id };
    updatedUsers = [...parsed, newUser];
  }

  localStorage.setItem("usersData", JSON.stringify(updatedUsers));
  handleCloseModal();
  onUserAdded();

          }}
        >
          <Form className="flex px-4 w-full flex-col gap-3">
            <h3 className="text-black font-bold">{title}</h3>

            <div className="flex justify-center">
              <div className="relative w-20 h-20 rounded-full">
                {imgUrl ? (
                  <Image
                  width={200}
                  height={200}
                    src={imgUrl }
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
              <Button type="button" onClick={handleCloseModal}  buttonTitle="Cancel" />
              <Button type="submit"  buttonTitle="Save" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Modal;
