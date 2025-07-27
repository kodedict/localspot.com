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
import moment from 'moment';
import { useCoordinates } from '../GetCoordinate';

const HomePage = () => {
    const { coordinates, error } = useCoordinates();
    const [upcomingSales, setUpcomingSales] = useState([]);
    const [popularSales, setPopularSales] = useState([]);
    const navigate = useRouter();
    const {
        ReturnGet,
    } = useApiRequest();

    useEffect(() => {
        if (coordinates && !error) {
            console.log("Coordinates:", coordinates);
            // You can call any external handler here
        }
    }, [coordinates]);


    const getUpcomingSales = useCallback(async () => {
        const request = await ReturnGet(`car-boot?filterBy=upcoming`);
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
                <div className='mx-auto md:w-1/2 w-5/6'><SearchComponent onSearch={onSearch} /></div>

                <div className='outer-container mt-5'>
                    <h4 className='text-2xl font-bold'>Upcoming Car Boot Sales</h4>
                    <p className='text-gray-600'>Find car boot sales happening soon near you with confirmed dates, times and weather outlook.</p>
                    <div className='grid gap-4 mt-8 md:grid-cols-4'>
                        {upcomingSales.map((item: ListingType, index: number) => (
                            <Link href={`/${(item.category === 'nil' || !item.category) ? 'car-boot-sales' : item.category}/${item.region || 'england'}/${item.code}/${item.slug}`} key={index} className="themeRounded bg-white">
                                <div className="relative h-[10em] bg-gray-100">
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
                                        <h3 className="text-md font-bold font-['Inter'] mb-2">{item.name}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm mb-4">
                                        {item.address && <div className="flex items-center text-neutral-600 space-x-2">
                                            <MapPin size={18} />
                                            <span>{item.address}</span>
                                        </div>}
                                        <div className="flex items-center text-neutral-600 space-x-2">
                                            {(item.opening_time && item.closing_time) ? <span>{moment(item.opening_time, 'HH:mm:ss').format('hh:mm A')} - {moment(item.closing_time, 'HH:mm:ss').format('hh:mm A')}</span> : 'Closed'}
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
                        {popularSales.map((item: ListingType, index: number) => (
                            <Link href={`/${(item.category === 'nil' || !item.category) ? 'car-boot-sales' : item.category}/${item.region || 'england'}/${item.code}/${item.slug}`} key={index} className="themeRounded bg-white">
                                <div className="relative h-[10em] bg-gray-100">
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
                                        <h3 className="text-md font-bold font-['Inter'] mb-2">{item.name}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm mb-4">
                                        {item.address && <div className="flex items-center text-neutral-600 space-x-2">
                                            <MapPin size={18} />
                                            <span>{item.address}</span>
                                        </div>}
                                        <div className="flex items-center text-neutral-600 space-x-2">
                                            {(item.opening_time && item.closing_time) ? <span>{moment(item.opening_time, 'HH:mm:ss').format('hh:mm A')} - {moment(item.closing_time, 'HH:mm:ss').format('hh:mm A')}</span> : 'Closed'}
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