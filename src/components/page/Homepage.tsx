"use client"

import Button from '@/components/form/button';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import useApiRequest from "@/hooks/api-request/request"
import { ListingType } from '@/type/model/ListingType';
import SearchComponent from '../search-component';
import { strReplace } from '@/utils/helper-support';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const [upcomingSales, setUpcomingSales] = useState([]);
    const [popularSales, setPopularSales] = useState([]);
    const navigate = useRouter();
    const {
        ReturnGet,
    } = useApiRequest();

    const getUpcomingSales = useCallback(async () => {
        const request = await ReturnGet(`car-boot`);
        if (!request) return;
        setUpcomingSales(request.items);
    }, [ReturnGet])

    const getPopularSales = useCallback(async () => {
        const request = await ReturnGet(`car-boot`);
        if (!request) return;
        setPopularSales(request.items);
    }, [ReturnGet])

    useEffect(() => {
        getUpcomingSales();
        getPopularSales();
    }, [getUpcomingSales, getPopularSales]);

    const onSearch = (search: string) => {
        search = strReplace(search, ' ', '-'); 
        navigate.replace(`/search/${search || 'car-boot-sales'}`);
    }

    return (
        <main className=" mb-[5em]">
            {/* Hero Section */}
            <section className="bg-[#f3f7fe] text-[#424242] py-10">
                <div className="outer-container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="md:text-[3em] text-[1.8em] font-bold mb-6 font-['Inter']">
                            Discover Car Boot Sales Across the UK Near You
                        </h1>
                        <p className="md:text-[2em] text-[#4e5562]">
                            Find your next bargain
                        </p>
                    </div>
                </div>
                <div className='mx-auto md:w-1/2 w-5/6'><SearchComponent onSearch={onSearch}/></div>
                
                <div className='outer-container mt-5'>
                    <h4 className='text-2xl font-bold'>Upcoming Car Boot Sales</h4>
                    <p className='text-gray-600'>Find car boot sales happening soon near you with confirmed dates, times and weather outlook.</p>
                    <div className='grid gap-4 mt-8 md:grid-cols-4'>
                        {upcomingSales.map((item: ListingType, index:number)=>(
                            <Link href={`/${item.category === 'nil' ? 'car-boot-sales' : item.category}/london/${item.code}/${item.slug}`} key={index} className="themeRounded bg-white">
                                <div className="relative h-[10em]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                        width={500}
                                        height={500}
                                        alt="Picture of the author"
                                        className='absolute inset-0 w-full h-full object-cover'
                                    />
                                </div>
                                <div className="md:p-4">
                                    <div>
                                        <h3 className="text-md font-bold font-['Inter'] mb-2">{item.name}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm mb-4">
                                        <div className="flex items-center text-neutral-600 space-x-2">
                                            <MapPin size={15} />
                                            <span>Church Road, Wimbledon, London</span>
                                        </div>
                                        <div className="flex items-center text-neutral-600 space-x-2">
                                            <span>{item.opening_time}-{item.closing_time}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='outer-container !pt-0'>
                    <h4 className='text-2xl font-bold'>Popular Car Boot Sales</h4>
                    <p className='text-gray-600'>Discover the most popular car boot sales with the highest ratings and best bargains.</p>
                    <div className='grid gap-4 mt-8 md:grid-cols-4'>
                        {popularSales.map((item: ListingType, index:number)=>(
                            <Link href={`/${item.category === 'nil' ? 'car-boot-sales': item.category}/london/${item.code}/${item.slug}`} key={index} className="themeRounded bg-white">
                                <div className="relative h-[10em]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                        width={500}
                                        height={500}
                                        alt="Picture of the author"
                                        className='absolute inset-0 w-full h-full object-cover'
                                    />
                                </div>
                                <div className="md:p-4">
                                    <div>
                                        <h3 className="text-md font-bold font-['Inter'] mb-2">{item.name}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm mb-4">
                                        <div className="flex items-center text-neutral-600 space-x-2">
                                            <MapPin size={15} />
                                            <span>Church Road, Wimbledon, London</span>
                                        </div>
                                        <div className="flex items-center text-neutral-600 space-x-2">
                                            <span> 06:00-14:00</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='outer-container mt-2'>
                    <h4 className='text-2xl font-bold text-center'>Searching in a specific location?</h4>
                    <div className='px-5 pt-1 pb-8 themeRounded bg-white mt-5'>
                        <div className='grid gap-4 mt-8 md:grid-cols-4'>
                            {['England', 'Scotland', 'Wales', 'London', 'Leicester', 'Wolverhampton', 'Nottingham', 'Sheffield'].map((item, index) => (
                                <Link href={`/car-boot-sales/location/${item}`} className='text-[#6a90da] font-[450] hover:underline w-fit' key={index}>Car Boot Sales in {item}</Link>
                            ))}
                        </div>
                        <div className='mt-5 text-center flex justify-center'>
                            <Link href="/car-boot-sales" className='flex justify-center w-fit'>
                                <Button design='secondary-outline' text={
                                    <div className='flex items-center gap-2'>
                                        <span>View all locations</span>
                                        <ArrowRight size={20} />
                                    </div>
                                } className='!w-[20em]' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomePage