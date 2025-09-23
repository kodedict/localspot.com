"use client"

import Button from "@/components/form/button"
import InputField from "@/components/form/input-field";
import TablePagination from "@/components/table/table-pagination";
import useApiRequest from "@/libs/useApiRequest";
import { ListingType } from "@/type/model/ListingType";
import { strReplace } from "@/utils/helper-support";
import moment from "moment";
import Link from "next/link"
import { useState } from "react";

const ListingIndex = () => {
    const { Get} = useApiRequest();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [queryParams, setQueryParams] = useState<string>('');
    const {data:listings} = Get(`/admin/car-boot?page=${currentPage}${queryParams}`) as {data: {items: ListingType[]}, loading: boolean};
    return (
        <div>
            <div className="md:flex items-center justify-between mb-4">
                <h1 className="page-title">Listing</h1>
                <div className="flex items-center gap-3 flex-wrap">
                    <InputField
                        type="search"
                        placeholder="Search listing"
                        onChangeInput={(e) => {
                            setQueryParams(`&search=${e.target.value}`);
                        }}
                    />
                    <Link href={'/admin/listing/add-new'} className="w-fit"><Button text="Add listing" /></Link>
                    <Link href={'/admin/listing/upload'} className="w-fit"><Button design='primary-outline' text="Upload file" /></Link>
                </div>
            </div>
            <div className="relative overflow-x-auto whitespace-nowrap">
                <table className="text-primary font-[500] text-[14px] w-full relative z-10">
                    <thead>
                        <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                            <td className="px-4 py-3">Name</td>
                            {/* <td className="px-6 py-3">Location</td> */}
                            <td className="px-6 py-3">Category</td>
                            <td className="px-6 py-3">Last updated</td>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {listings?.items?.map((item:ListingType, index: number) => (
                            <tr key={index} className="border-b border-[#E6EAF0] themeTextMuted">
                                <td className="flex px-4 py-3 space-x-2 capitalize cursor-pointer text-primary hover:underline">
                                    <Link href={`/admin/listing/${item.slug}`}>{item.name}</Link>
                                </td>
                                {/* <td className="px-6 py-3">{item.location_code}</td> */}
                                <td className="px-6 py-3 capitalize">{strReplace(item.category || '', '-', ' ')}</td>
                                <td className="px-6 py-3">{moment(`${item.updated_at}`).format('Do MMM, YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5">
                    <TablePagination
                    currentPage={currentPage}
                    totalPages={listings?.items ? Math.ceil(listings?.items?.length / 10) : 0}
                    onPageChange={(page: number) => {
                         setCurrentPage(page)
                    }}
                />
                </div>
            </div>
        </div>
    )
}

export default ListingIndex