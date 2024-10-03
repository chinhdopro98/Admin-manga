import React, { useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { UploadSimple } from '@phosphor-icons/react/dist/ssr';
import { Box } from '@mui/material';
interface ImageDropzoneProps {
    onDropImages: (images: FileWithPath[]) => void;
    text: string
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onDropImages, text }) => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        const images = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        onDropImages(images);
    }, [onDropImages]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: '2px dashed #aaa',
                padding: '20px',
                textAlign: 'center',
                height: "135px",
                cursor: 'pointer'
            }}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Thả ảnh vào đây...</p>
            ) : (
                <Box>
                    <UploadSimple size={35} />
                    <p>{text}</p>
                </Box>
            )}
        </div>
    );
};

export default ImageDropzone;