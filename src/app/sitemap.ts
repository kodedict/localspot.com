import { MetadataRoute } from 'next'
import { ListingType } from '@/type/model/ListingType'

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${API_URL}/car-boot`, {
    next: { revalidate: 3600 }, // 1 hour
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return []
  }

  const json: { data: { items: ListingType[] } } = await res.json()

  return json.data.items.map((listing) => ({
    url: `https://localboot.com/car-boot/${(listing.category === 'nil' || !listing.category) ? 'car-boot-sales' : listing.category}/${listing.region || 'london'}/${listing.code}/${listing.slug}`,
    lastModified: new Date(listing.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
}
