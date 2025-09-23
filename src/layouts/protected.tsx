"use client"

import { House, List, ListCollapse, Star, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from 'next/navigation';
import { ToastContainer } from "react-toastify";
import { abbreviateString } from "@/utils/helper-support";
import { signOut, useSession } from "next-auth/react";


const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {

    const { data: session, status } = useSession()

    const location = usePathname();

    const currentUrl = useMemo(() => location, [location]);

    const [isMenuOpen] = useState(false);

  if (status === "loading") 
    return <div style={{position: "absolute", top: "0", left: "0", height: "100%", width: "100%", backgroundColor: "white"}}></div>


    interface sidebarLinksType {
        to: string,
        label: string,
        icon: React.ReactNode,
    }

    const sidebarLinks: sidebarLinksType[] = [
        { to: "/dashboard", label: "Dashboard", icon: <House size={18} /> },
        { to: "/listing", label: "Listing", icon: <List size={18} /> },
        { to: "/category", label: "Category", icon: <ListCollapse size={18} /> },
        { to: "/popular-carboot", label: "Popular Carboot", icon: <Star size={18} /> },
    ];

    return (
        <>
            <div className="flex-col min-h-screen">
                <div className="relative w-full m-0 md:flex m-h-screen">
                    <div className={`lg:w-1/5 ${isMenuOpen ? 'translate-x-0 h-full w-full ' : '-translate-x-full md:translate-x-0'} z-20 absolute  md:relative md:flex flex-col min-h-screen py-5 pb-20 text-white duration-500  bg-primary`}>
                        <div className={`relative flex items-center pb-5 mt-5 space-x-3 px-10 justify-between`}>
                            <h1 className={`font-bold lowercase`}>
                                <span className={`capitalize duration-500 whitespace-nowrap`}>
                                    LocalSpot
                                </span>
                            </h1>
                        </div>
                        <div className="mt-[2em] font-[400] text-[14px]">
                            <div className="grid gap-y-3">
                                {sidebarLinks.map((menu, index) => (
                                    <Link
                                        href={`/admin${menu.to}`}
                                        key={index}
                                        className={`relative flex items-center py-3 transition-all duration-500 ease-in-out hover:bg-gray-800 hover:font-[700] ${currentUrl.includes(`${menu.to}`) ? 'font-[700] bg-gray-800' : ''
                                            } px-10 w-full`}
                                    >
                                        <div className="relative">
                                            {menu.icon}
                                        </div>
                                        <h3 className={`absolute left-16 transition-all duration-300 ml-3`}>
                                            {menu.label}
                                        </h3>
                                    </Link>
                                ))}
                                <button
                                    className={`relative flex items-center py-3 transition-all duration-500 ease-in-out hover:bg-gray-800 hover:font-[700] px-10 w-full cursor-pointer`}
                                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                                >
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                        </svg>
                                    </div>
                                    <h3 className={`absolute left-16 transition-all duration-300 ml-3`}>
                                        Logout
                                    </h3>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full">
                        {/* <div id="line_loader" className="fixed z-50 hidden w-full"><LineLoader /></div> */}
                        <div className="outer-container">
                            <div className="flex justify-between border-b border-[#E6EAF0] pb-5">
                                <h3 className="page-title text-[1.3em] font-medium"></h3>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-4 cursor-pointer">
                                        <h2 className="page-titlee text-[0.8em] uppercase">{abbreviateString(`${session?.user?.name}`, 15)}</h2>
                                        <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-green-300 rounded-full">
                                            <User size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <button onClick={() => setIsMenuOpen(true)} type="button" className="flex items-center my-3 space-x-2 md:hidden">
                                        <Menu size={18} />
                                        <span>Open navigation</span>
                                    </button> */}
                            <div className='my-5'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer pauseOnFocusLoss={false} />
            </div>
        </>
    )
}

export default ProtectedLayout