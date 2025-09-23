import { Metadata } from 'next';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';
import BySubregion from '@/components/page/BySubregion';


interface PageProps {
  params: Promise<{ borough: string, subregion: string, region: string, location: string, category: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const {
    subregion,
    category,
  } = await params;
  const formattedCategory = strReplace(category, '-', ' ');
  return {
    title: `Best ${ucWords(formattedCategory)} in ${ucWords(subregion)}`,
    description: `Discover top-rated ${ucWords(formattedCategory)} in ${ucFirst(subregion)}. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { region, category, location, subregion } = await params;
  return (
    <BySubregion region={region} subregion={subregion} location={location} category={category}/>
  );
}