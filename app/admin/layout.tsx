// app/admin/layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';


interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }:AdminLayoutProps) => {
  return (
    <div className="md:flex min-h-screen">



      {/* Sidebar */}
      <aside className="w-64 hidden md:block bg-gray-800 p-6 text-white">
        <nav className="space-y-4 flex flex-col w-1/3 ">
          <Link href="/admin/users" className="  hover:scale-105 hover:text-yellow-400">Users</Link>
          <Link href="/admin/audio" className="  hover:scale-105 hover:text-yellow-400">AudioFile</Link>
          <Link href="/admin/video" className="  hover:scale-105 hover:text-yellow-400">VideoFile</Link>
          <Link href="/admin/mailing" className= " hover:scale-105 hover:text-yellow-400">Connection</Link>
       
          <Link href="/" className=" hover:scale-105 hover:text-yellow-400">Log out</Link>
          </nav>
      </aside>

 


      <main className="flex-1 ">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
