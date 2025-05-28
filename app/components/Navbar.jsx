
// import { logoutUser } from "@/actions/authenticate";
// import Link from "next/link";

// export default function Navbar({user}) {
//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 shadow">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <Link href="/" className="text-xl font-bold">
//           🚌 MyBus
//         </Link>
//         <div className="space-x-4 flex">
//           <Link href="/" className="hover:underline">
//             হোম
//           </Link>
//           <Link href="/trips" className="hover:underline">
//             ট্রিপসমূহ
//           </Link>
//           <Link href="/admin" className="hover:underline">
//             অ্যাডমিন
//           </Link>
          
//           {user?.id ? (
//             <>
//               <p className="bg-orange-500 text-gray-100 py-1 rounded-lg px-4">{user?.name}</p>
//               <form action={logoutUser}>
//                 <button
//                   type="submit"
//                   className="ml-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
//                 >
//                   লগআউট
//                 </button>
//               </form>
//             </>
//           ) : (
//             <Link href="/login" className="hover:underline">লগইন</Link>
//           )}
          
          
//         </div>
//       </div>
//     </nav>
//   );
// }

'use client'

import { useState } from "react";
import { logoutUser } from "@/actions/authenticate";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="text-blue-600 bg-white px-6 py-4 shadow-xl border-b border-orange-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <Image src={"/cholon.png"} alt="logo" width="280" height="80" className="w-[180px] h-[70px] " />
        </Link>

        {/* Mobile menu toggle button */}
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

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <Link href="/trips" className="hover:underline">
            ট্রিপসমূহ
          </Link>
          {/* <Link href="/admin" className="hover:underline">
            অ্যাডমিন
          </Link> */}

          {user?.id ? (
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
            <Link href="/login" className="hover:underline">
              লগইন
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2">
          <Link href="/" className="block hover:underline">
            হোম
          </Link>
          <Link href="/trips" className="block hover:underline">
            ট্রিপসমূহ
          </Link>
          {/* <Link href="/admin" className="block hover:underline">
            অ্যাডমিন
          </Link> */}

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
            <Link href="/login" className="block hover:underline">
              লগইন
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
