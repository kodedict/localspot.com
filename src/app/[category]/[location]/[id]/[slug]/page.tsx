
import SingleListing from '@/components/page/SingleListing';
import { strReplace } from '@/utils/helper-support';
import { Metadata } from 'next';

interface PageProps {
  params: { category: string, location: string, id: string, slug: string };
}


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Old Trafford Boot Sale`,
    description: `LISTING DESCRIPTION`,
  };
}

export default function Page({ params }: PageProps) {
  const category = strReplace(params.category, '-', ' ');
  const location = strReplace(params.location, '-', ' ');
  //listing={null}
  return (<SingleListing  category={category} location={location} />);
}