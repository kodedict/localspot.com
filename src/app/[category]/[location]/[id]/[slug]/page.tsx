
import SingleListing from '@/components/page/SingleListing';
import { strReplace } from '@/utils/helper-support';
import { Metadata } from 'next';

// interface PageProps removed

export async function generateMetadata(
  // { params }: { params: { id: string, category: string, location: string, slug: string } } // params removed as it's not used
): Promise<Metadata> {
  // params are available here if needed in the future, e.g., for dynamic titles
  // const { id, category, location, slug } = params;
  return {
    title: `Old Trafford Boot Sale`, // This could be made dynamic using params
    description: `LISTING DESCRIPTION`, // This could also be dynamic
  };
}

export default function Page({ params }: { params: { id: string, category: string, location: string, slug: string } }) {
  const category = strReplace(params.category, '-', ' ');
  const location = strReplace(params.location, '-', ' ');
  return (<SingleListing listing={null} category={category} location={location} />);
}