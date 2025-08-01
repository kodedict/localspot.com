"use client"

import { useCallback, useEffect, useState } from "react";
import SearchComponent from "../search-component";
import { strReplace } from "@/utils/helper-support";
import { ImageIcon, MapPin } from "lucide-react";
import useApiRequest from "@/hooks/api-request/request";
import ApiResponseType from "@/type/api-response-type";
import { useRouter } from 'next/navigation';
import { ListingType } from "@/type/model/ListingType";
import Image from "next/image";
import Button from "../form/button";
import Link from "next/link";
import { useCoordinates } from "../GetCoordinate";
import moment from "moment";

export default function SearchPage({ query }: { query: string }) {
    const navigate = useRouter();
    const { coordinates, error } = useCoordinates();
    const [filterEventMode, setFilterEventMode] = useState<string>('');
    const EventModes: string[] = ['outdoor', 'indoor'];

    const [filterByDistance, setFilterByDistance] = useState<string>('miles');
    const DistanceFilter: string[] = ['miles',];//'drive time'
    const [miles, setMiles] = useState<string>('');
    const MileTypes: string[] = ['5', '10', '15', '25'];

    const { ReturnGet } = useApiRequest();
    const [currentPage,] = useState<number>(1);
    const [queryParams, setQueryParams] = useState<string>('');
    const [listings, setListings] = useState([]);
    const [search, setSearch] = useState<string>('');
    const [paginationData, setPaginationData] = useState<ApiResponseType>({} as ApiResponseType);

    const GetListing = useCallback(async () => {
        const request = await ReturnGet(`car-boot?page=${currentPage}&search=${search}&event_mode=${filterEventMode}${queryParams}`);
        if (!request) return;
        setListings(request.items);
        setPaginationData(request);
    }, [ReturnGet, currentPage, queryParams, search, filterEventMode]);

    useEffect(() => {
        setQueryParams('');
        if (miles && coordinates && !error) {
            setQueryParams(`&distance=${miles}&latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
        }
    }, [miles]);


    useEffect(() => {
        GetListing();
    }, [search, GetListing]);

    useEffect(() => {
        if (query && !search) {
            setSearch(strReplace(query, '-', ' '));
        }
    }, [query, search]);

    const onSearch = (search: string) => {
        setSearch(search);
        if (search) {
            search = strReplace(search, ' ', '-');
            //update url
            navigate.replace(`/search/${search}`);
        }
    }

    return (
        <div>
            <div className="bg-secondary py-12 text-center">
                <div className="md:w-1/2 w-5/6 mx-auto">
                    <h1 className="md:text-[3em] text-[1.5em] font-bold text-white mb-5">Browse Car Boot</h1>
                    <SearchComponent value={search} onSearch={onSearch} />
                </div>
            </div>
            <div className="flex md:flex-row flex-col-reverse outer-container mt-5 gap-y-8 gap-4">
                <div className="md:w-1/4 grid gap-4 border border-[#E6EAF0] themeRounded p-5 shadow-sm h-fit">
                    <div>
                        <div className="mb-2 grid gap-2">
                            <h3 className="text-md font-bold">Search Filters</h3>
                            <h3 className="text-sm font-bold">Car boot type</h3>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                {EventModes.map((mode: string, index: number) => (
                                    <div key={index} onClick={() => mode === filterEventMode ? setFilterEventMode('') : setFilterEventMode(mode)} className={`border ${mode === filterEventMode ? 'bg-secondary text-white' : ''} p-2 themeRounded border-gray-200 capitalize cursor-pointer`}>{mode}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 grid gap-2">
                            <h3 className="text-md font-bold">Distance</h3>
                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                                {DistanceFilter.map((mode: string, index: number) => (
                                    <div key={index} onClick={() => setFilterByDistance(mode)} className={`border ${mode === filterByDistance ? 'bg-secondary text-white' : ''} p-2 themeRounded border-gray-200 capitalize cursor-pointer`}>{mode}</div>
                                ))}
                            </div>
                            {MileTypes.map((mode: string, index: number) => (
                                <div key={index} onClick={() => mode === miles ? setMiles('') : setMiles(mode)} className={`${mode === miles ? 'bg-secondary text-white border' : ''} p-2 themeRounded border-gray-200 capitalize cursor-pointer`}>Within {mode} miles</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:w-3/4">
                    <div className="mb-5">
                        <h3>Showing <strong>{paginationData?.items?.length}</strong> of <strong>{paginationData?.total}</strong></h3>
                    </div>
                    <div className="grid gap-4">
                        {listings.map((item: ListingType, index: number) => (
                            <div key={index} className="themeRounded shadow-sm border border-[#E6EAF0] flex flex-col md:flex-row">
                                <div className="md:w-1/3">
                                    <div className="relative h-[10em] bg-gray-100 flex justify-center items-center relative">
                                        <div className="absolute top-2 left-2 z-10">
                                            {item.date && <div className='bg-[#424242] p-1 px-6 rounded-full text-xs text-white font-bold'>
                                                <span className='uppercase'>Next Sale:</span>
                                                &nbsp;
                                                <span className='uppercase'>{moment(item.date).format('dddd, MMM D')}</span>
                                            </div>}
                                        </div>
                                        {item?.images?.[0] ? <Image
                                            src={item?.images[0]}
                                            width={500}
                                            height={500}
                                            alt={item.name}
                                            className='absolute inset-0 w-full h-full object-cover'
                                        /> : <div className='bg-[#f5f5f5] h-10 w-10 rounded-full flex justify-center items-center text-[#cacaca] border border-[#e7e7e7]'>
                                            <ImageIcon size={20} />
                                        </div>}
                                    </div>
                                </div>
                                <div className="md:w-2/3 p-6">
                                    <h1 className="text-md font-bold font-['Inter'] mb-1">{item.name}</h1>
                                    {item.postcode && <span className="text-sm text-neutral-600">{item.postcode}</span>}
                                    {item.address && <div className="flex items-center text-neutral-600 space-x-2">
                                        <MapPin size={18} />
                                        <span>{item.address}</span>
                                    </div>}
                                    <h3 className="text-sm font-bold my-3">Boot type available</h3>
                                    <span className="p-2 rounded-full border text-sm px-8 border-gray-200">{item.event_mode || 'None'}</span>
                                    <div className="mt-5 flex justify-between">
                                        <div></div>
                                        <Link href={`/${(item.category === 'nil' || !item.category) ? 'car-boot-sales' : item.category}/${item.region || 'england'}/${item.code}/${item.slug}`}><Button design='primary' text='View details' /></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}