"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { config } from '@/config';
import { MangaCard } from '@/components/dashboard/manga/mangas-card';
import { MangaFilters } from '@/components/dashboard/manga/mangas-filters';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { getMangas } from '@/redux/actions/manga';
import LoadingPopup from '@/components/core/loadding';

export default function Page(): React.JSX.Element {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 12;
  const sort = '-created_at';
  const include = 'group,user,genres,artist,doujinshi';
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const mangas = useAppSelector((state: RootState) => state.manga.mangas);
  const pagination = useAppSelector((state: RootState) => state.manga.pagination);
  const dispatch = useAppDispatch();
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(getMangas({ page: value, per_page: rowsPerPage, sort, include }));
  };
  React.useEffect(() => {
    dispatch(getMangas({ page, per_page: rowsPerPage, sort, include }));
  }, [dispatch]);
  return (
    <Box>
      <LoadingPopup open={loading} /> {/* Show loading popup if loading is true */}
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Danh sách truyện</Typography>
          </Stack>
          <div>
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
              Add
            </Button>
          </div>
        </Stack>
        <MangaFilters />
        <Grid container spacing={3}>
          {mangas.map((manga) => (
            <Grid key={manga.id} lg={6} md={6} xs={12}>
              <MangaCard manga={manga} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

          <Pagination count={Math.ceil((pagination.total / rowsPerPage))} page={page} size="small" onChange={handleChangePage} />
        </Box>
      </Stack>
    </Box>
  );
}
