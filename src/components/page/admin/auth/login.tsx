'use client';

import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useApiRequest from '@/hooks/api-request/request';
import { EmptyFormInput } from '@/utils/helper-support';
import { useAppStore } from "@/store/_auth_";

const LoginPage = () => {
    const { handleLogin } = useAppStore();

    //handle form submission
    const formSchema = yup.object({
        email: yup.string().label('email').required(),
        password: yup.string().label('password').required(),
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
        errorMessage,
    } = useApiRequest(setError);

    const login = async (data: any) => {
        const onSubmit = await Post({ endpoint: 'auth/login', payload: data });
        if (!onSubmit) {
            setValue('password', '');
            return;
        };
        const emptyValues = EmptyFormInput(formSchema);
        reset(emptyValues)
        //signIn('credentials',onSubmit);
        handleLogin(onSubmit)
    }

    return (
        <div className="w-1/2 mx-auto">
            <h1 className="page-title">Sign In</h1>
            <p className="themeTextMuted">Enter your account credentials</p>
            <form onSubmit={handleSubmit(login)} className="grid gap-6 mt-10">
                {errorMessage && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">{errorMessage}</p>}
                <InputField
                    type="email"
                    label="Email"
                    value={getValues('email')}
                    error={errors.email?.message}
                    onChangeInput={(e) => [setValue('email', e.target.value), setError('email', { message: '' })]}
                />
                <InputField
                    type="password"
                    label="Password"
                    value={getValues('password')}
                    error={errors.password?.message}
                    onChangeInput={(e) => [setValue('password', e.target.value), setError('password', { message: '' })]}
                />
                <Button
                    isLoading={requestLoading}
                    text="Sign In"
                    type="submit"
                />
            </form>
        </div>
    )
}

export default LoginPage