// app/admin/users/page.tsx
import { prisma } from '@/lib/prisma'

const UserListPage = async () => {
  const users = await prisma.user.findMany({
    include: {
      tickets: true
    }
  })

  return (
    <div className="p-7">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <table className="w-full text-left border">
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
          {users.map(user => (
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
    </div>
  )
}

export default UserListPage
