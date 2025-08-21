export interface ListingType {
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
    opening_time:string;
    closing_time:string;
    borough: string;
    region: string;
    subregion: string;
    postcode: string;
    facilities: {
        free_parking: boolean;
        food_drink: boolean;
        atm_cash: boolean;
        disabled_access: boolean;
        baby_changing: boolean;
        security: boolean;
        information_point: boolean;
        water_disposal: boolean;
        cafe: boolean;
        free_wifi: boolean;
        photography: boolean;
        pa_system: boolean;
        dog_friendly: boolean;
        family_friendly: boolean;
    };
    upcoming_dates?: string[]; // Optional, for future dates
}