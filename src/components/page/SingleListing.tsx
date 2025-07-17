"use client";

import Image from 'next/image';
import { Accessibility, Baby, Banknote, Car, Clock, CreditCard, Info, MapPin, Shield, Star, Users, Utensils, Heart, Camera, Wifi, Volume2, Coffee, Trash2 } from 'lucide-react';
import Button from '../form/button';
import BreadCrumbs from '../breadcrumbs';
import { strReplace, ucWords } from '@/utils/helper-support';
import RelatedListing from './RelatedListing';
import useApiRequest from "@/hooks/api-request/request";
import { ListingType } from "@/type/model/ListingType";
import { useEffect, useState, useCallback } from "react";

interface ByLocationIdProps {
    slug: string;
    category: string;
    location: string;
}

export default function SingleListing({ category, location, slug }: ByLocationIdProps) {
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
                                { name: category, href: `/${strReplace(category, ' ', '-')}` },
                                { name: location, href: `/${strReplace(category, ' ', '-')}/location/${strReplace(location, ' ', '-')}` },
                                { name: `${strReplace(slug, '-', ' ')}` }]}
                                backText='Back to search results'
                            />
                    <div className="outer-container md:flex gap-8">
                        <div className="md:w-3/4">
                            <h1 className="text-2xl md:text-3xl font-bold font-['Inter'] mb-2">{listing.name}</h1>
                            <div className="flex items-center text-neutral-600 space-x-2">
                                <MapPin size={18} />
                                <span>Old Trafford, Manchester, M16 0RA</span>
                            </div>
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
                                        <span>6:00am - 10:00pm</span>
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
                            <div className="relative h-64 sm:h-96 overflow-hidden mt-5 themeRounded">
                                <Image
                                    src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Old Trafford Boot Sale"
                                    className="w-full h-full object-cover"
                                    width={800}
                                    height={600}
                                />
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
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Car size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Free Parking</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Utensils size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Food & Drink</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <CreditCard size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">ATM/Cash point</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Accessibility size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Disabled Access</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Baby size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Baby Changing</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Shield size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Security</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Car size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Information Point</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Trash2 size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Water Disposal</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Coffee size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Cafe</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Wifi size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Free Wifi</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Camera size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Photography</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Volume2 size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">PA System</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Heart size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Dog Friendly</p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center border border-gray-200 p-3 themeRounded'>
                                        <span className="inline-block p-2 bg-secondary text-white rounded-full text-sm">
                                            <Users size={15} />
                                        </span>
                                        <p className="text-[14px] mt-2 font-[500] text-gray-600 text-center">Family Friendly</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-xl font-bold font-['Inter'] mb-3">Location</h2>
                                <div className="bg-neutral-50 rounded-lg h-64 overflow-hidden">
                                    <iframe
                                        title="Map of Old Trafford Boot Sale"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=53.4631,-2.2913&zoom=15"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className=" overflow-hidden">
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
                                "image": "https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            })
                        }}
                    />
                </main>
            )
        )
    );
}
