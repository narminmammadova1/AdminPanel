import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-white">
      <h1>Welcome to the Admin Panel</h1>
      <p>Manage your website content from here.</p>
      <p>
        Go to the <Link href="/admin/users">Admin Dashboard</Link> to manage users, files, and more.
      </p>
    </div>
  );
}
