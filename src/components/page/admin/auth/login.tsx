'use client';

import Button from "@/components/form/button"
import InputField from "@/components/form/input-field"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signIn } from "next-auth/react"
import { useState } from "react";

const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

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
    } = useForm({ resolver: yupResolver(formSchema) });


    const login = async (data: any) => {
        setLoading(true);
        await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        })
        setLoading(false);
    }

    return (
        <div className="w-1/2 mx-auto">
            <h1 className="page-title">Sign In</h1>
            <p className="themeTextMuted">Enter your account credentials</p>
            <form onSubmit={handleSubmit(login)} className="grid gap-6 mt-10">
                {/* {errorMessage && <p className="p-2 text-white bg-red-800 themeRounded themeTextMuted">{errorMessage}</p>} */}
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
                    isLoading={loading}
                    text="Sign In"
                    type="submit"
                />
            </form>
        </div>
    )
}

export default LoginPage