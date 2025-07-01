import { Metadata } from 'next';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';
import ByCategory from '@/components/page/ByCategory';


interface PageProps {
  params: Promise<{category: string}>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const {
    category,
  } = await params;
  const formattedCategory = strReplace(category, '-', ' ');
  return {
    title: `${ucWords(formattedCategory)} across the UK`,
    description: `Discover top-rated ${ucWords(formattedCategory)} across the UK. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  return (
    <ByCategory category={category}/>
  );
}