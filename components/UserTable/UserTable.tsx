
"use client";
import defaultUsers from "@/data/users.json"

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/modal";
import Image from "next/image";
import Header from "../Header/Header";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

export type UserProps = {
  id: number | string |null ;
  userName: string;
  firstName: string;
  lastName: string;
  balance: number;
  audioAccess: string;
  videoAccess: string;
  imgUrl?: string  
};


const UserTable = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const { isOpen, setIsOpen } = useModal();
  const [isEdit, setIsEdit] = useState(false);
const [selectedUser,setSelectedUser]=useState<UserProps | null>(null);

  const handleUserAdded = () => {
    const raw = localStorage.getItem("usersData");
    const data = raw ? JSON.parse(raw) : [];
    setUsers(data);
  };

  
  
//for delete users
  const handleDelete = (id: number | string |null ) => {
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    localStorage.setItem("usersData", JSON.stringify(updated));
  };

  const getColorByExpiration = (dateString: string): string => {
    const now = new Date();
    const expirationDate = new Date(dateString);
    const timeDiff = expirationDate.getTime() - now.getTime();
    const daysRemaining = timeDiff / (1000 * 60 * 60 * 24);
  
    if (daysRemaining < 0) {
      return "bg-red-300"; 
    } else if (daysRemaining <= 3) {
      return "bg-yellow-300"; 
    } else {
      return "bg-green-300"; 
    }
  };
  



  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("usersData");
  
      if (!storedUsers) {
        localStorage.setItem("usersData", JSON.stringify(defaultUsers));
        setUsers(defaultUsers);
      } 
      else {
        const parsed = JSON.parse(storedUsers);
        if (Array.isArray(parsed)) {
          setUsers(parsed);
        } else {
          console.warn("usersData is not an array");
          localStorage.setItem("usersData", JSON.stringify(defaultUsers));
          setUsers(defaultUsers);
        }
      }
    } catch (error) {
      localStorage.setItem("usersData", JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
      console.log(error);
      
    }
  }, []);



  return (
    <div>
              <Header title="Users" buttonTitle="+add user" onAdded={handleUserAdded}/>

      <div>
        {isOpen && (
          <Modal 
          selectedUser={selectedUser}
          setIsOpen={setIsOpen} 
            onUserAdded={handleUserAdded} title="Edit User" />
        )}
      </div>
<div  className="overflow-x-auto  py-2  border-2 border-gray-500 md:border-none rounded-md  touch-auto w-full">
<table className="text-white   text-[12px] w-full  md:text-[14px]">
        <thead>
          <tr>
            <td className="md:px-4">No</td>
            <th className="md:px-4 ">Image</th>
            <th className="md:px-4 ">ID</th>
            <th className="md:px-4 ">Username</th>
            <th className="md:px-4 ">First Name</th>
            <th className="md:px-4 ">Last Name</th>
            <th className="md:px-4 ">Balance</th>
            <th className="px-4 ">Audio Access</th>
            <th className="px-4 ">Video Access</th>
            <th className="md:px-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="  " key={user.id}>
              <td className="px-2 ">{index + 1}</td>
              <td className=" ">
                <Image width={400} 
                height={400}
                src={user.imgUrl || "/avatar.svg"}
                alt="Profil" className=" w-10 h-10 rounded-full" />
              </td>
              <td className="px-4 py-3 ">{user.id}</td>
              <td className="px-4 py-3 ">{user.userName.slice(0,10)}</td>
              <td className="px-4  py-3">{user.firstName.slice(0,10)}</td>
              <td className="px-4 py-3">{user.lastName.slice(0,10)}</td>
              <td className="px-4 py-3">{user.balance}</td>
              <td className="px-2 py-3">
                <div  className={`${getColorByExpiration(user.audioAccess)} py-1 px-2 rounded`}>{user.audioAccess}</div>
              </td>
              <td className="px-2 py-3 ">
                <div  className={`${getColorByExpiration(user.videoAccess)} py-1 px-2 rounded`}>{user.videoAccess}</div>
              </td>
              <td className="px-2 flex gap-2  py-4 justify-center items-center">
                <div  className=" " onClick={() => {
    setSelectedUser(user);    
    setIsEdit(true);          
    localStorage.setItem("isEdit", "true");
    console.log(isEdit);
    
    setIsOpen(true);  
  }}>
    <FaPencil  size={18}/>
  </div>
                <div onClick={() => handleDelete(user?.id)}  >
                  <MdDeleteOutline  size={18}/>
                </div>

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

export default UserTable;
