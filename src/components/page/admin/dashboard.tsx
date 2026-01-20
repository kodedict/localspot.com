"use client"

import useApiRequest from "@/libs/useApiRequest";
import { ListingType } from "@/type/model/ListingType";
import { strReplace } from "@/utils/helper-support";
import moment from "moment";
import Link from "next/link";

const Dashboard = () => {
    const { Get } = useApiRequest();
    const { data: listings } = Get(`/admin/car-boot`) as { data: { items: ListingType[], totalPages: number, total: number }, loading: boolean };
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage listings, popular car boot sales.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in mt-5">
                <div className="bg-white p-4 rounded-lg shadow stat-card">
                    <div>
                        <p className="stat-card-label capitalize">
                            Total Listings
                        </p>
                        <p className={`text-2xl font-bold`}>
                            {listings?.total || 0}
                        </p>
                    </div>
                </div>
            </div>
            <h4 className="mt-5 mb-1 font-bold text-sm">Latest Updated Listing</h4>
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
                        {listings?.items?.map((item: ListingType, index: number) => (
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
            </div>
        </div>
    );
}

export default Dashboard;