import { Metadata } from 'next';
import ByToday from '@/components/page/ByToday';

export async function generateMetadata(
): Promise<Metadata> {

  return {
    title: `Car Boot Sales today across the UK`,
    description: `Discover Car Boot Sales today across the UK. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page() {
  return (
    <ByToday/>
  );
}