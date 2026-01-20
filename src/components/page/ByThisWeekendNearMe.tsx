"use client";

import BreadCrumbs from '../breadcrumbs';
import { ListingType } from "@/type/model/ListingType";
import { useEffect, useState, } from "react";
import useApiRequest from '@/libs/useApiRequest';
import ListingTemplate from '../ui/ListingTemplate';


export default function ByThisWeekendNearMe() {
    const { Get } = useApiRequest();
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');

    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    
    useEffect(() => {
        const coordinatesStr = localStorage.getItem("userCoordinates");
        if (coordinatesStr) {
            const coordinates = JSON.parse(coordinatesStr);
            setLatitude(coordinates.latitude);
            setLongitude(coordinates.longitude);
        }
    }, [])

    const { data: listings } = Get(`/car-boot?page=${currentPage}&filter_by=${'this_weekend_near_me'}${queryParams}&latitude=${latitude}&longitude=${longitude}`) as { data: { items: ListingType[] }, loading: boolean };

    return (
        <main className="bg-[#f3f7fe]">
            <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: 'Car Boot Sales this weekend near me' }]} />
            <div className='outer-container'>
                <h1 className='text-2xl font-bold capitalize'>Car Boot Sales this weekend near me </h1>
                <p className='text-gray-600'>Discover top-rated Car Boot Sales this weekend near me across the UK. View listings, schedules, and visitor ratings.</p>
                <div className='mt-5'>
                    <div className='grid gap-4 mt-8 md:grid-cols-4'>
                        {listings?.items?.map((item: ListingType, index: number) => (
                            <ListingTemplate listing={item} key={index} />
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
