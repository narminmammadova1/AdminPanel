
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../Header/Header";
import defaultVideos from "@/data/videos.json"
import useModal from "@/hooks/useModal";
import VideoModal from "../Modal/videoModal";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

export type VideoProps={
  id: string |number |null;
  type:string;
  category:string;
  title:string;
  description:string;
duration:number;
imgUrl?: string  

}

const VideoTable = () => {
  const [videoFiles,setVideoFiles]=useState<VideoProps[]>([])
const [selectedVideo,setSelectedVideo]=useState<VideoProps | null>(null)
  const [isEdit,setIsEdit]=useState(false)
  const {setIsOpenVideoMdl,isOpenVideoMdl}=useModal()

  
  const handleVideoAdded = () => {
    const raw = localStorage.getItem("videoData");
    const data = raw ? JSON.parse(raw) : [];
    setVideoFiles(data);
  };


  const handleVideoDelete=(id:string |number |null)=>{
    const updated=videoFiles.filter((video)=>video.id !==id)
    setVideoFiles(updated)
    localStorage.setItem("videoData",JSON.stringify(updated))
  }

  
  useEffect(() => {

try{
const storedvideos=localStorage.getItem("videoData")
if(!storedvideos){
  localStorage.setItem("videoData",JSON.stringify(defaultVideos))
}
else{
  const parsed=JSON.parse(storedvideos)
if(Array.isArray(parsed)){
  setVideoFiles(parsed)
  
}
else{
  localStorage.setItem("videoData",JSON.stringify(defaultVideos))
  setVideoFiles(defaultVideos)

}
}

}catch(error){
  console.log(error);
  localStorage.setItem("videoData",JSON.stringify(defaultVideos))
  setVideoFiles(defaultVideos)

  
}

  }, []);




  return (
    <div>
              <Header onAdded={handleVideoAdded} title="Videos" buttonTitle="+add Video" />

      <div>
      {isOpenVideoMdl &&( <VideoModal selectedData={selectedVideo} onAdded={handleVideoAdded}
   title="Edit Video File" setIsOpenVideoMdl={setIsOpenVideoMdl} />)} 
      </div>
<div className="overflow-x-auto  py-2  border-2 border-gray-500 md:border-none rounded-md  touch-auto w-full">
<table className="text-white text-[14px] w-full">
        <thead className=" text-green-500">
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
         {videoFiles.map((video,index)=>(
  <tr key={video.id}>
  <td className="px-4 py-2">{index+1}</td>
  <td className="px-4 py-2">
    <Image width={200} 
    height={200}
    src={video.imgUrl ? video.imgUrl : "/avatar.png"}

    alt="" className="w-10 h-10 rounded-full" />
  </td>
  <td className="px-4 py-2">{video.id}</td>
  <td className="px-4 py-2">{video.type.slice(0,10)}</td>
  <td className="px-4 py-2">{video.category.slice(0,10)}</td>
  <td className="px-4 py-2">{video.title.slice(0,15)}</td>
  <td className="px-4 py-2">{video.description.slice(0,21)}</td>
  <td className="px-4 py-2">
 {video.duration}
  </td>
 
  <td className="px-4 flex gap-2 py-4">
    <div
 onClick={()=>{
  setSelectedVideo(video)
  setIsEdit(true)
  console.log(isEdit);
  
  localStorage.setItem("isEdit", "true");
  setIsOpenVideoMdl(true);  
 }}
 > <FaPencil  color="green" size={18}/></div>
    <div onClick={()=>{
      handleVideoDelete(video.id)
    }} >  <MdDeleteOutline  color="red" size={20}/></div>

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

export default VideoTable;
