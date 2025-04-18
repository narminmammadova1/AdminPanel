// app/admin/layout.tsx
import Link from 'next/link';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 text-white">
        <nav className="space-y-4">
          <Link href="/admin/users" className="block hover:text-yellow-400">Пользователи</Link>
          <Link href="/admin/audio" className="block hover:text-yellow-400">Аудиофайлы</Link>
          <Link href="/admin/video" className="block hover:text-yellow-400">Видеофайлы</Link>
          <Link href="/admin/mailing" className="block hover:text-yellow-400">Рассылка</Link>
        </nav>
      </aside>

      {/* Page content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
