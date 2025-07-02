"use client";

import Image from 'next/image';
import { Clock, MapPin, Star } from 'lucide-react';
import Button from '../form/button';
import BreadCrumbs from '../breadcrumbs';
import { strReplace, ucWords } from '@/utils/helper-support';
import RelatedListing from './RelatedListing';
import useApiRequest from "@/hooks/api-request/request";
import { ListingType } from "@/type/model/ListingType";
import { useEffect, useState, useCallback } from "react";
import moment from 'moment';

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
    }, []);
    return (
            loading ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-gray-500">Loading...</p>
                </div>
            ) : (
                ! listing.code ? (
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-gray-500">Listing not found.</p>
                    </div>
                ) : (
                        <main className="my-[2em]">
                            <BreadCrumbs navs={[
                                { name: 'Home', href: '/' },
                                { name: category, href: `/${strReplace(category, ' ', '-')}` },
                                { name: location, href: `/${strReplace(category, ' ', '-')}/${strReplace(location, ' ', '-')}` },
                                { name: `${strReplace(slug, '-', ' ')}` }]} />
                            <div className="outer-container">
                                <div className=" overflow-hidden">
                                    <div className="relative h-64 sm:h-96 overflow-hidden">
                                        <Image
                                            src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                            alt="Old Trafford Boot Sale"
                                            className="w-full h-full object-cover"
                                            width={800}
                                            height={600}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-block px-3 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs">
                                                Open Today
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 flex items-center bg-white bg-opacity-90 px-3 py-1 rounded-full text-primary shadow-sm">
                                            <Star size={18} />
                                            <span className="font-medium">4.2</span>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                                            <div>
                                                <h1 className="text-2xl md:text-3xl font-bold font-['Inter'] mb-2">{listing.name}</h1>
                                                <div className="flex flex-wrap gap-4 text-sm">
                                                    <div className="flex items-center text-neutral-600 space-x-2">
                                                        <MapPin size={18} />
                                                        <span>Old Trafford, Manchester, M16 0RA</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0">
                                                <div className="inline-flex items-center bg-neutral-50 px-3 py-2 rounded-md text-neutral-800 space-x-2">
                                                    <Clock size={18} />
                                                    <span> 08:00-14:00
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold font-['Inter'] mb-3">About This Car Boot Sale</h2>
                                            <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                                                {listing.description}
                                            </p>
                                        </div>
                                        <div className="mb-6">
                                            <h2 className="text-xl font-bold font-['Inter'] mb-3">Features</h2>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm">Outdoor</span>
                                                <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm">Saturday</span>
                                                <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-sm">Free parking</span>
                                            </div>
                                        </div>
                                        <div className="mb-6">
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
                                        <div className="md:flex-row flex flex-col justify-between items-center mt-8 pt-6 border-t border-neutral-100 space-y-4">
                                            <span className="text-neutral-500 text-sm">Last updated: {moment(listing.updated_at).fromNow()}</span>
                                            <Button design='primary' text={`Get Directions`} />
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
                                        "image": "https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    })
                                }}
                            />
                        </main>
                )
            )
    );
}
