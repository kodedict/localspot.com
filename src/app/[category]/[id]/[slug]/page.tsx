"use client"

import Head from 'next/head'
import InputField from '@/components/form/input-field';
import SelectField from '@/components/form/select-field';
import Button from '@/components/form/button';
import Image from 'next/image';
import { ArrowRight, Clock, Map, MapPin, Star } from 'lucide-react';

export default function SingleListing() {
  return (
  <>
    <Head>
        <title>My page title</title>
      </Head>
      <main className=" my-[5em]">
        <div className="container mx-auto px-4">
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-neutral-100">
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
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-['Inter'] mb-2">Old Trafford Boot Sale</h1>
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
          Large boot sale next to the famous stadium. Wide variety of goods from household items to sports memorabilia.
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
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-100">
        <span className="text-neutral-500 text-sm">Last updated: about 1 hour ago</span>
        <Button design='primary' text={`${<Map size={18}/>}Get Directions`}/>
      </div>
    </div>
  </div>
</div>

      </main>
  </>
  );
}