"use client"

import Head from 'next/head'
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import Button from '@/components/form/button';
import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

export default function Category() {
  return (
  <>
    <Head>
        <title>My page title</title>
      </Head>
            <main className=" my-[1em]">
        <div className='outer-container'>
          <h1 className='text-2xl font-bold'>Car Boot Sales</h1>
          <p className='text-gray-600'>Discover top-rated car boot sales across the UK. View listings, schedules, and visitor ratings.</p>
          <div className='grid gap-4 mt-8'>
            <div className="flex">
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <Image 
                  src="https://images.unsplash.com/photo-1465225314224-587cd83d322b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"  
                    width={500}
                  height={500}
                  alt="Picture of the author"
                  className='absolute inset-0 w-full h-full object-cover'
                  />
              </div>
              <div className="md:p-6 md:w-2/3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2 py-1 leading-none bg-green-100 text-success rounded-full font-semibold uppercase tracking-wide text-xs mb-2">Open Today</span>
                    <h3 className="text-xl font-bold font-['Inter'] mb-2">Wimbledon Car Boot Sale</h3>
                  </div>
                  <div className="flex items-center bg-primary-light bg-opacity-10 px-2 py-1 rounded text-primary">
                    <Star size={18}/>
                    <span className="font-medium">4.8</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center text-neutral-600 space-x-2">
                    <MapPin size={18}/>
                    <span>Church Road, Wimbledon, London</span>
                  </div>
                  <div className="flex items-center text-neutral-600 space-x-2">
                    <Clock size={18}/>
                    <span> 06:00-14:00</span>
                  </div>
                </div>
                <p className="text-neutral-600 mb-4">One of London's most popular car boot sales, featuring over 200 stalls with everything from antiques to children's toys. Great food vendors and free parking available.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Indoor</span>
                  <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Weekend</span>
                  <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Family-friendly</span>
                  <span className="inline-block px-2 py-1 leading-none bg-neutral-100 text-neutral-800 rounded-full text-xs">Free parking</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 text-sm">Last updated: 14 minutes ago</span>
                  <Link href="/car-boot-sales/1234/wimbledon-car-boot-sale" className="inline-flex items-center text-primary font-medium hover:text-primary-dark">
                    View Details
                    <ArrowRight size={18}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-[#fafafa]'>
          <div className='outer-container mt-10'>
            <h4 className='text-2xl font-bold'>Browse Car Boot Sales by Location</h4>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6'>
              <a href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                  <span className="font-medium text-neutral-800">London</span>
                </a>
              <a href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                  <span className="font-medium text-neutral-800">Manchester</span>
                </a>
              <a href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                  <span className="font-medium text-neutral-800">Leeds</span>
                </a>
              <a href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                  <span className="font-medium text-neutral-800">Birmingham</span>
                </a>
              <a href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                  <span className="font-medium text-neutral-800">Bristol</span>
                </a>
              <a href="/car-boot-sales/london/" className="bg-white p-4 rounded-md shadow-sm border border-neutral-100 hover:shadow-md transition flex items-center justify-center">
                  <span className="font-medium text-neutral-800">Edinburgh</span>
                </a>
            </div>
          </div>
        </div>
        {/* Featured Listings box-shadow: box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px; */}
        {/* <ListingsList 
          title="Featured Car Boot Sales"
          description="Discover top-rated car boot sales across the UK. View listings, schedules, and visitor ratings."
        /> */}

        {/* Related Locations */}
        {/* <RelatedLocations /> */}

        {/* Categories */}
        {/* <Categories /> */}

        {/* SEO Metrics */}
        {/* <SEOMetrics /> */}
      </main>
  </>
  );
}