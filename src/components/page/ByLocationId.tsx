"use client";

import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { strReplace, ucWords } from '@/utils/helper-support';
import BreadCrumbs from '../breadcrumbs';

interface ByLocationIdProps {
  location: string;
  category: string
}

export default function ByLocationId({ location, category }: ByLocationIdProps) {
  category = decodeURIComponent(category);
  category = strReplace(category, '-', ' ');
  return (
    <main className="bg-[#f3f7fe]">
      <BreadCrumbs navs={[{ name: 'Home', href: '/' }, { name: category, href: `/${strReplace(category, ' ', '-')}` }, { name: location }]} />
      <div className='outer-container'>
        <h1 className='text-2xl font-bold'>{ucWords(category)} in <span className='capitalize'>{location}</span></h1>
        <p className='text-gray-600'>Discover top-rated {category} in <span className='capitalize'>{location}</span>. View listings, schedules, and visitor ratings.</p>
        <div className='mt-5'>
          <div className='grid gap-4 mt-8 md:grid-cols-4'>
            <div className="themeRounded bg-white">
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
                  <h3 className="text-md font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
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
            </div>
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
    </main>
  );
}
