"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'next/navigation';
import LoadingPopup from '@/components/core/loadding';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { getChapters, getMangaSingle, updateManga } from '@/redux/actions/manga';
import { useRouter } from 'next/navigation';
import Chapters from '@/components/dashboard/detail/chapters';
import { FloppyDiskBack } from '@phosphor-icons/react/dist/ssr';
import dayjs from 'dayjs';
import AvatarView from '@/components/dashboard/detail/avatar-view';
import Contributors from '@/components/dashboard/detail/contributors';
import { InformationDetail } from '@/components/dashboard/detail/information';
import { IManga, IMangaData } from '@/redux/interfaces/interfaces';
import AlertNotification from '@/components/core/toast';
import { onCloseToastManga } from '@/redux/reducers/manga';

const MangaDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const include = 'group,user,genres,artist,doujinshi';
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const manga = useAppSelector((state: RootState) => state.manga.manga);
  const error = useAppSelector((state: RootState) => state.manga.error);
  const chapters = useAppSelector((state: RootState) => state.manga.chapters);
  const showSuccess = useAppSelector((state: RootState) => state.manga.showSuccess);
  const showError = useAppSelector((state: RootState) => state.manga.showError);
  const [mangaData, setMangaData] = React.useState<IMangaData>({
    name: '',
    name_alt: '',
    doujinshi_id: '',
    finishedBy: '',
    genres: [],
    pilot: '',
    group_id: '',
    is_hot: false,
    status: 0,
    user_id: '',
    artist_id: ''
  });

  React.useEffect(() => {
    if (manga) {
      setMangaData({
        name: manga.name || '',
        name_alt: manga.name_alt || '',
        doujinshi_id: manga.doujinshi_id || '',
        finishedBy: manga.finished_by || '',
        genres: manga.genres || [],
        pilot: manga.pilot || '',
        group_id: manga.group_id || '',
        is_hot: manga.is_hot || false,
        status: manga.status || 0,
        user_id: manga.user_id || '',
        artist_id: manga.artist_id || '',
      });
    }
  }, [manga]);
  console.log(mangaData)
  const handleSubmit = () => {
    dispatch(updateManga({
      id,
      data: mangaData
    }))
  };
  const handleMangaDataChange = React.useCallback((field: string, value: any) => {
    setMangaData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const mangaId = Array.isArray(id) ? id[0] : id;

    if (mangaId && (!manga || manga.id !== mangaId)) {
      dispatch(getMangaSingle({ include, id: mangaId }));
      dispatch(getChapters({ id: mangaId, per_page: 9999 }));
    }
  }, [dispatch, id, manga]);

  // React.useEffect(() => {
  //   if (error) {
  //     router.push('/not-found');
  //   }
  // }, [error, router]);
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
                onClick={handleSubmit}
              >
                <FloppyDiskBack size={18} /> Lưu
              </Button>
            </Grid>
          </Grid>
        </Stack>
        <Grid container spacing={5}>
          <Grid item lg={8} md={6} xs={12}>
            <InformationDetail manga={manga} onChange={handleMangaDataChange} />
            <Chapters chapters={chapters} mangaId={manga?.id} />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <AvatarView manga={manga} />
            <Contributors manga={manga} onChange={handleMangaDataChange} />
          </Grid>
        </Grid>
      </Stack>
      <AlertNotification showError={showError} showSuccess={showSuccess} onClose={onCloseToastManga} />
    </Box>
  );
};

export default MangaDetail;