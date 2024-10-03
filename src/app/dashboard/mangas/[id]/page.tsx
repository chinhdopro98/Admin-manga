"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { IManga } from '@/redux/interfaces/interfaces';
import AlertNotification from '@/components/core/toast';
import { onCloseToastManga } from '@/redux/reducers/manga';
import ErrorDialog from "@/components/dashboard/core/dialog/error";

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
  const [bgDark, setBgDark] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [mangaData, setMangaData] = useState<IManga>({
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
    artist_id: '',
    doujinshi: undefined,
    artist: undefined,
    group: undefined,
    user: undefined
  });

  useEffect(() => {
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
        doujinshi: manga?.doujinshi || undefined,
        artist: manga?.artist || undefined,
        group: manga.group || undefined,
        user: manga.user || undefined
      });
    }
  }, [manga]);
  const handleSubmit = () => {
    if (!mangaData?.name) {
      setOpenDialog(true);
    } else {
      setBgDark(true);
      const filteredMangaData = Object.fromEntries(
        Object.entries(mangaData).filter(([_, value]) => value !== null && value !== '')
      );
      dispatch(updateManga({
        id,
        data: filteredMangaData
      })).finally(() => setBgDark(false));
    }
  };
  const handleMangaDataChange = useCallback((field: string, value: any) => {
    setMangaData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const mangaId = Array.isArray(id) ? id[0] : id;
    if (mangaId && (!manga || manga.id !== mangaId)) {
      dispatch(getMangaSingle({ include, id: mangaId }));
      dispatch(getChapters({ id: mangaId, per_page: 9999 }));
    }
  }, [dispatch, id, manga]);

  useEffect(() => {
    if (error) {
      router.push('/not-found');
    }
  }, [error, router]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box>
      <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0.3)' : undefined} />
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
            <AvatarView
              imagePreview={imagePreview}
              manga={manga}
              onImageChange={handleImageChange}
            />
            <Contributors manga={manga} onChange={handleMangaDataChange} />
          </Grid>
        </Grid>
      </Stack>
      <AlertNotification showError={showError} showSuccess={showSuccess} onClose={onCloseToastManga} />
      <ErrorDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        message="Vui lòng nhập kiểm tra lại thông tin."
      />
    </Box>
  );
};

export default MangaDetail;