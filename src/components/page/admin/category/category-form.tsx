"use client"

import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SuccessToast } from "@/utils/toast-notification"
import { EmptyFormInput } from "@/utils/helper-support";
import useApiRequest from "@/libs/useApiRequest";

const CategoryForm = () => {
    const formSchema = yup.object({
            name: yup.string().label('name').required(),
    });

    const {
        setValue,
        setError,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm({ resolver: yupResolver(formSchema) });

    const {
        Post,
        requestLoading,
    } = useApiRequest(setError);

    const SubmitForm = async (data: any) => {
        try {
            const request = await Post({
                endpoint: 'admin/car-boot/category',
                payload: data,
                refreshEndpoint: '/admin/car-boot/category?page=1'
            });

            if (!request) return

            SuccessToast('Category created successfully');
            reset(EmptyFormInput(formSchema));

        } catch (error) {
            console.error('Submission error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(SubmitForm)} className="grid gap-4 mt-10">
            <div className="grid gap-2 md:grid-cols-2">
                <InputField 
                    label="Name"
                    value={getValues('name')}
                    error={errors.name?.message}
                    onChangeInput={(e) => [setValue('name', e.target.value), setError('name', { message: '' })]}
                />
            </div>
            <Button isLoading={requestLoading} type="submit" text="Submit" />
        </form>
    )
}

export default CategoryForm