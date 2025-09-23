"use client";

import Button from "@/components/form/button";
import InputField from "@/components/form/input-field";
import MiniModal from "@/components/modal/mini-modal";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EmptyFormInput } from "@/utils/helper-support";
import debounce from "lodash.debounce"
import SearchableDropdown from "@/components/form/searchable-dropdown";
import OptionType from "@/type/option-type";
import { ListingType } from "@/type/model/ListingType";
import useApiRequest from "@/libs/useApiRequest";
import { SuccessToast } from "@/utils/toast-notification";

const PopularListing = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');

    const formSchema = yup.object({
        slug: yup.string().required(),
        new_position: yup.string(),
    });
    const {
        setValue,
        setError,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ resolver: yupResolver(formSchema) });

    const { Get, ReturnGet, Post, requestLoading } = useApiRequest(errors);

    const {data:listings} = Get(`/admin/car-boot/popular?page=${currentPage}${queryParams}`) as {data: [], loading: boolean};
    
    const [searchCarboot, setSearchCarboot] = useState<string>('');
    const [carboots, setCarboots] = useState<OptionType[]>([]);

    const onSubmit = async (data: any) => {
        if (position){
            data['position'] = position.position;
        }
        const response = await Post({
            endpoint: `${position ? 'admin/car-boot/popular/update' : 'admin/car-boot/popular'}`,
            payload: data,
            refreshEndpoint: '/admin/car-boot/popular?page=1'
        });
        if (!response) return;
        reset(EmptyFormInput(formSchema));
        setSearchCarboot('');
        setOpenModal(false);
        setPosition(null);
        SuccessToast('Position updated successfully');
    }

    useEffect(() => {
        const handler = debounce(async () => {
            const response = await ReturnGet(`admin/car-boot?search=${searchCarboot}`)
            if (!response) return;
            setCarboots(response.items.map((item: ListingType) => ({ value: item.slug, name: item.name })));
        }, 500)

        handler()
        return () => handler.cancel()
    }, [searchCarboot])

    const [position, setPosition] = useState<any | null>(null);

    useEffect(() => {
        if (position) {
            setSearchCarboot(position.car_boot.name);
            reset({
                slug: position.car_boot.slug,
                new_position: position.position
            });
            setOpenModal(true);
        }
    }, [position, reset]);
        
    return (
        <div>
            <Button onClick={() => setOpenModal(true)} text="Add position" />
            <MiniModal open={openModal} setClose={() => {setOpenModal(false); setPosition(null); setSearchCarboot('');}} title="Manage Popular Car Boot Position">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <SearchableDropdown
                        label="Car Boot"
                        error={errors.slug?.message}
                        onChangeInput={(e) => setSearchCarboot(e.target.value)}
                        value={searchCarboot}
                        options={carboots}
                        onSelectedOption={(value => setValue('slug', value ?? ''))}
                    />
                    {position && (
                        <div>
                            <div>
                                <p>
                                    Current Position: <strong>{position.position}</strong>
                                </p>
                            </div>
                            <InputField
                                label="New Position"
                                placeholder="Enter new position"
                                onChangeInput={(e) => { setValue('new_position', e.target.value); setError('new_position', { message: '' }) }}
                                value={getValues('new_position')}
                                error={errors.new_position?.message}
                            />
                        </div>
                    )}
                    <Button isLoading={requestLoading} text="Submit" type="submit" />
                </form>
            </MiniModal>

            <div className="relative overflow-x-auto whitespace-nowrap mt-5">
                <table className="font-[500] text-[14px] w-full relative z-10">
                    <thead>
                        <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                            <td className="px-4 py-3">Car Boot</td>
                            <td className="px-6 py-3">Position</td>
                            <td className="px-6 py-3">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listings?.map((item: any, index: number) => (
                            <tr key={index} className="border-b border-[#E6EAF0]">
                                <td className="px-4 py-3">{item.car_boot.name}</td>
                                <td className="px-6 py-3">{item.position}</td>
                                <td className="px-6 py-3">
                                    <div className="w-fit">
                                        <Button onClick={() => setPosition(item)} className="w-fit" design="primary-outline" text="Change position" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PopularListing;