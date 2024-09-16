"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'next/navigation';
import LoadingPopup from '@/components/core/loadding';
import { useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { Grid, Stack, Typography } from '@mui/material';
import InformationDetail from '@/components/dashboard/detail/information';
import OtherInfoDetail from '@/components/dashboard/detail/other-infor';
const MangaDetail: React.FC = () => {
  const { id } = useParams();
  const rowsPerPage = 12;
  const sort = '-created_at';
  const include = 'group,user,genres,artist,doujinshi';
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  return (
    <Box>
      <LoadingPopup open={loading} />
      <Stack spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h5">Thông tin chi tiết</Typography>
        </Stack>
        <Grid container spacing={5}> {/* Adjust spacing as needed */}
          <Grid item lg={8} md={6} xs={12}>
            <InformationDetail />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <OtherInfoDetail />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default MangaDetail;