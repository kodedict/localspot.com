import { Metadata } from 'next';
import ByThisWeekend from '@/components/page/ByThisWeekend';

export async function generateMetadata(
): Promise<Metadata> {

  return {
    title: `Car Boot Sales this weekend across the UK`,
    description: `Discover Car Boot Sales this weekend across the UK. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page() {
  return (
    <ByThisWeekend/>
  );
}