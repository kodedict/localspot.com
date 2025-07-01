"use client";

import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { strReplace, ucWords } from '@/utils/helper-support';
import BreadCrumbs from '../breadcrumbs';
import useApiRequest from "@/hooks/api-request/request";
import { useEffect, useState } from "react";
import moment from 'moment';

interface ByLocationIdProps {
    category: string
}

export default function ByCategory({ category }: ByLocationIdProps) { 
    const { ReturnGet} = useApiRequest();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParams, setQueryParams] = useState<string>('');
    const [listings, setListings] = useState([]);
    const GetListing = async () => {
        const request = await ReturnGet(`car-boot?page=${currentPage}&category=${category}${queryParams}`);
        if (!request) return;
        setListings(request.items);
    }
    useEffect(() => {
        GetListing();
    }, []);

    let name = decodeURIComponent(category);
    name = strReplace(name, '-', ' ');


    return (
        <main className=" my-[1em]">


            <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: ucWords(name), href: `/categories/${name}` }]}/>


            <div className='outer-container'>
                <h1 className='text-2xl font-bold capitalize'>{ucWords(name)}</h1>
                <p className='text-gray-600'>Discover top-rated {name} across the UK. View listings, schedules, and visitor ratings.</p>
                <div className='grid gap-4 mt-8'>
                    {listings.map((item: ListingType, index: number) => (
                        <div className="flex" key={index}>
                            <div className="md:w-1/3 relative h-64 md:h-auto">
                                <Image
                                    src="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"
                                    className='absolute inset-0 w-full h-full object-cover'
                                />
                            </div>
                            <div className="md:p-6 md:w-2/3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                                        <h3 className="text-xl font-bold font-['Inter'] mb-2 capitalize">{item.name}</h3>
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
                                <p className="text-neutral-600 mb-4">{item.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Indoor</span>
                                    <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Weekend</span>
                                    <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Family-friendly</span>
                                    <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Free parking</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-500 text-sm">Last updated: {moment(item.updated_at).fromNow()}</span>
                                    <Link href={`/${category}/london/${item.code}/${item.slug}`} className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                                        View Details
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-[#fafafa]'>
                <div className='outer-container mt-10'>
                    <h4 className='text-2xl font-bold'>Browse Car Boot Sales by Location</h4>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6'>
                        <Link href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                            <span className="font-medium text-neutral-800">London</span>
                        </Link>
                        <Link href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                            <span className="font-medium text-neutral-800">Manchester</span>
                        </Link>
                        <Link href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                            <span className="font-medium text-neutral-800">Leeds</span>
                        </Link>
                        <Link href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                            <span className="font-medium text-neutral-800">Birmingham</span>
                        </Link>
                        <Link href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                            <span className="font-medium text-neutral-800">Bristol</span>
                        </Link>
                        <Link href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                            <span className="font-medium text-neutral-800">Edinburgh</span>
                        </Link>
                    </div>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Category",
                        "name": category,
                        "description": `Discover top-rated ${name} across the UK. View listings, schedules, and visitor ratings.`,
                        "url": `https://www.carbootjunction.com/${name}`,
                        "image": "https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    })
                }}
            />
        </main>
    );
}
