import BackButton from "@/components/page/admin/back-button";
import ListingForm from "@/components/page/admin/listing/listing-form";

const AddListingPage = () => {
    return (
        <div>
            <div>
                <BackButton to="/admin/listing" />
                <h1 className="page-title">Add listing</h1>
            </div>
            <ListingForm />
        </div>
    );
}

export default AddListingPage