import ByCategory from '@/components/page/ByCategory';
import { Metadata } from 'next';
import { strReplace, ucWords } from '@/utils/helper-support';

interface PageProps {
  params: { category: string };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  let category = decodeURIComponent(params.category);
  category = strReplace(category, '-', ' ');
  return {
    title: `Best ${ucWords(category)} in UK`,
    description: `Discover top-rated ${ucWords(category)} in UK. View listings, schedules, and visitor ratings.`,
  };
}

export default function Category({ params }: PageProps) {
  return (<ByCategory category={params.category}/>);
}