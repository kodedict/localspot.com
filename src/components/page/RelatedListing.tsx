"use client"

import useApiRequest from '@/hooks/api-request/request';
import { ListingType } from '@/type/model/ListingType';
import { MapPin, SquareArrowUpRight } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const RelatedListing = () => {
    const { ReturnGet } = useApiRequest();
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const GetListing = (async () => {
            let latitude = '';
            let longitude = '';
            const coordinatesStr = localStorage.getItem("userCoordinates");
            if (coordinatesStr) {
                const coordinates = JSON.parse(coordinatesStr);
                latitude = coordinates.latitude;
                longitude = coordinates.longitude;
            }
            const request = await ReturnGet(`car-boot?page=${currentPage}${queryParams}&per_page=3&latitude=${latitude}&longitude=${longitude}`);
            if (!request) return;
            setListings(request?.items);
        });
        GetListing();
    }, [currentPage, queryParams, ReturnGet]);
    return (
        <main className=" mb-[5em]">
            <div className='outer-container mt-5'>
                <h4 className="text-xl font-bold font-['Inter'] mb-3">Nearby Car Boot Sales</h4>
                <div className='grid gap-4 md:grid-cols-3'>
                    {listings.map((item: ListingType, index: number) => (
                        <Link key={index} href={`/${(item.category === 'nil' || !item.category) ? 'car-boot-sales' : item.category}/${item.region || 'london'}/${item.code}/${item.slug}`} className="flex flex-col" style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
                            <div className="md:p-6 p-4">
                                <div className='flex justify-between items-center w-full'>
                                        <h3 className="text-md font-bold font-['Inter'] mb-2 capitalize">{item.name}</h3>
                                        <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open</span>
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
                                <div className="flex justify-between items-center">
                                    {/* <div className='flex gap-4 items-center'>
                                        <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                                            <Star size={18} />
                                            <span className="font-medium">4.8</span>
                                        </div>
                                        <span className="text-neutral-500 text-sm">8.5 miles away</span>
                                    </div> */}
                                    <Link href={`/${(item.category === 'nil' || !item.category) ? 'car-boot-sales' : item.category}/${item.region || 'london'}/${item.code}/${item.slug}`} className="inline-flex items-center font-medium hover:text-primary-dark gap-4 px-5 border py-2 hover:bg-primary-light hover:bg-opacity-10 rounded border-gray-400">
                                        <SquareArrowUpRight size={18} />
                                        <span>View</span>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default RelatedListing