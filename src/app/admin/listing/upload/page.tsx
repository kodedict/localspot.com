"use client";

import Button from "@/components/form/button";
import FileUploader from "@/components/form/file-uploader";
import DotsLoader from "@/components/loader/dot-loader";
import BackButton from "@/components/page/admin/back-button";
import useApiRequest from "@/hooks/api-request/request";
import { SuccessToast } from "@/utils/toast-notification";
import { useState } from "react";
// import LocationForm from "@/components/page/admin/location/location-form";

const UploadListing = () => {
    const [fileLink, setFileLink] = useState<string|null>(null);

    const [loadingFileUpload, setLoadingFileUpload] = useState<boolean>(false);

    const {
        Post,
        requestLoading,
    } = useApiRequest();

    const onFileUpload = async (file: any) => {
        setLoadingFileUpload(true);
        setFileLink(null);
        const upload = await Post({
            endpoint: 'media/upload',//admin/car-boot/bulk-upload
            payload: {
                file_name: file.fileName,
                file_in_base64: file.base64,
                file_extension: file.extension,
                folder_path: 'bulk-upload',
            }
        });
        setLoadingFileUpload(false);
        if (! upload) return
        setFileLink(upload?.file_url); 
        return 'done';
    }

    const uploadFile = async () => {
        const upload = await Post({
            endpoint: 'admin/car-boot/bulk-upload',
            payload: {
                file: fileLink,
            }
        });
        if (! upload) return;
        setFileLink(null);
        SuccessToast('File uploaded successfully');
    }

    return (
        <div>
            <div>
                <BackButton to="/admin/listing" />
                <h1 className="page-title">Upload file</h1>
            </div>
            <div>
                <FileUploader onChange={(file) => onFileUpload(file)} />
                {loadingFileUpload && <div className="flex items-center mt-3 space-x-2 themeTextMuted">
                    <span className="animate-pulse">Uploading</span>
                    <DotsLoader />
                </div>}
                {fileLink && <div style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }} className="mt-3 overflow-y-auto h-[10em] p-4 themeRounded">
                    <img src={fileLink} alt="proof of payment" className="w-full" />
                </div>}
                {fileLink && <Button text="Upload" design="primary" onClick={uploadFile} disabled={requestLoading} isLoading={requestLoading}/>}
            </div>
        </div>
    );
}

export default UploadListing