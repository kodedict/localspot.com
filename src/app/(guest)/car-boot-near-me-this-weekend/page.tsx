import { Metadata } from 'next';
import ByThisWeekendNearMe from '@/components/page/ByThisWeekendNearMe';

export async function generateMetadata(
): Promise<Metadata> {

  return {
    title: `Car Boot Sales this weekend near me across the UK`,
    description: `Discover Car Boot Sales this weekend near me across the UK. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page() {
  return (
    <ByThisWeekendNearMe/>
  );
}