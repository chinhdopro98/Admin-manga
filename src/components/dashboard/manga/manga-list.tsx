import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { MangaCard } from './manga-card';
import { IManga } from '@/redux/interfaces/interfaces';

interface MangaListProps {
    mangas: IManga[];
}

const MangaList: React.FC<MangaListProps> = ({ mangas }) => {
    return (
        <Grid container spacing={3}>
            {mangas.map((manga) => (
                <Grid key={manga.id} lg={6} md={6} xs={12}>
                    <MangaCard manga={manga} />
                </Grid>
            ))}
        </Grid>
    );
};

export default MangaList;