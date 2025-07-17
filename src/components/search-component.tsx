import { useEffect, useState } from "react"
import Button from "./form/button"

const SearchComponent = ({ onSearch, value }: { onSearch?: (search: string) => void, value?: string}) => {
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        if (value) setSearch(value);
    }, [value])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSearch){
            onSearch(search)
        }
    }
    return (
        <form onSubmit={onSubmit} style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }} className='bg-white mx-auto p-2 gap-4 flex relative themeRounded justify-end'>
            <input value={search} onInput={(e) => setSearch((e.target as HTMLInputElement).value)} placeholder='Search by town, postcode or venue' className='absolute inset-0 w-full h-full border-0 pl-5' />
            <Button type="submit" design='primary' text='Search' />
        </form>
    )
}

export default SearchComponent