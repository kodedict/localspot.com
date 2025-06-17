import Button from "@/components/form/button"
import Link from "next/link"

const CategoryPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="page-title">Category</h1>
                <div className="flex items-center gap-3">
                    <Link href={'/admin/category/add-new'} className="w-fit"><Button text="Add category" /></Link>
                </div>
            </div>
            <div className="relative overflow-x-auto ">
                <table className="text-primary font-[500] text-[14px] w-full relative z-10">
                    <thead>
                        <tr className="border-b border-[#E6EAF0] bg-[#fafafa]">
                            <td className="px-6 py-3">Name</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default CategoryPage