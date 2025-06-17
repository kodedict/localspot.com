"use client"

import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

const RelatedListing = () => {
    return (
        <main className=" mb-[5em]">
            <div className='outer-container mt-5'>
                <h4 className='text-2xl font-bold'>Other Car Boot Sales in London</h4>
                <p className='text-gray-600'>Discover top-rated car boot sales across the London.</p>
                <div className='grid gap-4 mt-8 md:grid-cols-3'>
                    <div className="flex flex-col" style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                        <div className="relative w-full h-64">
                            <Image
                                src="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                        </div>
                        <div className="md:p-6 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                                    <h3 className="text-xl font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
                                </div>
                                <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                                    <Star size={18} />
                                    <span className="font-medium">4.8</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm mb-4">
                                <div className="flex items-center text-neutral-600 space-x-2">
                                    <MapPin size={18} />
                                    <span>Church Road, Wimbledon, London</span>
                                </div>
                                <div className="flex items-center text-neutral-600 space-x-2">
                                    <Clock size={18} />
                                    <span> 06:00-14:00</span>
                                </div>
                            </div>
                            <p className="text-neutral-600 mb-4">One of London's most popular car boot sales, featuring over 200 stalls with everything from antiques to children's toys. Great food vendors and free parking available.</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Indoor</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Weekend</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Family-friendly</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Free parking</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500 text-sm">Last updated: 14 minutes ago</span>
                                <Link href="/car-boot-sales/london/1234/wimbledon-car-boot-sale" className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                                    View Details
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col" style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                        <div className="relative w-full h-64">
                            <Image
                                src="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                        </div>
                        <div className="md:p-6 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                                    <h3 className="text-xl font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
                                </div>
                                <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                                    <Star size={18} />
                                    <span className="font-medium">4.8</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm mb-4">
                                <div className="flex items-center text-neutral-600 space-x-2">
                                    <MapPin size={18} />
                                    <span>Church Road, Wimbledon, London</span>
                                </div>
                                <div className="flex items-center text-neutral-600 space-x-2">
                                    <Clock size={18} />
                                    <span> 06:00-14:00</span>
                                </div>
                            </div>
                            <p className="text-neutral-600 mb-4">One of London's most popular car boot sales, featuring over 200 stalls with everything from antiques to children's toys. Great food vendors and free parking available.</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Indoor</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Weekend</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Family-friendly</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Free parking</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500 text-sm">Last updated: 14 minutes ago</span>
                                <Link href="/car-boot-sales/london/1234/wimbledon-car-boot-sale" className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                                    View Details
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col" style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                        <div className="relative w-full h-64">
                            <Image
                                src="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                        </div>
                        <div className="md:p-6 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                                    <h3 className="text-xl font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
                                </div>
                                <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                                    <Star size={18} />
                                    <span className="font-medium">4.8</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm mb-4">
                                <div className="flex items-center text-neutral-600 space-x-2">
                                    <MapPin size={18} />
                                    <span>Church Road, Wimbledon, London</span>
                                </div>
                                <div className="flex items-center text-neutral-600 space-x-2">
                                    <Clock size={18} />
                                    <span> 06:00-14:00</span>
                                </div>
                            </div>
                            <p className="text-neutral-600 mb-4">One of London's most popular car boot sales, featuring over 200 stalls with everything from antiques to children's toys. Great food vendors and free parking available.</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Indoor</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Weekend</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Family-friendly</span>
                                <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Free parking</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-500 text-sm">Last updated: 14 minutes ago</span>
                                <Link href="/car-boot-sales/london/1234/wimbledon-car-boot-sale" className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                                    View Details
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default RelatedListing