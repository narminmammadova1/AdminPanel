
"use client";
import defaultUsers from "@/data/users.json"

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import useModal from "@/hooks/useModal";
import Modal from "../Modal/modal";
import Image from "next/image";

type UserProps = {
  id: number;
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

  const handleOpenEditModal = () => {
    setIsOpen(true);
    setIsEdit(true);
    localStorage.setItem("isEdit", "true");
    console.log("isedit",isEdit);
    
  };



  const handleDelete = (id: number) => {
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    localStorage.setItem("usersData", JSON.stringify(updated));
  };



  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("usersData");
  
      if (!storedUsers) {
        localStorage.setItem("usersData", JSON.stringify(defaultUsers));
        setUsers(defaultUsers);
      } else {
        const parsed = JSON.parse(storedUsers);
        if (Array.isArray(parsed)) {
          setUsers(parsed);
        } else {
          console.warn("usersData is not an array, resetting to defaultUsers");
          localStorage.setItem("usersData", JSON.stringify(defaultUsers));
          setUsers(defaultUsers);
        }
      }
    } catch (error) {
      console.error("Error parsing usersData, resetting:", error);
      localStorage.setItem("usersData", JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    }
  }, []);



  return (
    <div>
      <div>
        {isOpen && (
          <Modal title="Edit User" setIsOpen={setIsOpen} />
        )}
      </div>

      <table className="text-white">
        <thead>
          <tr>
            <td className="px-4 py-2">N</td>
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
                src={user.imgUrl || "/default-avatar.png"}
                alt="Profil" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.userName}</td>
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.balance}</td>
              <td className="px-4 py-2">
                <div className="bg-red-700 py-1">{user.audioAccess}</div>
              </td>
              <td className="px-4 py-2">
                <div className="bg-yellow-500 py-1">{user.videoAccess}</div>
              </td>
              <td className="px-4 py-2">
                <Button onClick={handleOpenEditModal} title="Edit" />
              </td>
              <td className="px-4 py-2">
                <Button onClick={() => handleDelete(user.id)} title="Delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
