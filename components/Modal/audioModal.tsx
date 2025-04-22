

"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import Image from "next/image";
import { AudioProps } from "../AudioTable/AudioTable";

type ModalProps = {
  setIsOpenAudioMdl: (open: boolean) => void;
  title: string;
  onAudioAdded:()=>void;
  selectedAudio?:AudioProps | null
};

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  category: Yup.string().required("Category is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.number().required("Duration is required").positive("Must be positive"),
});

const AudioModal = ({ setIsOpenAudioMdl, title ,onAudioAdded,selectedAudio}: ModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // const [audioFileBase64, setAudioFileBase64] = useState<string | null>(null);

  const handleCloseModal = () => {
    setIsOpenAudioMdl(false);
  };

  const handleFileToBase64 = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const defaultValues = {
    type: "",
    category: "",
    title: "",
    description: "",
    duration: "",
  };

  const savedEdit=localStorage.getItem("isEdit")

  const formInitialValues= savedEdit && selectedAudio ? (
    {  type:selectedAudio.type,
      category: selectedAudio.category,
      title: selectedAudio.title,
      description: selectedAudio.description,
      duration: selectedAudio.duration,}
  ) : defaultValues


  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 z-50 flex items-center justify-center">
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const raw = localStorage.getItem("audioData");
            const parsed = raw ? JSON.parse(raw) : [];

            const id = Math.random().toString(36).substring(2, 8).toUpperCase();

            const newAudio = {
              ...values,
              id,
              imageUrl: imagePreview,
              // audioFile: audioFileBase64,
            };

            const updatedAudioList = [...parsed, newAudio];
            localStorage.setItem("audioData", JSON.stringify(updatedAudioList));
            handleCloseModal();
            onAudioAdded()
          }}
        >
          <Form className="flex flex-col gap-4">
            <h3 className="text-black font-bold text-xl text-center">{title}</h3>            
            <div className="flex  justify-between  ">
                <div className=" w-1/2 h-14 items-center justify-between flex  gap-4 ">
                <label className="relative cursor-pointer w-1/2 h-8 bg-blue-500 text-white flex items-center justify-center rounded-md">
  Add Image
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileToBase64(file, setImagePreview);
      }
    }}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
</label>

 </div>

 <div className="flex w-1/2 items-center  justify-between  gap-4">
    {/* <div className="w-1/2">                {audioFileBase64 && <p className="text-green-500 text-sm mt-1">Audio uploaded ✅</p>}
  </div> */}

    <div className=" bg-amber-100 w-20 h-full rounded-md">
      <Image src={imagePreview || "/avatar.png"} alt="" width={80} height={80} className="w-20 h-14 rounded-md" />
   </div>
               
            </div>
       

            </div>
            
            <div className="flex flex-col">
              <Field as="select" name="type" className="p-2 rounded-md border">
                <option value="">Select Type</option>
                <option value="meditation">Meditation</option>
                <option value="sleep">Sleep</option>
                <option value="focus">Focus</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Category (dropdown) */}
            <div className="flex flex-col">
              <Field as="select" name="category" className="p-2 rounded-md border">
                <option value="">Select Category</option>
                <option value="music">Music</option>
                <option value="podcast">Podcast</option>
                <option value="asmr">ASMR</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <Field name="title" placeholder="Title" className="p-2 rounded-md border" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <Field name="description" as="textarea" placeholder="Description" className="p-2 rounded-md border" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col">
              <Field name="duration" type="number" placeholder="Duration (in seconds)" className="p-2 rounded-md border" />
              <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <Button type="button" onClick={handleCloseModal} buttonTitle="Cancel" />
              <Button type="submit" buttonTitle="Save" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AudioModal;
