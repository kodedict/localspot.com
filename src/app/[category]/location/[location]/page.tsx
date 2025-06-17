import { Metadata } from 'next';
import ByLocationId from '@/components/page/ByLocationId';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';


interface PageProps {
  params: { location: string, category: string };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const location = decodeURIComponent(params.location);
  let category = decodeURIComponent(params.category);
  category = strReplace(category, '-', ' ');
  return {
    title: `Best ${ucWords(category)} in ${ucWords(location)}`,
    description: `Discover top-rated ${ucWords(category)} in ${ucFirst(location)}. View listings, schedules, and visitor ratings.`,
  };
}

export default function Page({ params }: PageProps) {
  const { location, category } = params;
  return (
  <ByLocationId location={location} category={category}/>
  );
}