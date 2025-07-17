import { Metadata } from 'next';
import SearchPage from '@/components/page/Search';

interface PageProps {
    params: Promise<{ query: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Search for best top-rated car boot sales in the UK`,
        description: `Search for top-rated car boot sales in the UK. View listings, schedules, and visitor ratings.`,
    };
}

export default async function Page({ params }: PageProps) {
    const { query } = await params;
    return (
        <SearchPage query={query}/>
    );
}