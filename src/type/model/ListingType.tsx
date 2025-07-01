interface ListingType {
    name: string;
    code: string;
    slug: string;
    description: string;
    location_code: string;
    district: string;
    latitude: number;
    longitude: number;
    address: string;
    category: string;
    event_mode: string;
    date: string;
    time: string;
    images: string[]; // or another appropriate type
    is_parking_available: boolean;
    is_active: boolean;
    updated_at: string;
    created_at: string;
    entry_fee: string;
    weather_outlook: string;
}