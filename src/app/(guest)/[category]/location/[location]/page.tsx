import { Metadata } from 'next';
import ByLocationId from '@/components/page/ByLocationId';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';


interface PageProps {
  params: Promise<{ location: string, category: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const {
    category,
    location
  } = await params;
  const formattedCategory = strReplace(category, '-', ' ');
  return {
    title: `Best ${ucWords(formattedCategory)} in ${ucWords(location)}`,
    description: `Discover top-rated ${ucWords(formattedCategory)} in ${ucFirst(location)}. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { location, category } = await params;
  return (
    <ByLocationId location={location} category={category} />
  );
}