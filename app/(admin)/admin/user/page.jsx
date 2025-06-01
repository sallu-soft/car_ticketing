
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

const USERS_PER_PAGE = 10;

export default async function UserListPage({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || '1', 10);
  const skip = (currentPage - 1) * USERS_PER_PAGE;

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: USERS_PER_PAGE,
      include: { tickets: true },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

  return (
    <div className="p-7">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="w-full text-left border mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Tickets</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.phone}</td>
              <td className="p-2">{user.tickets.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center">
        <Link
          href={`?page=${currentPage - 1}`}
          className={`px-3 py-1 border rounded ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Previous
        </Link>

        <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>

        <Link
          href={`?page=${currentPage + 1}`}
          className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}