"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { useRouter } from 'next/navigation';
import { getChapterdetail } from '@/redux/actions/manga';
import { Typography } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';

const ChapterDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const mangaId = params.id as string;
  const chapterId = params.chapterId as string;
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const chapter = useAppSelector((state: RootState) => state.manga.chapter);
  const error = useAppSelector((state: RootState) => state.manga.error);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (chapterId) {
      dispatch(getChapterdetail(chapterId));
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
      <Typography variant="h2">{chapter?.name}</Typography>
    </Box>
  );
};

export default ChapterDetail;