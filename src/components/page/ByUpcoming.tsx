"use client";

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import BreadCrumbs from '../breadcrumbs';
import useApiRequest from "@/hooks/api-request/request";
import { ListingType } from "@/type/model/ListingType";
import { useEffect, useState, } from "react";//useCallback
import moment from 'moment';


export default function ByUpcoming() {
    const { ReturnGet } = useApiRequest();
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const GetListing = (async () => {
            const request = await ReturnGet(`car-boot?page=${currentPage}&filterBy=${'upcoming'}${queryParams}`);
            if (!request) return;
            setListings(request?.items);
        });
        GetListing();
    }, [currentPage, queryParams, ReturnGet]);

    return (
        <main className="bg-[#f3f7fe]">
            <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: 'Upcoming car boot sales' }]} />
            <div className='outer-container'>
                <h1 className='text-2xl font-bold capitalize'>Upcoming car boot sales</h1>
                <p className='text-gray-600'>Discover top-rated Upcoming car boot sales across the UK. View listings, schedules, and visitor ratings.</p>
                <div className='mt-5'>
                    <div className='grid gap-4 mt-8 md:grid-cols-4'>
                        {listings.map((item: ListingType, index: number) => (
                            <Link key={index} href={`/${(item.category === 'nil' || !item.category) ? 'car-boot-sales' : item.category}/${item.region || 'london'}/${item.code}/${item.slug}`}>
                                <div className="themeRounded bg-white">
                                    <div className="relative h-[10em]">
                                        {item?.images?.[0] && <Image
                                            src={item?.images[0]}
                                            width={500}
                                            height={500}
                                            alt={item.name}
                                            className='absolute inset-0 w-full h-full object-cover'
                                        />}
                                    </div>
                                    <div className="md:p-4">
                                        <div>
                                            <h3 className="text-md font-bold font-['Inter'] mb-2 capitalize">{item.name}</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-2 text-sm mb-4">
                                            {item.address && <div className="flex items-center text-neutral-600 space-x-2">
                                                <MapPin size={18} />
                                                <span>{item.address}</span>
                                            </div>}
                                            <div className="flex items-center text-neutral-600 space-x-2">
                                                <span>
                                                    {(item.opening_time && item.closing_time) ? <span>{moment(item.opening_time, 'HH:mm:ss').format('hh:mm A')} - {moment(item.closing_time, 'HH:mm:ss').format('hh:mm A')}</span> : 'Closed'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Category",
                        "name": 'Upcoming car boot sales',
                        "description": `Discover top-rated Upcoming car boot sales across the UK. View listings, schedules, and visitor ratings.`,
                        "url": `https://www.carbootjunction.com/upcoming-car-boot-sales`,
                        "image": "https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    })
                }}
            />
        </main>
    );
}
