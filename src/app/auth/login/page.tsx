// import ByCategory from '@/components/page/ByCategory';
import { Metadata } from 'next';
import { strReplace } from '@/utils/helper-support';
import LoginPage from '@/components/page/admin/auth/login';

interface PageProps {
    params: { category: string };
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    // let category = decodeURIComponent(params.category);
    // category = strReplace(category, '-', ' ');
    return {
        title: `Login`,
        description: `Discover top-rated car boot sales in UK. View listings, schedules, and visitor ratings.`,
    };
}

export default function Category({  }: PageProps) {
    return (<LoginPage />);
}