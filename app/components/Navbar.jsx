

// 'use client'

// import { useState } from "react";
// import { logoutUser } from "@/actions/authenticate";
// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar({ user }) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="text-blue-600 bg-white px-6 py-4 shadow-xl border-b border-orange-300">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <Link href="/" className="text-xl font-bold">
//           <Image src={"/cholon.png"} alt="logo" width="280" height="80" className="w-[180px] h-[70px] " />
//         </Link>

        
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden focus:outline-none"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             {menuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>

        
//         <div className="hidden md:flex space-x-4 items-center">
//           <Link href="/" className="hover:underline">
//             হোম
//           </Link>
//           <Link href="/trips" className="hover:underline">
//             ট্রিপসমূহ
//           </Link>
        

//           {user?.id ? (
//             <>
//               <p className="bg-orange-500 text-gray-100 py-1 rounded-lg px-4">
//                 {user?.name}
//               </p>
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
//             <Link href="/login" className="hover:underline">
//               লগইন
//             </Link>
//           )}
//         </div>
//       </div>
     

//       {menuOpen && (
//         <div className="md:hidden mt-2 space-y-2 px-2">
//           <Link href="/" className="block hover:underline">
//             হোম
//           </Link>
//           <Link href="/trips" className="block hover:underline">
//             ট্রিপসমূহ
//           </Link>
//           {/* <Link href="/admin" className="block hover:underline">
//             অ্যাডমিন
//           </Link> */}

//           {user?.id ? (
//             <>
//               <p className="bg-orange-500 text-gray-100 py-1 rounded-lg px-4 inline-block">
//                 {user?.name}
//               </p>
//               <form action={logoutUser} className="inline-block ml-2">
//                 <button
//                   type="submit"
//                   className="mt-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 w-full"
//                 >
//                   লগআউট
//                 </button>
//               </form>
//             </>
//           ) : (
//             <Link href="/login" className="block hover:underline">
//               লগইন
//             </Link>
//           )}
//         </div>
//       )}
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
    // <nav className="text-blue-600 bg-white px-4 py-3 shadow-xl border-b  border-orange-300">
    //   <div className="max-w-7xl mx-auto md:flex items-center justify-between  gap-y-2">
    //     {/* Left: Logo */}
    //     <Link href="/" className="text-xl font-bold shrink-0">
    //       <Image
    //         src="/cholon.png"
    //         alt="logo"
    //         width={280}
    //         height={80}
    //         className="w-[150px] h-[60px] object-contain"
    //       />
    //     </Link>

    //     {/* Center: Helpline (Always visible) */}
    //     <div className="w-full text-center text-sm md:text-lg font-semibold text-orange-700 md:w-auto md:flex-1 md:block">
    //       হেল্প লাইন: <span className="font-bold">০১৭১২৩৪৫৬৭৮</span>
    //     </div>

    //     {/* Right: Desktop menu & Mobile toggle */}
    //     <div className="flex items-center space-x-2 md:space-x-4">
    //       {/* Mobile toggle */}
    //       <button
    //         onClick={() => setMenuOpen(!menuOpen)}
    //         className="md:hidden focus:outline-none"
    //       >
    //         <svg
    //           className="w-6 h-6"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           {menuOpen ? (
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M6 18L18 6M6 6l12 12"
    //             />
    //           ) : (
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M4 6h16M4 12h16M4 18h16"
    //             />
    //           )}
    //         </svg>
    //       </button>

    //       {/* Desktop menu */}
    //       <div className="hidden md:flex space-x-4 items-center">
    //         <Link href="/" className="hover:underline">হোম</Link>
    //         <Link href="/trips" className="hover:underline">ট্রিপসমূহ</Link>

    //         {user?.id ? (
    //           <>
    //             <p className="bg-orange-500 text-gray-100 py-1 rounded-lg px-4">
    //               {user?.name}
    //             </p>
    //             <form action={logoutUser}>
    //               <button
    //                 type="submit"
    //                 className="ml-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
    //               >
    //                 লগআউট
    //               </button>
    //             </form>
    //           </>
    //         ) : (
    //           <Link href="/login" className="hover:underline">লগইন</Link>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Mobile menu dropdown */}
    //   {menuOpen && (
    //     <div className="md:hidden mt-3 space-y-3 px-2 text-center">
    //       <Link href="/" className="block hover:underline">হোম</Link>
    //       <Link href="/trips" className="block hover:underline">ট্রিপসমূহ</Link>

    //       {user?.id ? (
    //         <>
    //           <p className="bg-orange-500 text-gray-100 py-1 rounded-lg px-4 inline-block">
    //             {user?.name}
    //           </p>
    //           <form action={logoutUser} className="inline-block ml-2">
    //             <button
    //               type="submit"
    //               className="mt-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 w-full"
    //             >
    //               লগআউট
    //             </button>
    //           </form>
    //         </>
    //       ) : (
    //         <Link href="/login" className="block hover:underline">লগইন</Link>
    //       )}
    //     </div>
    //   )}
    // </nav>
    <nav className="text-blue-600 bg-white px-4 py-3 shadow-xl border-b border-orange-300">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-3 md:gap-y-0">
      {/* Top row on mobile (Logo + toggle) */}
      <div className="w-full flex items-center justify-between md:w-auto">
        {/* Logo */}
        <Link href="/" className="shrink-0">
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
      <div className="w-full text-center text-sm md:text-lg font-semibold text-orange-700 md:w-auto">
        হেল্প লাইন: <span className="font-bold">০১৭৭৬১০৫৮৬৩</span>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-4 items-center">
        <Link href="/" className="hover:underline">হোম</Link>
        <Link href="/trips" className="hover:underline">ট্রিপসমূহ</Link>

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
          <Link href="/login" className="hover:underline">লগইন</Link>
        )}
      </div>
    </div>

    {/* Mobile dropdown menu */}
    {menuOpen && (
      <div className="md:hidden mt-3 space-y-3 px-2 text-center">
        <Link href="/" className="block hover:underline">হোম</Link>
        <Link href="/trips" className="block hover:underline">ট্রিপসমূহ</Link>

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
          <Link href="/login" className="block hover:underline">লগইন</Link>
        )}
      </div>
    )}
  </nav>
  );
}
