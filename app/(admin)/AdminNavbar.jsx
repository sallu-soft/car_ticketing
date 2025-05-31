'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      
      <nav className="text-blue-600 bg-white px-4 py-3 shadow-xl border-b border-orange-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-3 md:gap-y-0">
        {/* Top row on mobile (Logo + toggle) */}
        <div className="w-full flex items-center justify-between md:w-auto">
          {/* Logo */}
          <Link href="/admin/dashboard" className="shrink-0">
            <Image
              src="/cholon.png"
              alt="logo"
              width={280}
              height={80}
              className="w-[150px] h-[60px] object-contain"
            />
          </Link>
  
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
  
        {/* Helpline (always visible) */}
        
  
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <div className=" flex items-center ">
            <Link className="text-md text-orange-700 hover:bg-orange-600 hover:text-white px-4 py-2 rounded-lg transition duration-250 font-semibold" href="/admin/trip">Trips</Link>
            <Link className="text-md text-orange-700 hover:bg-orange-600 hover:text-white px-4 py-2 rounded-lg transition duration-250 font-semibold" href="/admin/bus">Car</Link>
            <Link className="text-md text-orange-700 hover:bg-orange-600 hover:text-white px-4 py-2 rounded-lg transition duration-250 font-semibold" href="/admin/user">Users</Link>
            <Link className="text-md text-orange-700 hover:bg-orange-600 hover:text-white px-4 py-2 rounded-lg transition duration-250 font-semibold" href="/admin/tickets">Tickets</Link>
          </div>
          
  
          {/* {user?.id ? (
            <>
              <p className="bg-orange-500 text-gray-100 py-1 rounded-lg px-4">
                {user?.name}
              </p>
              <form action={logoutUser}>
                <button
                  type="submit"
                  className="ml-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
                >
                  লগআউট
                </button>
              </form>
            </>
          ) : (
            <div className="flex gap-x-4 items-center">
              <Link href="/register" className="hover:underline">রেজিস্টার</Link>
            <Link href="/login" className=" bg-orange-600 px-6 py-2 text-white rounded-lg">লগইন</Link>
            </div>
          )} */}
        </div>
      </div>
  
      {/* Mobile dropdown menu */}
      {/* {menuOpen && (
        <div className="md:hidden mt-3 space-y-3 px-2 flex flex-col text-center">
          
  
          {user?.id ? (
            <>
              <p className="bg-orange-500 text-gray-100 py-1 rounded-lg px-4 inline-block">
                {user?.name}
              </p>
              <form action={logoutUser} className="inline-block ml-2">
                <button
                  type="submit"
                  className="mt-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 w-full"
                >
                  লগআউট
                </button>
              </form>
            </>
          ) : (
            <div className="flex gap-x-5 items-center justify-center">
            <Link href="/register" className="hover:underline">রেজিস্টার</Link>
            <Link href="/login" className=" bg-orange-600 px-4 py-2 text-white rounded-lg">লগইন</Link>
            </div>
          )}
        </div>
      )} */}
    </nav>
    );
}

export default AdminNavbar