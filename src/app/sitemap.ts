// app/sitemap.ts
import { MetadataRoute } from 'next'
import { ListingType } from '@/type/model/ListingType'

const API_URL = process.env.NEXT_PUBLIC_API_URL!
const BASE_URL = 'https://localboot.com'

interface ApiResponse {
  data: {
    items: ListingType[]
    page: number
    hasMorePages: boolean
    nextPage: number
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let page = 1
  let hasMorePages = true
  const urls: MetadataRoute.Sitemap = []

  while (hasMorePages) {
    const res = await fetch(
      `${API_URL}/car-boot?page=${page}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) break

    const json: ApiResponse = await res.json()

    json.data.items.forEach((listing) => {
      urls.push({
        url: `${BASE_URL}/${listing.slug}`,
        lastModified: new Date(listing.updated_at),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    hasMorePages = json.data.hasMorePages
    page = json.data.nextPage
  }

  return urls
}
