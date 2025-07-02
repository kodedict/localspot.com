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
import { useEffect, useState } from "react"
import { ucFirst } from "@/utils/helper-support"
import useApiRequest from "@/hooks/api-request/request"
import { SuccessToast } from "@/utils/toast-notification"
import debounce from "lodash.debounce"
import OptionType from "@/type/option-type"
import { CategoryType } from "@/type/model/CategoryType"

const ListingForm = () => {

    const formSchema = yup.object({
        name: yup.string().label('name').required(),
        category: yup.string().label('category').required(),
        eventMode: yup.string().label('event mode').required(),
        entryFee: yup.string().label('entry fee'),
        weatherOutlook: yup.string().label('weather outlook'),
        date: yup.string().label('date'),
        time: yup.array().label('time'),
        address: yup.string().label('address'),
        //isParkingAvailable: yup.boolean().label('is parking available'),
        description: yup.string().label('description').required(),
        images: yup.array().label('images'),
        isParkingAvailable: yup.boolean().label('is parking available'),
        openingTime: yup.string().label('opening time'),
        closingTime: yup.string().label('closing time'),
    });

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
        ReturnGet,
    } = useApiRequest(setError);


    const [isParkingAvailable, setIsParkingAvailable] = useState<boolean>(false);

    const [searchCategory, setSearchCategory] = useState<string>('');
    const [category, setCategory] = useState<OptionType[]>([]);

    useEffect(() => {
        const handler = debounce(async () => {
            const response = await ReturnGet(`admin/car-boot/category?search=${searchCategory}`)
            if (!response) return;
            setCategory(response.items.map((item: CategoryType) => ({ value: item.slug, name: `${item.name}` })));
        }, 500)

        handler()
        return () => handler.cancel()
    }, [searchCategory, ReturnGet])


    const SubmitForm = async (data:any) => {
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
                <DatePickerField label="Date"
                    value={getValues('date')}
                    error={errors.date?.message}
                    onChangeInput={(value) => {
                        const dateValue = Array.isArray(value) ? value[0] : value;
                        return [setValue('date', dateValue), setError('date', { message: '' })];
                    }}
                />
                <DatePickerField label="Opening Time"
                    value={getValues('openingTime')}
                    error={errors.openingTime?.message}
                    onlyTime
                    onChangeInput={(value) => {
                        const openingTimeValue = Array.isArray(value) ? value[0] : value;
                        return [setValue('openingTime', openingTimeValue), setError('openingTime', { message: '' })];
                    }}
                />
                <DatePickerField label="Closing Time"
                    value={getValues('closingTime')}
                    error={errors.closingTime?.message}
                    onlyTime
                    onChangeInput={(value) => {
                        const closingTimeValue = Array.isArray(value) ? value[0] : value;
                        return [setValue('closingTime', closingTimeValue), setError('time', { message: '' })];
                    }}
                />
                <SearchableDropdown label="Address" placeholder="Search address"
                    value={getValues('address')}
                    error={errors.address?.message}
                    //onChangeInput={(value) => [setValue('location', value), setError('location', { message: '' })]}
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
            {/* <div>
                <p className="label">Dates</p>
            </div> */}
            <label className="label">Images</label>
            <FileUploader/>
            <Button isLoading={requestLoading} type="submit" text="Submit"/>
        </form>
    )
}

export default ListingForm