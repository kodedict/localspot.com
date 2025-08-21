import { Metadata } from 'next';
import ByBankHoliday from '@/components/page/ByBankHoliday';

export async function generateMetadata(
): Promise<Metadata> {

  return {
    title: `Bank Holiday Car Boot Sales across the UK`,
    description: `Discover Bank Holiday Car Boot Sales this weekend across the UK. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page() {
  return (
    <ByBankHoliday/>
  );
}