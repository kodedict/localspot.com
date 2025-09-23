import { Metadata } from 'next';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';
import ByRegion from '@/components/page/ByRegion';


interface PageProps {
  params: Promise<{region: string, location: string, category: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const {
    region,
    category,
  } = await params;
  const formattedCategory = strReplace(category, '-', ' ');
  return {
    title: `Best ${ucWords(formattedCategory)} in ${ucWords(region)}`,
    description: `Discover top-rated ${ucWords(formattedCategory)} in ${ucFirst(region)}. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { region, location, category } = await params;
  return (
    <ByRegion location={location} region={region} category={category} />
  );
}