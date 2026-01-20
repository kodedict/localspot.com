import { ListingType } from "@/type/model/ListingType";
import { ImageIcon, MapPin } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const ListingTemplate = ({
    listing
}: {
    listing: ListingType
}) => {

    return (
        <Link href={`/${(listing.category === 'nil' || !listing.category) ? 'car-boot-sales' : listing.category}/${listing.region || 'london'}/${listing.code}/${listing.slug}`}>
            <div className="themeRounded bg-white">
                <div className="relative h-[10em] bg-gray-100 flex justify-center listings-center">
                    {listing.date && <div className='absolute top-2 left-2 bg-white p-2 themeRounded text-xs z-10'>
                        <span className='uppercase text-[#7b9ada] font-bold'>{moment(listing.date).format('ddd D')}</span>
                        <p className='uppercase font-bold text-gray-500'>{moment(listing.date).format('MMM')}</p>
                    </div>}
                    {listing.weather_outlook && <div className='absolute top-2 right-2 bg-white p-2 themeRounded text-xs z-10'>
                        <span className='uppercase font-bold'>{listing.weather_outlook}</span>
                    </div>}
                    {listing?.images?.[0] ? <Image
                        src={listing?.images[0]}
                        width={500}
                        height={500}
                        alt={listing.name}
                        className='absolute inset-0 w-full h-full object-cover'
                    /> : <div className='bg-[#f5f5f5] h-10 w-10 rounded-full flex justify-center listings-center text-[#cacaca] border border-[#e7e7e7]'>
                        <ImageIcon size={20} />
                    </div>}
                </div>
                <div className="md:p-4">
                    <div>
                        <h3 className="text-md font-bold font-['Inter'] mb-2 capitalize">{listing.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm mb-4">
                        {listing.address && <div className="flex listings-center text-neutral-600 space-x-2">
                            <MapPin size={18} />
                            <span>{listing.address}</span>
                        </div>}
                        <div className="flex listings-center text-neutral-600 space-x-2">
                            <span>
                                {(listing.opening_time && listing.closing_time) ? <span>{moment(listing.opening_time, 'HH:mm:ss').format('hh:mm A')} - {moment(listing.closing_time, 'HH:mm:ss').format('hh:mm A')}</span> : 'Closed'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListingTemplate;