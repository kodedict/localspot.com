"use client";

import Image from 'next/image';
import { ImageIcon, MapPin } from 'lucide-react';
import Link from 'next/link';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';
import BreadCrumbs from '../breadcrumbs';
import { useEffect, useState } from 'react';
import useApiRequest from '@/hooks/api-request/request';
import { ListingType } from '@/type/model/ListingType';
import moment from 'moment';

interface ByLocationIdProps {
  location: string;
  category: string
}

export default function ByLocationId({ location, category }: ByLocationIdProps) {
  category = decodeURIComponent(category);
  category = strReplace(category, '-', ' ');

  const { ReturnGet } = useApiRequest();
  const [currentPage,] = useState<number>(1);
  const [queryParams,] = useState<string>('');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const GetListing = (async () => {
      const request = await ReturnGet(`car-boot?page=${currentPage}&region=${location}${queryParams}`);
      if (!request) return;
      setListings(request?.items);
    });
    GetListing();
  }, [currentPage, location, queryParams, ReturnGet]);


  return (
    <main className="bg-[#f3f7fe]">
      <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: category, href: `/${strReplace(category, ' ', '-')}` }, { name: location }]} />
      <div className='outer-container'>
        <h1 className='text-2xl font-bold'>{ucWords(category)} in <span className='capitalize'>{location}</span></h1>
        <p className='text-gray-600'>Discover top-rated {category} in <span className='capitalize'>{location}</span>. View listings, schedules, and visitor ratings.</p>
        <div className='mt-5'>
          <div className='grid gap-4 mt-8 md:grid-cols-4'>
            {listings.map((item: ListingType, index: number) => (
              <Link key={index} href={`/${(item.category === 'nil' || !item.category) ? 'car-boot-sales' : item.category}/${item.region || 'london'}/${item.code}/${item.slug}`}>
                <div className="themeRounded bg-white">
                  <div className="relative h-[10em] bg-gray-100 flex justify-center items-center relative">
                    {item.date && <div className='absolute top-2 left-2 bg-white p-2 themeRounded text-xs z-10'>
                      <span className='uppercase text-[#7b9ada] font-bold'>{moment(item.date).format('ddd D')}</span>
                      <p className='uppercase font-bold text-gray-500'>{moment(item.date).format('MMM')}</p>
                    </div>}
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
                  <div className="md:p-4">
                    <div>
                      <h3 className="text-md font-bold font-['Inter'] mb-2 capitalize">{item.name}</h3>
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-[#fafafa]'>
        <div className='outer-container mt-2'>
          <h4 className='text-2xl font-bold text-center capitalize'>Other {category} Locations</h4>
          <div className='px-5 pt-1 pb-8 themeRounded bg-white mt-5'>
            <div className='grid gap-4 mt-8 md:grid-cols-4'>
              {['England', 'Scotland', 'Wales', 'London', 'Leicester', 'Wolverhampton', 'Nottingham', 'Sheffield'].map((item, index) => (
                <Link href={`/${strReplace(category, ' ', '-')}/location/${item}`} className='text-[#6a90da] font-[450] hover:underline w-fit' key={index}>Car Boot Sales in {item}</Link>
              ))}
            </div>
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
            "description": `Discover top-rated ${ucWords(category)} in ${ucFirst(location)} across the UK. View listings, schedules, and visitor ratings.`,
            "url": `https://www.carbootjunction.com/${category}/${location}`,
            "image": "https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          })
        }}
      />
    </main>
  );
}
