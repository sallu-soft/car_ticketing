import AdminNavbar from "./AdminNavbar";

// app/(admin)/layout.tsx
export default function AdminLayout({ children }) {
    return (
      <html>
        <body>
          <AdminNavbar/>
          <main>{children}</main>
        </body>
      </html>
    );
  }