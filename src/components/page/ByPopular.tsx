"use client";

import BreadCrumbs from '../breadcrumbs';
import { ListingType } from "@/type/model/ListingType";
import { useState, } from "react";
import useApiRequest from '@/libs/useApiRequest';
import ListingTemplate from '../ui/ListingTemplate';


export default function ByPopular() {
    const { Get } = useApiRequest();
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');

    const { data: listings } = Get(`/car-boot?page=${currentPage}&filter_by=${'popular'}${queryParams}`) as { data: { items: ListingType[] }, loading: boolean };

    return (
        <main className="bg-[#f3f7fe]">
            <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: 'Popular car boot sales' }]} />
            <div className='outer-container'>
                <h1 className='text-2xl font-bold capitalize'>Popular car boot sales</h1>
                <p className='text-gray-600'>Discover top-rated Popular car boot sales across the UK. View listings, schedules, and visitor ratings.</p>
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
                        "name": 'Popular car boot sales',
                        "description": `Discover top-rated Popular car boot sales across the UK. View listings, schedules, and visitor ratings.`,
                        "url": `https://www.carbootjunction.com/popular-car-boot-sales`,
                        "image": "https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    })
                }}
            />
        </main>
    );
}
