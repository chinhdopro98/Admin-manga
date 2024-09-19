"use client";

import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { IManga } from '@/redux/interfaces/interfaces';
import { MangaPilotForm } from '../core/form/manga-pilot';
import { MangaNameForm } from '../core/form/manga-name';
import { MangaSubNameForm } from '../core/form/manga-subname';
import { MangaTypeForm } from '../core/form/manga-type';
import { MangaCategoryForm } from '../core/form/manga-category';
import { MangaActionForm } from '../core/form/manga-action';

interface MangaDetailProps {
    manga?: IManga | null;
}

const InformationDetail: React.FC<MangaDetailProps> = ({ manga }) => {
    return (
        <Card >
            <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Thông tin chi tiết</Typography>
                <MangaNameForm sx={{ marginBottom: 2 }} name={manga?.name} />
                <MangaSubNameForm sx={{ marginBottom: 2 }} name={manga?.name_alt} />
                <MangaTypeForm sx={{ marginBottom: 2 }} type={manga?.doujinshi} isRenderDetail={true} />
                <MangaActionForm sx={{ marginBottom: 2 }} text={manga?.finished_by} />
                <MangaCategoryForm sx={{ marginBottom: 2 }} props={manga?.genres} />
                <MangaPilotForm sx={{ marginBottom: 5 }} text={manga?.pilot} />
            </CardContent>
        </Card>
    );
};

export default InformationDetail;