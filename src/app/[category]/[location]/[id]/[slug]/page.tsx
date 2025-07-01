import { Metadata } from 'next';
import ByLocationId from '@/components/page/ByLocationId';
import { strReplace, ucFirst, ucWords } from '@/utils/helper-support';
import SingleListing from '@/components/page/SingleListing';


interface PageProps {
  params: Promise<{ borough: string, slug: string, region: string, location: string, category: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const {
    category,
    location,
    slug,
  } = await params;
  const formattedCategory = strReplace(category, '-', ' ');
  const formattedSlug = strReplace(slug, '-', ' ');
  return {
    title: `${ucWords(formattedSlug)} in ${ucWords(formattedCategory)} at ${ucWords(location)}`,
    description: `${ucWords(formattedSlug)} in ${ucWords(formattedCategory)} at ${ucFirst(location)}. View listings, schedules, and visitor ratings.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug, category, location } = await params;
  return (
    <SingleListing slug={slug} location={location} category={category} />
  );
}