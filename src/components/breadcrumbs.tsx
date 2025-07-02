const BreadCrumbs = ({ navs }: { navs: any}) => {
    return (
        <nav className="capitalize" aria-label="Breadcrumb">
            <div className="md:flex items-center md:gap-2   py-2 border-gray-300">
                {navs.map((item: any, index: number) => (
                    <div key={index} className="flex items-center">
                        {( index !== 0) && (
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 hidden md:block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        )}
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 block md:hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <a href={item.href} className={`inline-flex items-center text-sm font-medium ${index === navs.length - 1 ? 'text-secondary pointer-events-none' : 'text-gray-700 hover:text-primary'}`}>
                            {item.name}
                        </a>
                    </div>
                ))}
            </div>
        </nav>
    )
}

export default BreadCrumbs