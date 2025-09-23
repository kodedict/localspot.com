import ListingForm from "@/components/page/admin/listing/listing-form";
import BackButton from "@/components/page/admin/back-button";

interface PageProps {
    params: Promise<{ id: string }>;
  }

const SingleListingPage = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
      <div>
          <div>
              <BackButton to="/admin/listing" />
              <h1 className="page-title">Edit listing</h1>
          </div>
          <ListingForm id={id} />
      </div>
  );
}

export default SingleListingPage