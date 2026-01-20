"use client";

import Link from 'next/link';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';
import BreadCrumbs from '../breadcrumbs';
import { useState } from 'react';
import { ListingType } from '@/type/model/ListingType';
import useApiRequest from '@/libs/useApiRequest';
import ListingTemplate from '../ui/ListingTemplate';

interface ByLocationIdProps {
  location: string;
  category: string
}

export default function ByLocationId({ location, category }: ByLocationIdProps) {
  category = decodeURIComponent(category);
  category = strReplace(category, '-', ' ');

  const { Get } = useApiRequest();
  const [currentPage,] = useState<number>(1);
  const [queryParams,] = useState<string>('');

  const { data: listings } = Get(`/car-boot?page=${currentPage}&region=${location}${queryParams}`) as { data: { items: ListingType[] }, loading: boolean };

  return (
    <main className="bg-[#f3f7fe]">
      <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: category, href: `/${strReplace(category, ' ', '-')}` }, { name: location }]} />
      <div className='outer-container'>
        <h1 className='text-2xl font-bold'>{ucWords(category)} in <span className='capitalize'>{location}</span></h1>
        <p className='text-gray-600'>Discover top-rated {category} in <span className='capitalize'>{location}</span>. View listings, schedules, and visitor ratings.</p>
        <div className='mt-5'>
          <div className='grid gap-4 mt-8 md:grid-cols-4'>
            {listings?.items?.map((item: ListingType, index: number) => (
              <ListingTemplate listing={item} key={index} />
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
