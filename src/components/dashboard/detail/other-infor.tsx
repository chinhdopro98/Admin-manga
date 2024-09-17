"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import { IManga } from '@/redux/interfaces/interfaces';
interface MangaDetailProps {
    manga?: IManga | null;
}

const OtherInfoDetail: React.FC<MangaDetailProps> = ({ manga }) => {
    return (
        <Card >
            <CardContent>
                <Box>
                    <img src={manga?.cover_full_url} style={{ width: "100%", height: "220px" }} />
                </Box>

            </CardContent>
        </Card >
    );
};

export default OtherInfoDetail;