// import ByCategory from '@/components/page/ByCategory';
import { Metadata } from 'next';
import LoginPage from '@/components/page/admin/auth/login';

// interface PageProps { // Interface removed
//     // params: { category: string };
// }

export async function generateMetadata(
    // No props used
): Promise<Metadata> {
    // let category = decodeURIComponent(params.category);
    // category = strReplace(category, '-', ' ');
    return {
        title: `Login`,
        description: `Discover top-rated car boot sales in UK. View listings, schedules, and visitor ratings.`,
    };
}

export default function LoginFormPage() { // PageProps removed
    return (<LoginPage />);
}