import { Upload, X } from "lucide-react";
import { useState, useRef } from "react";

type FileData = {
    file: File;
    fileName: string;
    base64: string;
    fileSize: {
        sizeInText: string;
        sizeInMb: number;
    };
    extension: string;
};

const FileUploader = ({
    onChange,
    multiple = false,
}: {
    onChange?: (file: FileData | FileData[]) => Promise<string | void>;
    multiple?: boolean
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files ?? []);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        const newFiles: File[] = [];

        for (const selectedFile of selectedFiles) {
            newFiles.push(selectedFile);
        }

        if (multiple) {
            setFiles((prev) => [...prev, ...newFiles]);
        } else {
            setFiles(newFiles);
        }

        if (onChange) {
            const files_ = [];
            for (const selectedFile of selectedFiles) {
                const fileName = selectedFile.name;
                const extension = fileName.split(".").pop() ?? "";
                const base64 = (await toBase64(selectedFile)) as string;
                const fileSize = getFileSize(selectedFile.size);

                files_.push({
                    file: selectedFile,
                    base64,
                    fileSize,
                    extension,
                    fileName,
                });
            }

            const uploadableFile = multiple ? files_ : files_[0];
            const action = await onChange(uploadableFile);
            if (action === 'done') {
                setFiles([]);
                if (fileInputRef.current) {
                    (fileInputRef.current.value = '')
                }
            }
        }
    };

    const removeFile = (fileName: string) => {
        setFiles((prev) => prev.filter((file) => file.name !== fileName));
        if (fileInputRef.current) {
            (fileInputRef.current.value = '')
        }
    };

    const getFileSize = (fileSizeInBytes: number) => {
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;

        const size = Math.round(fileSizeInMB) > 0
            ? fileSizeInMB.toFixed(1)
            : Math.round(fileSizeInKB);
        const sizeType = Math.round(fileSizeInMB) > 0 ? "MB" : "KB";

        return {
            sizeInText: `${size} ${sizeType}`,
            sizeInMb: Math.round(fileSizeInMB),
        };
    };

    const toBase64 = (file: File) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    return (
        <div>
            <div className="relative border-dashed border border-primary h-[10em] flex justify-center items-center">
                <div className="flex flex-col items-center space-y-2">
                    <Upload />
                    <p className="label">
                        Drag and Drop files here or{" "}
                        <span className="font-bold underline cursor-pointer">Choose files</span>
                    </p>
                    <p className="label text-primary">PNG, JPG, JPEG up to 2MB</p>
                </div>
                <input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    multiple={multiple}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    accept=".png,.jpg,.jpeg"
                />
            </div>

            {files.length > 0 && (
                <div className="mt-5 space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className="flex items-center justify-between p-2 bg-gray-300"
                        >
                            <div>
                                <p className="text-black label">{file.name}</p>
                                <p className="text-xs font-light">
                                    {getFileSize(file.size).sizeInText}
                                </p>
                            </div>
                            <span
                                onClick={() => removeFile(file.name)}
                                className="p-2 text-white bg-red-500 rounded-full cursor-pointer"
                            >
                                <X size={18} />
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;
