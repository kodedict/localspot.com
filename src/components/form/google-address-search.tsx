import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Libraries, useLoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["places"] as const;

interface InputState {
    streetAddress?: string;
    country?: string;
    postal_code?: string;
    subregion?: string;
    region?: string;
    borough?: string;
    latitude?: number;
    longitude?: number;
    [key: string]: any;
}

interface GoogleAddressSearchProps {
    placeholder?: string;
    label?: string;
    labelClass?: string;
    value?: string;
    error?: string | null;
    disabled?: boolean;
    onSelectedOption?: (data: InputState) => void;
    inputClass?: string;
    country?: string;
}

const GoogleAddressSearch = ({
    placeholder,
    label = "Address",
    labelClass,
    value,
    error,
    disabled = false,
    onSelectedOption,
    inputClass,
    country = "gb",
}: GoogleAddressSearchProps) => {
    const [, setInput] = useState<InputState>({});
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
        libraries,
    });

    // Optional: Pre-fill input if value is passed
    useEffect(() => {
        if (value && inputRef.current && !inputRef.current.value) {
            inputRef.current.value = value;
        }
    }, [value]);

    const handlePlaceChanged = useCallback(() => {
        const autocomplete = autocompleteRef.current;
        if (!autocomplete) return;

        const place = autocomplete.getPlace();

        if (!place || !place.geometry) {
            setInput({});
            return;
        }

        const addressComponents = place.address_components ?? [];

        const getComponent = (type: string) =>
            addressComponents.find(c => c.types.includes(type))?.long_name || "";

        const latitude = place.geometry.location?.lat();
        const longitude = place.geometry.location?.lng();

        const data: InputState = {
            address: place.formatted_address,
            country: getComponent("country"),
            postal_code: getComponent("postal_code"),
            subregion: getComponent("administrative_area_level_2"),
            region: getComponent("administrative_area_level_1"),
            borough: getComponent("administrative_area_level_3") || getComponent("locality"),
            latitude,
            longitude,
            place_id: place.place_id,
            place_object: place, // full place if needed
        };

        setInput(data);
        sessionTokenRef.current = null; // Clear token after use

        if (onSelectedOption) {
            onSelectedOption(data);
        }
    }, [onSelectedOption]);

    useEffect(() => {
        if (!isLoaded || loadError || !inputRef.current) return;

        // Create new session token per instance
        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();

        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country },
            fields: ["address_components", "geometry", "formatted_address"],
        });

        const listener = autocompleteRef.current.addListener("place_changed", handlePlaceChanged);

        return () => {
            listener.remove();
        };
    }, [isLoaded, loadError, country, handlePlaceChanged]);

    return (
        <div className="relative">
            {label && (
                <p className={`${labelClass} flex items-center space-x-3 label mb-1`}>
                    <span>{label}</span>
                </p>
            )}
            <div className="relative flex items-center">
                <div className="absolute z-10 left-5">
                    <Search size={18} />
                </div>
                <input
                    ref={inputRef}
                    type="search"
                    inputMode="search"
                    placeholder={placeholder ?? `Search for ${label}`}
                    disabled={disabled}
                    className={`input border-[#E8ECEF] pl-12 ${inputClass} border ${error ? "border-red-500" : ""
                        } ${disabled ? "text-light-black" : ""}`}
                />
            </div>
        </div>
    );
};

export default GoogleAddressSearch;
