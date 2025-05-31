import { getUser } from "@/actions/authenticate";
import Navbar from "../components/Navbar";
// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "চলন-যাত্রার নতুন সঙ্গী",
  icons: {
    icon: "/favicon.ico",
  },
  description: "যাত্রার নতুন সঙ্গী",
};
export default async function UserLayout({ children }) {
    const currentUser = await getUser();
    return (
     <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><Navbar user={currentUser}/>
      <div className="bg-gray-50 min-h-[80vh]">
        {children}
        </div>
        
      </body>
    </html>
    );
  }