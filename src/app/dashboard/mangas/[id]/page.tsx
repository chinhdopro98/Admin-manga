"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'next/navigation';
import LoadingPopup from '@/components/core/loadding';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { Grid, Stack, Typography } from '@mui/material';
import InformationDetail from '@/components/dashboard/detail/information';
import OtherInfoDetail from '@/components/dashboard/detail/other-infor';
import { getMangaSingle } from '@/redux/actions/manga';
import { useRouter } from 'next/navigation';

const MangaDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const include = 'group,user,genres,artist,doujinshi';
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const manga = useAppSelector((state: RootState) => state.manga.manga);
  const error = useAppSelector((state: RootState) => state.manga.error);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const mangaId = Array.isArray(id) ? id[0] : id;
    if (mangaId) {
      dispatch(getMangaSingle({ include, id: mangaId }));
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      router.push('/not-found');
    }
  }, [loading, manga, router]);
  return (
    <Box>
      <LoadingPopup open={loading} />
      <Stack spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Thông tin chi tiết</Typography>
        </Stack>
        <Grid container spacing={5}> {/* Adjust spacing as needed */}
          <Grid item lg={8} md={6} xs={12}>
            <InformationDetail manga={manga} />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <OtherInfoDetail manga={manga} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default MangaDetail;