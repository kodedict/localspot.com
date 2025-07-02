"use client"

import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

const RelatedListing = () => {
    return (
        <main className=" mb-[5em]">
            <div className='outer-container mt-5'>
                <h4 className='text-2xl font-bold'>Nearby Car Boot Sales</h4>
                <div className='grid gap-4 mt-8 md:grid-cols-3'>
                    <div className="flex flex-col" style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                        <div className="md:p-6 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                                    <h3 className="text-xl font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
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
                            <div className="flex justify-between items-center">
                                <div className='flex gap-4'>
                                    <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                                        <Star size={18} />
                                        <span className="font-medium">4.8</span>
                                    </div>
                                    <span className="text-neutral-500 text-sm">8.5 miles away</span>
                                </div>
                                <Link href="/car-boot-sales/london/1234/wimbledon-car-boot-sale" className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                                    View Details
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col" style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                        <div className="md:p-6 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                                    <h3 className="text-xl font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
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
                            <div className="flex justify-between items-center">
                                <div className='flex gap-4'>
                                    <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                                        <Star size={18} />
                                        <span className="font-medium">4.8</span>
                                    </div>
                                    <span className="text-neutral-500 text-sm">8.5 miles away</span>
                                </div>
                                <Link href="/car-boot-sales/london/1234/wimbledon-car-boot-sale" className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                                    View Details
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col" style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                        <div className="md:p-6 p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                                    <h3 className="text-xl font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
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
                            <div className="flex justify-between items-center">
                                <div className='flex gap-4'>
                                    <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                                        <Star size={18} />
                                        <span className="font-medium">4.8</span>
                                    </div>
                                    <span className="text-neutral-500 text-sm">8.5 miles away</span>
                                </div>
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