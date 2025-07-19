"use client"

import Button from "@/components/form/button"
import DatePickerField from "@/components/form/date-picker"
import InputField from "@/components/form/input-field"
import SearchableDropdown from "@/components/form/searchable-dropdown"
import SelectField from "@/components/form/select-field"
import TextareaField from "@/components/form/textarea"
import ToggleSwitch from "@/components/form/toggle-switch"
import CustomOptions from "@/type/options/custom-option"
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useEffect, useRef, useState } from "react"
import { abbreviateString, EmptyFormInput, strReplace, ucFirst } from "@/utils/helper-support"
import useApiRequest from "@/hooks/api-request/request"
import { SuccessToast } from "@/utils/toast-notification"
import debounce from "lodash.debounce"
import OptionType from "@/type/option-type"
import { CategoryType } from "@/type/model/CategoryType"
import TickerField from "@/components/form/ticker-field"
import GoogleAddressSearch from "@/components/form/google-address-search"
import FileUploader from "@/components/form/file-uploader"
import SpinnerLoader from "@/components/loader/spinner-loader"
import Link from "next/link"
import Image from "next/image"

const ListingForm = ({ id }: { id?: string }) => {
    const router = useRouter();
    const formSchema = yup.object({
        name: yup.string().label('name'),
        category: yup.string().nullable().label('category'),
        event_mode: yup.string().label('event mode'),
        //is_parking_available: yup.boolean().label('is parking available'),
        description: yup.string().label('description'),
        images: yup.array().label('images'),
        is_parking_available: yup.boolean().label('is parking available'),
        opening_time: yup.string().label('opening time'),
        closing_time: yup.string().label('closing time'),
        borough: yup.string().nullable(),
        region: yup.string().nullable(),
        subregion: yup.string().nullable(),
        postcode: yup.string().nullable(),
        latitude: yup.number().nullable(),
        longitude: yup.number().nullable(),
        address: yup.string().nullable(),
    });

    const {
        setValue,
        setError,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ resolver: yupResolver(formSchema) });

    const {
        Post,
        requestLoading,
        ReturnGet,
    } = useApiRequest(setError);

    const resetRef = useRef(reset);
    resetRef.current = reset;

    const [imageLinks, setImageLinks] = useState<string[]>([]);

    const GetListing = useCallback(async () => {
        const response = await ReturnGet(`/admin/car-boot/in/${id}`)
        if (!response) return;
        const {
            name, category_name, category,
            event_mode, description, is_parking_available,
            opening_time, closing_time, address, images,
            borough, region, subregion, postcode, latitude, longitude
        } = response;
        resetRef.current({
            name,
            category,
            event_mode,
            address,
            description,
            borough, region, subregion, postcode, latitude, longitude,
            //is_parking_available,
            opening_time,
            closing_time,
            is_parking_available: Boolean(is_parking_available),
        })
        setSearchCategory(category_name || '')

        setImageLinks(images)

        const getFacilities = await ReturnGet(`/admin/car-boot/in/${id}?fetch_by=facilities`)
        setFacilities(Object.entries(getFacilities).map(([key, value]) => ({
            id: key,
            label: strReplace(key, '_', ' '),
            status: Boolean(value)
        })))

        const getDates = await ReturnGet(`/admin/car-boot/in/${id}?fetch_by=dates`)
        setDates(getDates)
    }, [])

    useEffect(() => {
        if (id) {
            GetListing();
        }
    }, [id, GetListing]);

    const [facilities, setFacilities] = useState<{ label: string; status: unknown }[]>([]);

    const [is_parking_available, setIsParkingAvailable] = useState<boolean>(false);

    const [searchCategory, setSearchCategory] = useState<string>('');
    const [category, setCategory] = useState<OptionType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await ReturnGet(`admin/car-boot/category?search=${searchCategory}`);
            if (!response) return;
            setCategory(
                response.items.map((item: CategoryType) => ({
                    value: item.slug,
                    name: item.name,
                }))
            );
        };

        const debouncedFetch = debounce(fetchData, 500);
        debouncedFetch();

        return () => {
            debouncedFetch.cancel(); // clean up on unmount or next run
        };
    }, [searchCategory]);


    const SubmitForm = async (data: any) => {

        try {
            if (id) {
                data['slug'] = id
            }
            const request = await Post({
                endpoint: id ? `admin/car-boot/update` : 'admin/car-boot',
                payload: data,
            });

            if (!request) return

            SuccessToast(`${id ? 'Listing updated successfully' : 'Listing created successfully'}`);

            if (!id) {
                reset(EmptyFormInput(formSchema));

                router.push(`/admin/listing/${request.slug}`);
            }

        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    const [tab, setTab] = useState<string>('overview');

    const saveFacilities = async () => {
        const response = await Post({
            endpoint: 'admin/car-boot/updateFacilities',
            payload: {
                slug: id,
                facilities
            }
        })

        if (!response) return

        SuccessToast('Facilities updated successfully')
    }

    const [dates, setDates] = useState<{ date: string; time: string, weather_outlook: string }[]>([]);

    const updateDates = async () => {
        const response = await Post({
            endpoint: 'admin/car-boot/updateDates',
            payload: {
                slug: id,
                dates
            }
        })

        if (!response) return

        SuccessToast('Dates updated successfully')
    }

    const handleAddress = (data: any) => {
        setValue('borough', data.borough)
        setValue('subregion', data.subregion)
        setValue('region', data.region)
        setValue('postcode', data.postal_code)
        setValue('latitude', data.latitude)
        setValue('longitude', data.longitude)
    }

    const [loadingFileUpload, setLoadingFileUpload] = useState<boolean>(false);


    const onFileUpload = async (data: any) => {
        setLoadingFileUpload(true);
        //setImageLinks([]);

        const files = data.map((file: any) => {
            return {
                file_name: file.fileName,
                file_in_base64: file.base64,
                file_extension: file.extension,
            }
        })

        const upload = await Post({
            endpoint: 'media/upload/multiple',
            payload: {
                files,
                folder_path: 'car-boot',
            }
        });
        if (!upload) {
            setLoadingFileUpload(false);
            return 'done';
        }
        const save = await Post({
            endpoint: 'admin/car-boot/images',
            payload: {
                slug: id,
                images: upload?.files
            }
        })
        setLoadingFileUpload(false);
        if (!save) return 'done';
        setImageLinks(save?.images);
        return 'done';
    }

    return (
        <div>
            {id && (
                <div className="flex gap-4 flex-wrap">
                    <div onClick={() => setTab('overview')} className={`p-2 cursor-pointer ${tab === 'overview' ? 'bg-[#f3f7fe] rounded-md' : ''}`}>Overview</div>
                    <div onClick={() => setTab('dates')} className={`p-2 cursor-pointer ${tab === 'dates' ? 'bg-[#f3f7fe] rounded-md' : ''}`}>Dates</div>
                    <div onClick={() => setTab('facilities')} className={`p-2 cursor-pointer ${tab === 'facilities' ? 'bg-[#f3f7fe] rounded-md' : ''}`}>Facilities</div>
                    <div onClick={() => setTab('images')} className={`p-2 cursor-pointer ${tab === 'images' ? 'bg-[#f3f7fe] rounded-md' : ''}`}>Images</div>
                </div>
            )}
            {tab === 'overview' && (
                <div>
                    <form onSubmit={handleSubmit(SubmitForm)} className="grid gap-5 mt-10">
                        <div className="grid gap-4 md:grid-cols-2">
                            <InputField label="Name"
                                value={getValues('name')}
                                error={errors.name?.message}
                                onChangeInput={(e) => [setValue('name', e.target.value), setError('name', { message: '' })]}
                            />
                            <SearchableDropdown
                                label="Category"
                                placeholder="Search for category"
                                onChangeInput={(e) => setSearchCategory(e.target.value)}
                                value={searchCategory}
                                options={category}
                                onSelectedOption={(value => setValue('category', value))}
                            />
                            <SelectField label="Event mode" options={CustomOptions(['Indoor', 'Outdoor'])}
                                value={getValues('event_mode')}
                                error={errors.event_mode?.message}
                                onChangeInput={(value) => [setValue('event_mode', value), setError('event_mode', { message: '' })]}
                            />
                            <DatePickerField label="Opening Time"
                                value={getValues('opening_time')}
                                error={errors.opening_time?.message}
                                onlyTime
                                onChangeInput={(value) => {
                                    const opening_timeValue = Array.isArray(value) ? value[0] : value;
                                    return [setValue('opening_time', opening_timeValue), setError('opening_time', { message: '' })];
                                }}
                            />
                            <DatePickerField label="Closing Time"
                                value={getValues('closing_time')}
                                error={errors.closing_time?.message}
                                onlyTime
                                onChangeInput={(value) => {
                                    const closing_timeValue = Array.isArray(value) ? value[0] : value;
                                    return [setValue('closing_time', closing_timeValue), setError('closing_time', { message: '' })];
                                }}
                            />
                            <GoogleAddressSearch value={getValues('address') || ''} onChangeInput={(e) => [setValue('address', e.target.value), setError('address', { message: '' })]} onSelectedOption={(data) => handleAddress(data)} />
                        </div>
                        <div>
                            <ToggleSwitch
                                initialState={is_parking_available}
                                label="Is parking available"
                                onToggle={(value) => setIsParkingAvailable(value)}
                            //value={is_parking_available}
                            //error={errors.is_parking_available?.message}
                            />
                            {errors.is_parking_available?.message && <p className="my-1 text-[13px] themeTextError font-[400]">{ucFirst(errors.is_parking_available.message)}</p>}
                        </div>
                        <div>
                            <TextareaField label="Description"
                                value={getValues('description')}
                                error={errors.description?.message}
                                onChangeInput={(e) => [setValue('description', e.target.value), setError('description', { message: '' })]}
                            />
                        </div>
                        {/* <label className="label">Images</label>
                        <FileUploader /> */}
                        <Button isLoading={requestLoading} type="submit" text={id ? 'Update' : 'Submit'} />
                    </form>
                </div>
            )}
            {tab === 'dates' && (
                <div className="grid gap-5 mt-10">
                    {dates.map((item, index) => (
                        <div key={index} className="grid gap-4 md:grid-cols-2">
                            <DatePickerField label="Date"
                                value={item.date}
                                onChangeInput={(value) => {
                                    const opening_timeValue = Array.isArray(value) ? value[0] : value;
                                    return setDates(dates.map((d, i) => i === index ? { ...d, date: opening_timeValue } : d));
                                }}
                            />
                            <DatePickerField label="Time"
                                value={item.time}
                                onlyTime
                                onChangeInput={(value) => {
                                    const opening_timeValue = Array.isArray(value) ? value[0] : value;
                                    return setDates(dates.map((d, i) => i === index ? { ...d, time: opening_timeValue } : d));
                                }}
                            />
                            <InputField label="Weather Outlook"
                                value={item.weather_outlook}
                                onChangeInput={(e) => setDates(dates.map((d, i) => i === index ? { ...d, weather_outlook: e.target.value } : d))}
                            />
                        </div>
                    ))}
                    <div className="flex justify-end w-fit">
                        <Button text="Add new date" design="primary-outline" className="w-fit" onClick={() => setDates([...dates, { date: '', time: '', weather_outlook: '' }])} />
                    </div>
                    <Button text="Update dates" isLoading={requestLoading} onClick={updateDates} />
                </div>
            )}
            {tab === 'facilities' && (
                <div className="grid gap-5 mt-10">
                    <div className="flex gap-4 flex-wrap">
                        {facilities?.map((item, index) => (
                            <TickerField
                                onChangeInput={(state) =>
                                    setFacilities(facilities.map((f, i) =>
                                        i === index ? { ...f, status: state } : f
                                    ))
                                }
                                id={item.label}
                                key={index}
                                label={item.label}
                                checked={Boolean(item.status)}
                            />
                        ))}
                    </div>
                    <Button text="Save facilities" isLoading={requestLoading} onClick={saveFacilities} />
                </div>
            )}
            {tab === 'images' && (
                <div className="grid gap-5 mt-10">
                    <FileUploader onChange={(data) => onFileUpload(data)} multiple />
                    {loadingFileUpload && <div className="flex items-center mt-3 space-x-2 themeTextMuted">
                        <span className="animate-pulse">Uploading</span>
                        <SpinnerLoader />
                    </div>}
                    <div className="relative overflow-x-auto whitespace-nowrap">
                        <table className="text-primary font-[500] text-[14px] w-full relative z-10">
                            <thead>
                                <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                                    <td className="py-3">Image</td>
                                </tr>
                            </thead>
                            <tbody className="relative">
                                {imageLinks?.map((item: string, index) => (
                                    <tr key={index} className="border-b border-[#E6EAF0]">
                                        <td className=" py-3">
                                            <Image src={item} alt="" width={100} />
                                            <Link href={item} target="_blank">
                                                {abbreviateString(item, 50)}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListingForm