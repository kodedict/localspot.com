"use client"

import Head from 'next/head'
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import Button from '@/components/form/button';
import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
  <>
    <Head>
        <title>My page title</title>
      </Head>
            <main className=" mb-[5em]">
            {/* Hero Section */}
            <section className="bg-primary text-white py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-6 font-['Inter']">
                    Find the Best Car Boot Sales in Your Area
                  </h1>
                  <p className="text-lg mb-8 text-blue-100">
                    Discover top-rated car boot sales, view schedules, and find hidden treasures
                  </p>
                </div>
              </div>
            </section>
              <div style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"  }} className='bg-white md:w-1/2 mx-auto -mt-[4em] p-5 grid gap-4'>
                  <InputField placeholder='Enter postcode or location (e.g., SW19 5AE)' type='search' inputClass='w-full'/>
                  <SelectField placeholder='Select Distance' inputClass='w-full' />
                  <Button design='primary' text='Search'/>
              </div>

        <div className='outer-container mt-10'>
          <h4 className='text-2xl font-bold'>Featured Car Boot Sales</h4>
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
        <Link href="/car-boot-sales" className='outer-container flex justify-center'>
          <Button design='primary-outline' text='View More Car Boot Sales' className='!w-[20em]'/>
        </Link>
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