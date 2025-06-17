import Button from "@/components/form/button"
import Link from "next/link"

const ListingPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="page-title">Listing</h1>
                <div className="flex items-center gap-3">
                    <Link href={'/admin/listing/add-new'} className="w-fit"><Button text="Add listing" /></Link>
                    <Link href={'/admin/listing/upload'} className="w-fit"><Button design='primary-outline' text="Upload file" /></Link>
                </div>
            </div>
            <div className="relative overflow-x-auto whitespace-nowrap">
                <table className="text-primary font-[500] text-[14px] w-full relative z-10">
                    <thead>
                        <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                            <td className="px-4 py-3">Name</td>
                            <td className="px-6 py-3">Location</td>
                            <td className="px-6 py-3"></td>
                            <td className="px-6 py-3">Last updated</td>
                        </tr>
                    </thead>
                    </table>
                </div>
        </div>
    )
}

export default ListingPage