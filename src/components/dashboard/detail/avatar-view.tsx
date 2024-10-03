import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { UploadSimple } from '@phosphor-icons/react/dist/ssr';
import { IManga } from '@/redux/interfaces/interfaces';

interface MangaDetailProps {
    manga?: IManga | null;
    imagePreview: string | null;
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarView: React.FC<MangaDetailProps> = ({ manga, imagePreview, onImageChange }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 2, fontSize: "17px" }}>Ảnh bìa</Typography>
                <Box sx={{ width: "200px", margin: 'auto', textAlign: "center" }}>
                    {
                        (manga?.cover_full_url || imagePreview) && (
                            <img
                                alt="cover"
                                className="cover"
                                src={imagePreview || manga?.cover_full_url}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        )
                    }
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
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