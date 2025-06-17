import BackButton from "@/components/page/admin/back-button";
import LocationForm from "@/components/page/admin/location/location-form";

const AddLocationPage = () => {
    return (
        <div>
            <div>
                <BackButton to="/admin/location" />
                <h1 className="page-title">Add location</h1>
            </div>
            <LocationForm />
        </div>
    );
}

export default AddLocationPage