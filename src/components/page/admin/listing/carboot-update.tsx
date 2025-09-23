import Button from "@/components/form/button";
import MiniModal from "@/components/modal/mini-modal";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EmptyFormInput } from "@/utils/helper-support";
import InputField from "@/components/form/input-field";
import TextareaField from "@/components/form/textarea";
import SelectField from "@/components/form/select-field";
import { ListingType } from "@/type/model/ListingType";
import moment from "moment";
import useApiRequest from "@/libs/useApiRequest";
import { SuccessToast } from "@/utils/toast-notification";

const CarBootUpdate = ({ carboot }: { carboot: ListingType | null }) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');
    const formSchema = yup.object({
        title: yup.string().label('title').required(),
        description: yup.string().label('description').required(),
        status: yup.string().label('status').required(),
    });
    const {
        setValue,
        setError,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ resolver: yupResolver(formSchema) });

    const { Post, Get } = useApiRequest(errors);

    const { data:listings } = Get(`/admin/car-boot/updates/${carboot?.slug}?page=${currentPage}${queryParams}`) as { data: { items: any[] }, loading: boolean };

    const onSubmit = async (data: any) => {
        data['carboot_slug'] = carboot?.slug;
        const request = await Post({
            endpoint: 'admin/car-boot/updates',
            payload: data,
            refreshEndpoint: `/admin/car-boot/updates/${carboot?.slug}?page=${currentPage}${queryParams}`
        });
        if (!request) return;
        reset(EmptyFormInput(formSchema));
        setOpenModal(false);
        SuccessToast('Update added successfully');
    }

    return (
        <div>
            <Button onClick={() => setOpenModal(true)} text="Add new update" />
            <MiniModal open={openModal} setClose={() => setOpenModal(false)} title="Add new update">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <InputField
                        label="Title"
                        type="text"
                        placeholder="Enter title"
                        onChangeInput={(e) => { setValue('title', e.target.value); setError('title', { message: '' }) }}
                        value={getValues('title')}
                        error={errors.title?.message}
                    />
                    <div>
                        <TextareaField
                            label="Description"
                            placeholder="Enter description"
                            onChangeInput={(e) => { setValue('description', e.target.value); setError('description', { message: '' }) }}
                            value={getValues('description')}
                            error={errors.description?.message}
                        />
                    </div>
                    <SelectField
                        label="Status"
                        options={[
                            { value: 'danger', name: 'Danger' },
                            { value: 'info', name: 'Info' },
                            { value: 'success', name: 'Success' }
                        ]}
                        onChangeInput={(value) => { setValue('status', value); setError('status', { message: '' }) }}
                        value={getValues('status')}
                        error={errors.status?.message}
                    />
                    <Button text="Submit" type="submit" />
                </form>
            </MiniModal>
            <div className="relative overflow-x-auto whitespace-nowrap mt-5">
                <table className="font-[500] text-[14px] w-full relative z-10">
                    <thead>
                        <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                            <td className="px-4 py-3">Title</td>
                            <td className="px-6 py-3">Description</td>
                            <td className="px-6 py-3">Date added</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listings?.items?.map((listing: any, index: number) => (
                            <tr key={index} className="border-b border-[#E6EAF0]">
                                <td className="px-4 py-3">{listing.title}</td>
                                <td className="px-6 py-3">{listing.description}</td>
                                <td className="px-6 py-3">{moment(listing.created_at).format('YYYY-MM-DD')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CarBootUpdate;