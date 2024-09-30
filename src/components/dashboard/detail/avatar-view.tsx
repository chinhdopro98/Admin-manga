"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { IManga } from '@/redux/interfaces/interfaces';
import { UploadSimple } from '@phosphor-icons/react/dist/ssr';

interface MangaDetailProps {
    manga?: IManga | null;
}

const AvatarView: React.FC<MangaDetailProps> = ({ manga }) => {
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Ảnh bìa</Typography>
                <Box sx={{ width: "200px", margin: 'auto', textAlign: "center" }}>
                    <img
                        alt="cover"
                        className="cover"
                        src={imagePreview || manga?.cover_full_url}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="file-input"
                    />
                    <br />
                    <label htmlFor="file-input">
                        <Button
                            variant="contained"
                            component="span"
                            sx={{ marginTop: '1rem' }}
                        >
                            <UploadSimple size={25} /> Upload
                        </Button>
                    </label>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AvatarView;