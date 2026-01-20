"use client";

import { strReplace, ucWords } from '@/utils/helper-support';
import BreadCrumbs from '../breadcrumbs';
import { ListingType } from "@/type/model/ListingType";
import { useState, } from "react";
import useApiRequest from '@/libs/useApiRequest';
import ListingTemplate from '../ui/ListingTemplate';

interface ByLocationIdProps {
    category: string
}

export default function ByCategory({ category }: ByLocationIdProps) {
    const { Get } = useApiRequest();
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');

    const { data: listings } = Get(`/car-boot?page=${currentPage}&category=${category}${queryParams}`) as { data: { items: ListingType[] }, loading: boolean };

    let name = decodeURIComponent(category);
    name = strReplace(name, '-', ' ');

    return (
        <main className="bg-[#f3f7fe]">
            <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: ucWords(name), href: `/categories/${name}` }]} />
            <div className='outer-container'>
                <h1 className='text-2xl font-bold capitalize'>{ucWords(name)}</h1>
                <p className='text-gray-600'>Discover top-rated {name} across the UK. View listings, schedules, and visitor ratings.</p>
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
