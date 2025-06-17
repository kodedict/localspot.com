"use client";

import FileUploader from "@/components/form/file-uploader";
import BackButton from "@/components/page/admin/back-button";
// import LocationForm from "@/components/page/admin/location/location-form";

const UploadListing = () => {
    return (
        <div>
            <div>
                <BackButton to="/admin/listing" />
                <h1 className="page-title">Upload file</h1>
            </div>
            <FileUploader />
        </div>
    );
}

export default UploadListing