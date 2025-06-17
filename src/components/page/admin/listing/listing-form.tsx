"use client"

import Button from "@/components/form/button"
import DatePickerField from "@/components/form/date-picker"
import FileUploader from "@/components/form/file-uploader"
import InputField from "@/components/form/input-field"
import SearchableDropdown from "@/components/form/searchable-dropdown"
import SelectField from "@/components/form/select-field"
import TextareaField from "@/components/form/textarea"
import ToggleSwitch from "@/components/form/toggle-switch"
import CustomOptions from "@/type/options/custom-option"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from "react"
import { ucFirst } from "@/utils/helper-support"
import useApiRequest from "@/hooks/api-request/request"
import { SuccessToast } from "@/utils/toast-notification"

const ListingForm = () => {
    const formSchema = yup.object({
        name: yup.string().label('name').required(),
        category: yup.string().label('category').required(),
        eventMode: yup.string().label('event mode').required(),
        entryFee: yup.string().label('entry fee'),
        weatherOutlook: yup.string().label('weather outlook'),
        dateTime: yup.string().label('date and time'),
        location: yup.string().label('location'),
        address: yup.string().label('address'),
        district: yup.string().label('district'),
        //isParkingAvailable: yup.boolean().label('is parking available'),
        description: yup.string().label('description').required(),
        images: yup.array().label('images'),
        isParkingAvailable: yup.boolean().label('is parking available'),
    });

    const [isParkingAvailable, setIsParkingAvailable] = useState<boolean>(false);

    const {
        setValue,
        setError,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm({ resolver: yupResolver(formSchema) });

    const {
        Post,
        requestLoading,
        // errorMessage, // Removed
    } = useApiRequest(setError);

    const SubmitForm = async (data:any) => {
        console.log(data);
        try {
            const request = await Post({
                endpoint: 'admin/car-boot',
                payload: data,
            });

            if ( ! request ) return

            SuccessToast('Car boot created successfully');
            
        } catch (error) {
            console.error('Submission error:', error);
          }
    }

    return (
        <form onSubmit={handleSubmit(SubmitForm)} className="grid gap-4 mt-10">
            <div className="grid gap-2 md:grid-cols-2">
                <InputField label="Name" 
                    value={getValues('name')}
                    error={errors.name?.message}
                    onChangeInput={(e) => [setValue('name', e.target.value), setError('name', { message: '' })]}
                />
                <SelectField label="Category" 
                    options={CustomOptions(['Sports', 'Music', 'Art', 'Food'])}
                    value={getValues('category')}
                    error={errors.category?.message}
                    onChangeInput={(value) => [setValue('category', value), setError('category', { message: '' })]}
                />
                <SelectField label="Event mode" options={CustomOptions(['Indoor', 'Outdoor'])}
                    value={getValues('eventMode')}
                    error={errors.eventMode?.message}
                    onChangeInput={(value) => [setValue('eventMode', value), setError('eventMode', { message: '' })]}
                />
                <InputField type="money-format" label="Entry fee" 
                    value={getValues('entryFee')}
                    error={errors.entryFee?.message}
                    onChangeInput={(e) => [setValue('entryFee', e.target.value), setError('entryFee', { message: '' })]}
                />
                <InputField label="Weather outlook" 
                    value={getValues('weatherOutlook')}
                    error={errors.weatherOutlook?.message}
                    onChangeInput={(e) => [setValue('weatherOutlook', e.target.value), setError('weatherOutlook', { message: '' })]}
                />
                <DatePickerField label="Date and time" withTime={true} 
                    value={getValues('dateTime')}
                    error={errors.dateTime?.message}
                    onChangeInput={(value) => [setValue('dateTime', value), setError('dateTime', { message: '' })]}
                />
                <SearchableDropdown label="Location" placeholder="Search Location"
                    value={getValues('location')}
                    error={errors.location?.message}
                    //onChangeInput={(value) => [setValue('location', value), setError('location', { message: '' })]}
                />
                <InputField label="Address" 
                    value={getValues('address')}
                    error={errors.address?.message}
                    onChangeInput={(e) => [setValue('address', e.target.value), setError('address', { message: '' })]}
                />
                <SelectField label="Region"
                    options={CustomOptions(['Central', 'North', 'South', 'East', 'West'])}
                    value={getValues('district')}
                    error={errors.district?.message}
                    onChangeInput={(value) => [setValue('district', value), setError('district', { message: '' })]}
                />
                <SelectField label="Subregion"
                    options={CustomOptions(['Central', 'North', 'South', 'East', 'West'])}
                    value={getValues('district')}
                    error={errors.district?.message}
                    onChangeInput={(value) => [setValue('district', value), setError('district', { message: '' })]}
                />
                <SelectField label="Borough"
                    options={CustomOptions(['Central', 'North', 'South', 'East', 'West'])}
                    value={getValues('district')}
                    error={errors.district?.message}
                    onChangeInput={(value) => [setValue('district', value), setError('district', { message: '' })]}
                />
            </div>
            <div>
                <ToggleSwitch
                    initialState={isParkingAvailable}
                    label="Is parking available"
                    onToggle={(value) => setIsParkingAvailable(value)}
                    //value={isParkingAvailable}
                    //error={errors.isParkingAvailable?.message}
                />
                {errors.isParkingAvailable?.message && <p className="my-1 text-[13px] themeTextError font-[400]">{ucFirst(errors.isParkingAvailable.message)}</p>}
            </div>
            <div>
                <TextareaField label="Description" 
                    value={getValues('description')}
                    error={errors.description?.message}
                    onChangeInput={(e) => [setValue('description', e.target.value), setError('description', { message: '' })]}
                />
            </div>
            <label className="label">Images</label>
            <FileUploader/>
            <Button isLoading={requestLoading} type="submit" text="Submit"/>
        </form>
    )
}

export default ListingForm