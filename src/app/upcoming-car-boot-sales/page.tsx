import { Metadata } from 'next';
import ByUpcoming from '@/components/page/ByUpcoming';

export async function generateMetadata(
): Promise<Metadata> {

  return {
    title: `Upcoming car boot sales across the UK`,
    description: `Discover top-rated Upcoming car boot sales across the UK. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page() {
  return (
    <ByUpcoming/>
  );
}