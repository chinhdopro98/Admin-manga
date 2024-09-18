"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'next/navigation';
import LoadingPopup from '@/components/core/loadding';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { Button, Grid, Stack, Typography } from '@mui/material';
import InformationDetail from '@/components/dashboard/detail/information';
import OtherInfoDetail from '@/components/dashboard/detail/other-infor';
import { getChapters, getMangaSingle } from '@/redux/actions/manga';
import { useRouter } from 'next/navigation';
import Chapters from '@/components/dashboard/detail/chapters';
import { FloppyDiskBack } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';

const MangaDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const include = 'group,user,genres,artist,doujinshi';
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const manga = useAppSelector((state: RootState) => state.manga.manga);
  const error = useAppSelector((state: RootState) => state.manga.error);
  const chapters = useAppSelector((state: RootState) => state.manga.chapters);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const mangaId = Array.isArray(id) ? id[0] : id;
    if (mangaId) {
      dispatch(getMangaSingle({ include, id: mangaId }));
      dispatch(getChapters({ id: mangaId, per_page: 9999 }))
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (error) {
      router.push('/not-found');
    }
  }, [error, router]);
  return (
    <Box>
      <LoadingPopup open={loading} />
      <Stack spacing={3}>
        <Stack sx={{ flex: '1 1 auto', borderBottom: "1px solid #484848", pb: 1 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="body2" sx={{ fontSize: "17px", fontStyle: "oblique" }}>
                Cập nhật lần cuối lúc {manga?.updated_at ? dayjs(manga.updated_at).format('HH:mm:ss DD/MM/YYYY') : ""}
              </Typography>
            </Grid>
            <Grid item style={{ textAlign: 'right', flex: '0 0 100px' }}>
              <Button
                variant="contained"
                color="primary"
              >
                <FloppyDiskBack size={18} /> Lưu
              </Button>
            </Grid>
          </Grid>
        </Stack>
        <Grid container spacing={5}>
          <Grid item lg={8} md={6} xs={12}>
            <InformationDetail manga={manga} />
            <Chapters chapters={chapters} />
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