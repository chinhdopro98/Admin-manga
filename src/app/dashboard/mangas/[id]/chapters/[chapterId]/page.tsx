"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-hook-redux";
import { RootState } from "@/redux/stores";
import { getChapterdetail, updateChapter } from "@/redux/actions/manga";
import { CardContent, Card, Grid, Typography, Button, Box, Alert } from "@mui/material";
import dayjs from 'dayjs';
import { FloppyDiskBack } from '@phosphor-icons/react/dist/ssr';
import ImageDropzone from "@/components/dashboard/chapter/dropzone";
import { ChapName } from "@/components/dashboard/chapter/name-chap";
import PanelList from "@/components/dashboard/chapter/panel-list";
import AlertNotification from "@/components/core/toast";
import { deleteAllContent, onCloseToastManga } from "@/redux/reducers/manga";
import LoadingPopup from "@/components/core/loadding";

const ChapterDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const chapterId = params.chapterId as string;
  const [name, setName] = useState('');
  const chapter = useAppSelector((state: RootState) => state.manga.chapter);
  const error = useAppSelector((state: RootState) => state.manga.error);
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const showSuccess = useAppSelector((state: RootState) => state.manga.showSuccess);
  const showError = useAppSelector((state: RootState) => state.manga.showError);
  const [images, setImages] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [chapterContent, setChapterContent] = useState<any[]>([]);
  const handleDropImages = (newImages: any[]) => {
    // setImages((prev) => [...prev, ...newImages]);
    // const newPanels = newImages.map((image, index) => ({
    //   name: `Page ${index + 1}`,
    //   url: image.preview,
    // }));
    // setChapterContent(newPanels)
  };

  useEffect(() => {
    if (chapter?.name) {
      setName(chapter?.name);
    }
  }, [chapter?.name]);

  useEffect(() => {
    if (chapterId) {
      dispatch(getChapterdetail(chapterId));
    }
  }, [dispatch, chapterId]);

  useEffect(() => {
    if (error) {
      router.push("/not-found");
    }
  }, [error, router]);

  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleSubmit = () => {
    dispatch(updateChapter({
      name,
      id: chapterId,
      contents: chapter?.content || []
    }))
  };
  return (
    <Box>
      <LoadingPopup open={loading} />
      <Grid container alignItems="center" sx={{ mb: 3, pb: 1, borderBottom: "1px solid #484848" }}>
        <Grid item xs>
          <Typography variant="body2" sx={{ fontSize: "16px", fontStyle: "oblique" }}>
            Cập nhật lần cuối lúc {chapter?.updated_at ? dayjs(chapter.updated_at).format('HH:mm:ss DD/MM/YYYY') : ""}
          </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right', flex: '0 0 100px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ borderRadius: "5px", p: "8px 15px" }}
          >
            <FloppyDiskBack size={18} /> Lưu
          </Button>
        </Grid>
      </Grid>
      <ChapName name={name} onNameChange={handleNameChange} />
      <Box>
        <Typography sx={{ fontSize: "16px" }}>Hình chương:</Typography>
        <ImageDropzone onDropImages={handleDropImages} text='Bấm chọn hoặc kéo thả vào đây, các ảnh cũ sẽ được tự động xoá, tối đa 200 ảnh, mỗi ảnh 3MB' />
      </Box>
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <PanelList chapterContent={chapter?.content || []} />
        </CardContent>
      </Card>
      <AlertNotification showError={showError} showSuccess={showSuccess} onClose={onCloseToastManga} />
    </Box>
  );
};

export default ChapterDetail;