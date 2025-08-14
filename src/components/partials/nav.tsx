"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className="border-gray-200 bg-gray-50 ">
            <div className="outer-container flex flex-wrap items-center gap-10 !py-5">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-secondary">localboot</span>
                </Link>
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>

                </button>
                <div className="hidden w-full md:block md:w-auto flex justify-end" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium text-sm mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        {/* <li>
                            <Link href="/" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">Home</Link>
                        </li> */}
                        {/* <li>
                            <Link href="/car-boot-sales" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/car-boot-sales" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">Car Boot Sales</Link>
                        </li> */}
                        <li>
                            <Link href="/car-boot-sales" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/car-boot-sales" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">
                                Find BootSales
                            </Link>
                        </li>
                        <li>
                            <Link href="/upcoming-car-boot-sales" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/upcoming-car-boot-sales" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">
                                Upcoming Car Boot Sales
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/blog" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/about" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/contact" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">
                                Contact
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/" className={`block py-2 px-3 md:p-0 text-white ${pathname === "/list" ? "bg-primary md:text-primary font-bold" : "bg-gray-50 md:text-gray-600"} rounded-sm md:bg-transparent`} aria-current="page">
                                List With LocalBoot
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar