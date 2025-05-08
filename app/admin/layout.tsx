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
        <nav className="space-y-4">
          <Link href="/admin/users" className="block hover:text-yellow-400">Users</Link>
          <Link href="/admin/audio" className="block hover:text-yellow-400">AudioFile</Link>
          <Link href="/admin/video" className="block hover:text-yellow-400">VideoFile</Link>
          <Link href="/admin/mailing" className="block hover:text-yellow-400">Connection</Link>
       
          <Link href="/" className="block hover:text-yellow-400">Log out</Link>
          </nav>
      </aside>

 


      {/* <div className=' bg-amber-500'>
      <RxHamburgerMenu color='white' />

      </div> */}

      {/* Page content */}
      <main className="flex-1 ">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
