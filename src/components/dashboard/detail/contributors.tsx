"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import { IManga } from '@/redux/interfaces/interfaces';
import { MangaAuthorForm } from '../core/form/manga-author';
import { MangaGroupForm } from '../core/form/manga-group';
import { MangaStatusForm } from '../core/form/manga-status';
import { MangaCreatorForm } from '../core/form/manga-creator';
interface MangaDetailProps {
    manga?: IManga | null;
}

const Contributors: React.FC<MangaDetailProps> = ({ manga }) => {
    return (
        <Card sx={{ mt: "30px" }}>
            <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Thông tin khác</Typography>
                <Box>
                    <MangaStatusForm sx={{ marginBottom: 2 }} status={manga?.status} />
                    <MangaAuthorForm sx={{ marginBottom: 2 }} user={manga?.artist} isRenderDetail={true} />
                    <MangaGroupForm sx={{ marginBottom: 2 }} group={manga?.group} isRenderDetail={true} />
                    <MangaCreatorForm sx={{ marginBottom: 2 }} user={manga?.user} isRenderDetail={true} />
                </Box>
            </CardContent>
        </Card >
    );
};

export default Contributors;