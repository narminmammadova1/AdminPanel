
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../Header/Header";
import defaulAudios from "@/data/audios.json"
import useModal from "@/hooks/useModal";
import AudioModal from "../Modal/audioModal";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

export type AudioProps={
  id: string |number |null;
  type:string;
  category:string;
  title:string;
  description:string;
duration:number;
imgUrl?: string  

}

const AudioTable = () => {
  const [audioFiles,setAudioFiles]=useState<AudioProps[]>([])
const [selectedAudio,setSelectedAudio]=useState<AudioProps | null>(null)
  const [isEdit,setIsEdit]=useState(false)
  const {isOpenAudioMdl,setIsOpenAudioMdl}=useModal()

  
  const handleAudioAdded = () => {
    const raw = localStorage.getItem("audioData");
    const data = raw ? JSON.parse(raw) : [];
    setAudioFiles(data);
  };


  const handlelAudioDelete=(id:string |number |null)=>{
    const updated=audioFiles.filter((audio)=>audio.id !==id)
    setAudioFiles(updated)
    localStorage.setItem("audioData",JSON.stringify(updated))
  }

  
  useEffect(() => {

try{
const storedAudios=localStorage.getItem("audioData")
if(!storedAudios){
  localStorage.setItem("audioData",JSON.stringify(defaulAudios))
}
else{
  const parsed=JSON.parse(storedAudios)
if(Array.isArray(parsed)){
  setAudioFiles(parsed)
  
}
else{
  localStorage.setItem("audioData",JSON.stringify(defaulAudios))
  setAudioFiles(defaulAudios)

}
}

}catch(error){
  console.log(error);
  localStorage.setItem("audioData",JSON.stringify(defaulAudios))
  setAudioFiles(defaulAudios)

  
}

  }, []);


  return (
    <div>
              <Header onAdded={handleAudioAdded} title="Audios" buttonTitle="+add Audio" />

      <div>
      {isOpenAudioMdl &&( <AudioModal selectedData={selectedAudio} onAdded={handleAudioAdded}
   title="Edit Audio File" setIsOpenAudioMdl={setIsOpenAudioMdl} />)} 
      </div>
<div  className="overflow-x-auto  py-2  border-2 border-gray-500 md:border-none rounded-md  touch-auto w-full" >
<table className="text-white text-[14px] w-full">
        <thead className="text-green-500">
          <tr>
            <td className="px-4 py-2">No</td>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
         {audioFiles.map((audio,index)=>(
  <tr key={audio.id}>
  <td className="px-4 py-2">{index+1}</td>
  <td className="px-4 py-2">
    <Image width={200} 
    height={200}
    src={audio.imgUrl ? audio.imgUrl : "/avatar.png"}
    alt="" className="w-10 h-10 rounded-full" />
  </td>
  <td className="px-4 py-2">{audio.id}</td>
  <td className="px-4 py-2">{audio.type}</td>
  <td className="px-4 py-2">{audio.category}</td>
  <td className="px-4 py-2">{audio.title}</td>
  <td className="px-4 py-2">{audio.description.slice(0,21)}</td>
  <td className="px-4 py-2">
 {audio.duration}
  </td>
 
  <td className="px-4 flex gap-2 py-4">
    <div className=" hover:scale-120"
 onClick={()=>{
  setSelectedAudio(audio)
  setIsEdit(true)
  
  localStorage.setItem("isEdit", "true");
  setIsOpenAudioMdl(true);  
 }}            
> <FaPencil color="green" size={18}/></div>
    <div className=" hover:scale-120" onClick={()=>{
      handlelAudioDelete(audio.id)
    }}  ><MdDeleteOutline color="red"  size={20}/></div>

  </td>
  <td className="px-4 py-2">
  </td>
</tr>

         ))}
          
        </tbody>
      </table>
</div>
     
    </div>
  );
};

export default AudioTable;
