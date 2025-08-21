"use client";

import { Accessibility, Baby, Banknote, Car, Clock, CreditCard, Info, MapPin, Shield, Star, Users, Utensils, Heart, Camera, Wifi, Volume2, Coffee, Trash2, Calendar, Phone } from 'lucide-react';
import Button from '../form/button';
import BreadCrumbs from '../breadcrumbs';
import { strReplace, ucWords } from '@/utils/helper-support';
// import RelatedListing from './RelatedListing';
import useApiRequest from "@/hooks/api-request/request";
import { ListingType } from "@/type/model/ListingType";
import { useEffect, useState, useCallback } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import moment from 'moment';
import Image from 'next/image';
import MiniModal from '../modal/mini-modal';
import RelatedListing from './RelatedListing';


interface ByLocationIdProps {
    slug: string;
    category: string;
    location: string;
}

export default function SingleListing({ category, location, slug }: ByLocationIdProps) {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { ReturnGet } = useApiRequest();
    const [listing, setListing] = useState<ListingType>({} as ListingType);
    const [loading, setLoading] = useState<boolean>(true);
    const GetListing = useCallback(async () => {
        setLoading(true);
        const request = await ReturnGet(`car-boot/${slug}`);
        setLoading(false);
        if (!request) return;
        setListing(request);
    }, [ReturnGet, slug]);

    useEffect(() => {
        GetListing();
    }, [GetListing]);

    const [listingUpdate, setListingUpdate] = useState([]);

    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');

    const GetListingUpdate = useCallback(async () => {
        const request = await ReturnGet(`admin/car-boot/updates?page=${currentPage}${queryParams}`);
        if (!request) return;
        setListingUpdate(request.items);
    }, [ReturnGet, currentPage, queryParams]);

    useEffect(() => {
        GetListingUpdate();
    }, [GetListingUpdate]);

    const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

    const facilitiesIcon = [
        { tag: 'free_parking', name: 'Free Parking', icon: <Car size={15} />, color: '#4CAF50' },
        { tag: 'food_drink', name: 'Food & Drink', icon: <Utensils size={15} />, color: '#FF9800' },
        { tag: 'atm_cash', name: 'ATM/Cash', icon: <CreditCard size={15} /> , color: '#2196F3' },
        { tag: 'disabled_access', name: 'Disabled Access', icon: <Accessibility size={15} />  , color: '#9C27B0' },
        { tag: 'baby_changing', name: 'Baby Changing', icon: <Baby size={15} />  , color: '#E91E63' },
        { tag: 'security', name: 'Security', icon: <Shield size={15} /> , color: '#F44336' },
        { tag: 'information_point', name: 'Information Point', icon: <Phone size={15} /> , color: '#3F51B5' },
        { tag: 'water_disposal', name: 'Water Disposal', icon: <Trash2 size={15} /> , color: '#FF5722' },
        { tag: 'cafe', name: 'Cafe', icon: <Coffee size={15} /> , color: '#795548' },
        { tag: 'free_wifi', name: 'Free WiFi', icon: <Wifi size={15} />  , color: '#009688' },
        { tag: 'photography', name: 'Photography', icon: <Camera size={15} />  , color: '#c4b530' },
        { tag: 'pa_system', name: 'PA System', icon: <Volume2 size={15} />  , color: '#8BC34A' },
        { tag: 'dog_friendly', name: 'Dog Friendly', icon: <Heart size={15} /> , color: '#FF4081' },
        { tag: 'family_friendly', name: 'Family Friendly', icon: <Users size={15} /> , color: '#3bc4ff' },
    ];
    return (
        loading ? (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        ) : (
            !listing.code ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-500">Listing not found.</p>
                </div>
            ) : (
                <main className="">
                    <BreadCrumbs navs={[
                        { name: 'Home', href: '/' },
                        { name: strReplace(category, '-', ' '), href: `/${strReplace(category, ' ', '-')}` },
                        // { name: strReplace(location, '-', ' '), href: `/${strReplace(category, ' ', '-')}/location/${strReplace(location, ' ', '-')}` },
                        ...listing.region ? [{ name: strReplace(listing.region, '-', ' '), href: `/${strReplace(category, ' ', '-')}/location/${strReplace(listing.region, ' ', '-')}` }] : [],
                        ...listing.subregion ? [{ name: strReplace(listing.subregion, '-', ' '), href: `/${strReplace(category, ' ', '-')}/location/${strReplace(listing.region, ' ', '-')}/${strReplace(listing.subregion, ' ', '-')}` }] : [],
                        ...listing.borough ? [{ name: strReplace(listing.borough, '-', ' '), href: `/${strReplace(category, ' ', '-')}/location/${strReplace(listing.region, ' ', '-')}/${strReplace(listing.subregion, ' ', '-')}/${strReplace(listing.borough, ' ', '-')}` }] : [],
                        { name: `${strReplace(slug, '-', ' ')}` }]}
                        backText='Back to search results'
                    />
                    <div className="outer-container md:flex gap-4">
                        <div className="md:w-3/4">
                            <h1 className="text-2xl md:text-3xl font-bold font-['Inter'] mb-2">{listing.name}</h1>
                            {listing.address && <div className="flex items-center text-neutral-600 space-x-2">
                                <MapPin size={18} />
                                <span>{listing.address}</span>
                            </div>}
                            <div className='border border-gray-200 p-5 themeRounded mt-3'>
                                <div className='flex items-center justify-between'>
                                    <span className='font-bold'>Quick info</span>
                                    <Button design='secondary' text={<div className='flex items-center gap-4'>
                                        <Info size={18} />
                                        <p className='font-[450]'>Quick info</p>
                                    </div>} />
                                </div>
                                <div className='grid gap-4 md:grid-cols-2 mt-5 text-[15px] text-gray-600 font-[450]'>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Clock size={15} className='text-secondary' />
                                            <span>Opening Hours</span>
                                        </div>
                                        {(listing.opening_time && listing.closing_time) ? <span>{moment(listing.opening_time, 'HH:mm:ss').format('hh:mm A')} - {moment(listing.closing_time, 'HH:mm:ss').format('hh:mm A')}</span> : 'Closed'}
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Utensils size={15} className='text-secondary' />
                                            <span>Refreshments</span>
                                        </div>
                                        <span className='px-4 py-1 font-bold bg-green-100 text-success rounded-full'>Available</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Users size={15} className='text-secondary' />
                                            <span>Avg. Sellers</span>
                                        </div>
                                        <span>300+</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Banknote size={15} className='text-secondary' />
                                            <span>Seller Fee</span>
                                        </div>
                                        <span>12 per car</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Car size={15} className='text-secondary' />
                                            <span>Parking</span>
                                        </div>
                                        <span className='px-4 py-1 font-bold bg-green-100 text-success rounded-full'>Free</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <Star size={15} className='text-secondary' />
                                            <span>Rating</span>
                                        </div>
                                        <span>4.9</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative  overflow-hidden mt-5 themeRounded">
                                <Splide aria-label={listing.name} options={{
                                    type: 'loop',
                                    autoplay: true,
                                    fixedHeight: 400
                                }}>
                                    {listing?.images?.map((image, index) => (
                                        <SplideSlide key={index}>
                                            <Image src={image} alt={listing.name} layout='fill' />
                                        </SplideSlide>
                                    ))}
                                </Splide>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-xl font-bold font-['Inter'] mb-3">Overview</h2>
                                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                                    {listing.description}
                                </p>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-xl font-bold font-['Inter'] mb-3">Facilities & Amenities</h2>
                                <div className="grid md:grid-cols-6 gap-2">
                                    {facilitiesIcon.map((facility, index) => (
                                        <div key={index} className={`flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded relative ${listing.facilities?.[facility.tag as keyof typeof listing.facilities] ? '' : 'opacity-50'}`}>
                                            {listing.facilities?.[facility.tag as keyof typeof listing.facilities] ? <div className='bg-green-500 p-1 rounded-full absolute right-1 top-1'></div> : ''}
                                            <span style={{ backgroundColor: listing.facilities?.[facility.tag as keyof typeof listing.facilities] ? facility.color : '' }} className={`inline-block p-2 rounded-full text-sm ${listing.facilities?.[facility.tag as keyof typeof listing.facilities] ? ` text-white` : 'bg-gray-200 text-gray-600'}`}>
                                                {facility.icon}
                                            </span>
                                            <p className={`text-[14px] mt-2 font-[500] text-center ${listing.facilities?.[facility.tag as keyof typeof listing.facilities] ? 'text-gray-600' : 'text-gray-500'}`}>
                                                {facility.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {(listing.latitude && listing) && <div className="mt-6">
                                <h2 className="text-xl font-bold font-['Inter'] mb-3">Location</h2>
                                <div className="bg-neutral-50 rounded-lg h-64 overflow-hidden">
                                    <iframe
                                        title={listing.name}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        src={`https://www.google.com/maps/embed/v1/place?key=${googleKey}&q=${listing.latitude},${listing.longitude}&zoom=15`}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>}
                        </div>
                        <div className="md:w-1/4">
                            <div className='bg-[#fef8f6] border border-[#ed9c80] p-4 themeRounded'>
                                <div className='flex flex-col items-center gap-2'>
                                    <div className='bg-[#fbdfd4] h-10 w-10 rounded-full flex justify-center items-center text-[#e47850]'>
                                        <Calendar size={18} />
                                    </div>
                                    <h2 className='font-bold mt-1 text-[#474646] text-sm'>Next Car Boot Sales</h2>
                                </div>
                                <div className='flex justify-between mt-3 items-center text-sm'>
                                    {listing.date ? <>
                                        <div>{moment(listing.date).format('dddd, MMM Do')}</div>
                                        <div>
                                            {(listing.opening_time && listing.closing_time) ? <span>{moment(listing.opening_time, 'HH:mm:ss').format('hh:mm A')} - {moment(listing.closing_time, 'HH:mm:ss').format('hh:mm A')}</span> : ''}</div></>

                                        : <p>No upcoming car boot sales</p>}
                                </div>
                                {Array.isArray(listing.upcoming_dates) && listing.upcoming_dates.length > 0 &&
                                    <div>
                                        <Button className='w-full mt-3 font-bold' text="View All Dates & Time" onClick={() => setOpenModal(true)} />
                                        <MiniModal open={openModal} setClose={() => setOpenModal(false)} title="Upcoming Dates">
                                            <div>
                                                {listing.upcoming_dates.map((date, index) => (
                                                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                                                        <span>{moment(date).format('dddd, MMM Do')}</span>
                                                        <span>{(listing.opening_time && listing.closing_time) ? `${moment(listing.opening_time, 'HH:mm:ss').format('hh:mm A')} - ${moment(listing.closing_time, 'HH:mm:ss').format('hh:mm A')}` : ''}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </MiniModal>
                                    </div>
                                }
                            </div>
                            <div className='mt-4 p-4 themeRounded bg-white grid gapt-4 border border-gray-200 shadow-xs'>
                                <h2 className='font-bold text-md mb-3 text-gray-600'>Recent Updates</h2>
                                <div className='grid gap-4'>
                                    {listingUpdate.map((update: any, index: number) => (
                                        <div key={index} className={`p-3 border-l-3 ${update.status === 'danger' ? 'bg-red-50 text-red-600' : update.status === 'info' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                            <div className='flex justify-between items-center flex-wrap'>
                                                <h3 className='font-bold text-sm'>{update.title}</h3>
                                                <p className='text-xs'>{moment(update.created_at).fromNow()}</p>
                                            </div>
                                            <p className='text-sm mt-1'>{update.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <RelatedListing />

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Product",
                                "name": listing.name,
                                "description": `${ucWords(listing.name)} in ${ucWords(category)} at ${ucWords(location)}. View listings, schedules, and visitor ratings.`,
                                "url": `https://www.carbootjunction.com/${listing.name}`,
                                "image": listing.images?.[0] || "",
                            })
                        }}
                    />
                </main>
            )
        )
    );
}
