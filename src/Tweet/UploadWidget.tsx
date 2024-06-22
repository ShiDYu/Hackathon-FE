import React, { useEffect, useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';

export const UploadWidget: React.FC<{ onUpload: (url: string) => void }> = ({ onUpload }) => {
    const cloudinaryRef = useRef<any>(null);
    const widgetRef = useRef<any>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const initializeWidget = () => {
            cloudinaryRef.current = (window as any).cloudinary;
            if (cloudinaryRef.current) {
                widgetRef.current = cloudinaryRef.current.createUploadWidget(
                    {
                        cloudName: 'dnkyjj2ij',
                        uploadPreset: 'ywkf89rv',
                    },
                    (error: any, result: any) => {
                        if (error) {
                            console.error('Upload Error:', error);
                            return;
                        }
                        if (result && result.event === 'success') {
                            console.log('Done! Here is the image info: ', result.info);
                            setUploadedImageUrl(result.info.url);
                            onUpload(result.info.url);
                        }
                    }
                );
            } else {
                console.error('Cloudinary library is not loaded.');
            }
        };

        if (!(window as any).cloudinary) {
            const script = document.createElement('script');
            script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
            script.onload = () => {
                initializeWidget();
            };
            script.onerror = () => {
                console.error('Failed to load Cloudinary library.');
            };
            document.body.appendChild(script);
        } else {
            initializeWidget();
        }
    }, [onUpload]);

    const handleOpenWidget = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        } else {
            console.error('Widget is not initialized.');
        }
    };

    return (
        <div>
            {!uploadedImageUrl && (
                <Button sx={{ mx: 2, mt: 2 }} onClick={handleOpenWidget} variant="contained" startIcon={<CloudUploadIcon />}>
                    画像アップロード
                </Button>
            )}
        </div>
    );
};

export default UploadWidget;

