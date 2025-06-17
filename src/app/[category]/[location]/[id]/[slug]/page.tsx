
import SingleListing from '@/components/page/SingleListing';
import { strReplace } from '@/utils/helper-support';
import { Metadata } from 'next';

interface PageProps {
  params: { id: string, category: string, location: string, slug: string };
}


export async function generateMetadata({  }: PageProps): Promise<Metadata> {
  return {
    title: `Old Trafford Boot Sale`,
    description: `LISTING DESCRIPTION`,
  };
}

export default function Page({ params }: PageProps) {
  const category = strReplace(params.category, '-', ' ');
  const location = strReplace(params.location, '-', ' ');
  return (<SingleListing listing={null} category={category} location={location} />);
}