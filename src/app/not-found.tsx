import Link from 'next/link'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '404 - Page Not Found | LocalSpot',
  description: 'The page you are looking for does not exist or has been moved.',
}

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
      <div className="max-w-md text-center">
        <h2 className="mb-8 font-extrabold text-6xl text-gray-700">
          <span className="sr-only">Error</span>404
        </h2>
        <p className="text-2xl font-semibold md:text-3xl mb-8">Sorry, we couldn&apos;t find this page.</p>
        <p className="mb-8 text-gray-600">
          But don&apos;t worry, you can find plenty of car boot sales on our homepage.
        </p>
        <Link href="/" className="px-8 py-3 font-semibold rounded bg-primary text-white hover:bg-primary/90">
          Back to homepage
        </Link>
      </div>
    </div>
  )
}