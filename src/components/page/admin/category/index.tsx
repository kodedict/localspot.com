"use client"

import { useEffect, useState } from "react";
import Button from "@/components/form/button"
import useApiRequest from "@/hooks/api-request/request";
import moment from "moment";
import Link from "next/link"

const CategoryIndex = () => {
    const { ReturnGet } = useApiRequest();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParams, setQueryParams] = useState<string>('');
    const [category, setCategory] = useState<CategoryType[]>([]);

    const GetIndex = async () => {
        const request = await ReturnGet(`admin/car-boot/category?page=${currentPage}${queryParams}`);
        if ( ! request ) return;
        setCategory(request.items);
    }
    useEffect(() => {
        GetIndex();
    },[]);
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="page-title">Category</h1>
                <div className="flex items-center gap-3">
                    <Link href={'/admin/category/add-new'} className="w-fit"><Button text="Add category" /></Link>
                </div>
            </div>
            <div className="relative overflow-x-auto whitespace-nowrap">
                <table className="text-primary font-[500] text-[14px] w-full relative z-10">
                    <thead>
                        <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                            <td className="px-4 py-3">Name</td>
                            <td className="px-6 py-3">Created at</td>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {category.map((item:CategoryType, index: number) => (
                            <tr key={index} className="border-b border-[#E6EAF0] themeTextMuted">
                                <td className="flex px-4 py-3 space-x-2 capitalize cursor-pointer text-primary hover:underline">
                                    <span>{item.name}</span>
                                </td>
                                <td className="px-6 py-3">{moment(`${item.created_at}`).format('Do MMM, YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryIndex