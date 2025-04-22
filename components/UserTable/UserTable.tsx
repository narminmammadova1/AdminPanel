
"use client";
import defaultUsers from "@/data/users.json"

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/modal";
import Image from "next/image";
import Header from "../Header/Header";

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

  //userAdd and userEdit functions
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

      <table className="text-white text-[14px]">
        <thead>
          <tr>
            <td className="px-4 py-2">No</td>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Balance</th>
            <th className="px-4 py-2">Audio Access</th>
            <th className="px-4 py-2">Video Access</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <Image width={200} 
                height={200}
                src={user.imgUrl || "/avatar.svg"}
                alt="Profil" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.userName}</td>
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.balance}</td>
              <td className="px-4 py-2">
                <div  className={`${getColorByExpiration(user.audioAccess)} py-1 px-2 rounded`}>{user.audioAccess}</div>
              </td>
              <td className="px-4 py-2">
                <div  className={`${getColorByExpiration(user.videoAccess)} py-1 px-2 rounded`}>{user.videoAccess}</div>
              </td>
              <td className="px-4 flex gap-2 py-2">
                <Button onClick={() => {
    setSelectedUser(user);    
    setIsEdit(true);          
    localStorage.setItem("isEdit", "true");
    console.log(isEdit);
    
    setIsOpen(true);  
  }} buttonTitle="Edit" />
                <Button onClick={() => handleDelete(user?.id)}  buttonTitle="Del" />

              </td>
              <td className="px-4 py-2">
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
