"use client"

import { useState } from "react";
import Button from "@/components/form/button"
import moment from "moment";
import Link from "next/link"
import { CategoryType } from "@/type/model/CategoryType";
import { strReplace } from "@/utils/helper-support";
import useApiRequest from "@/libs/useApiRequest";

const CategoryIndex = () => {
    const { Get } = useApiRequest();
    const [currentPage,] = useState<number>(1);
    const [queryParams,] = useState<string>('');

    const {data:category} = Get(`/admin/car-boot/category?page=${currentPage}${queryParams}`) as {data: {items: CategoryType[]}, loading: boolean};
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
                        {category?.items?.map((item:CategoryType, index: number) => (
                            <tr key={index} className="border-b border-[#E6EAF0] themeTextMuted">
                                <td className="flex px-4 py-3 space-x-2 capitalize cursor-pointer text-primary hover:underline">
                                    <span>{strReplace(item.name, '-', ' ')}</span>
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