import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const BackButton = ({to = '/'} : {
    to: string
}) => {
    return (
        <Link href={to} className="flex gap-2 items-center w-fit">
            <ChevronLeft size={18} />
            <span>Back</span>
        </Link>
    )
}

export default BackButton