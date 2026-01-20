import { Metadata } from 'next';
import ByPopular from '@/components/page/ByPopular';

export async function generateMetadata(
): Promise<Metadata> {

  return {
    title: `Popular car boot sales across the UK`,
    description: `Discover top-rated Popular car boot sales across the UK. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page() {
  return (
    <ByPopular/>
  );
}