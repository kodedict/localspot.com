"use client"

import { House, List, ListCollapse, Locate } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from 'next/navigation';
import { ToastContainer } from "react-toastify";


const AuthLayout = ({ children }: { children: React.ReactNode }) => {

    interface sidebarLinksType {
        to: string,
        label: string,
        icon: React.ReactNode,
    }


    const sidebarLinks: sidebarLinksType[] = [
        { to: "/dashboard", label: "Dashboard", icon: <House size={18} /> },
        { to: "/listing", label: "Listing", icon: <List size={18} /> },
        { to: "/category", label: "Category", icon: <ListCollapse size={18} /> },
        { to: "/location", label: "Location", icon: <Locate size={18} /> },
    ];

    const location = usePathname();

    const currentUrl = useMemo(() => location, [location]);

    const [isMenuOpen] = useState(false); // setIsMenuOpen removed

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
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full">
                        {/* <div id="line_loader" className="fixed z-50 hidden w-full"><LineLoader /></div> */}
                        <div className="outer-container">
                            <div className="flex justify-between">
                                {/* <h3 className="page-title text-[1.3em] font-medium">{getGreeting()}, {ucFirst(Auth.first_name)}</h3> */}
                                {/* <div className="flex items-center space-x-6">
                                            <AppNotification setCurrentNotificationPage={setCurrentNotificationPage} data={getData} />
                                            <MenuDropdown />
                                        </div> */}
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
                <div id="unauthorized_layout">

                </div>
            </div>
        </>
    )
}

export default AuthLayout