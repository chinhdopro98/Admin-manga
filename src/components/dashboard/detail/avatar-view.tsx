"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Input, Typography } from '@mui/material';
import { IManga } from '@/redux/interfaces/interfaces';
import { UploadSimple } from '@phosphor-icons/react/dist/ssr';

interface MangaDetailProps {
    manga?: IManga | null;
}

const AvatarView: React.FC<MangaDetailProps> = ({ manga }) => {
    return (
        <Card >
            <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Ảnh bìa</Typography>
                <Box>
                    <Box sx={{ width: "200px", margin: 'auto', textAlign: "center" }}>
                        <img
                            alt="cover"
                            className="cover"
                            src={manga?.cover_full_url}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <Input
                            type="file"
                            style={{ display: 'none' }}
                            inputProps={{ name: 'cover' }}
                        />
                        <br />
                        <Button
                            variant="contained"
                            component="label"
                            style={{ marginTop: '1rem' }}
                        >
                            <UploadSimple size={25} /> Upload
                            <Input
                                sx={{ display: "none" }}
                                type="file"
                                hidden
                                inputProps={{ name: 'cover' }}
                            />
                        </Button>
                    </Box>

                </Box>
            </CardContent>
        </Card >
    );
};

export default AvatarView;