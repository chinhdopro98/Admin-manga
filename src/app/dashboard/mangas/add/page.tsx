"use client";

import React, { useState } from "react";
import Box from '@mui/material/Box';
import LoadingPopup from '@/components/core/loadding';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { FloppyDiskBack } from '@phosphor-icons/react/dist/ssr';
import AvatarView from '@/components/dashboard/detail/avatar-view';
import Contributors from '@/components/dashboard/detail/contributors';
import { InformationDetail } from '@/components/dashboard/detail/information';
import { IManga } from '@/redux/interfaces/interfaces';
import AlertNotification from '@/components/core/toast';
import { onCloseToastManga } from '@/redux/reducers/manga';
import { createManga, updateManga } from '@/redux/actions/manga';
import ErrorDialog from '@/components/dashboard/core/dialog/error';

const AddManga: React.FC = () => {
    const mangaData = useAppSelector((state: RootState) => state.manga.manga);
    const loading = useAppSelector((state: RootState) => state.manga.loading);
    const error = useAppSelector((state: RootState) => state.manga.error);
    const showSuccess = useAppSelector((state: RootState) => state.manga.showSuccess);
    const showError = useAppSelector((state: RootState) => state.manga.showError);
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [bgDark, setBgDark] = useState(false);
    const [manga, setManga] = useState<IManga>({
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

    const handleSubmit = () => {
        setBgDark(true);
        if (!manga.name || !imagePreview) {
            setOpenDialog(true);
        } else {
            const filteredMangaData = Object.fromEntries(
                Object.entries(manga).filter(([_, value]) => value !== null && value !== '')
            );
            if (mangaData) {
                dispatch(updateManga({
                    id: mangaData.id,
                    data: filteredMangaData
                })).finally(() => setBgDark(false));
            } else {
                dispatch(createManga({
                    data: filteredMangaData
                })).finally(() => setBgDark(false));
            }
        }
    };

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

    const handleMangaDataChange = React.useCallback((field: string, value: any) => {
        setManga(prevState => ({
            ...prevState,
            [field]: value,
        }));
    }, []);
    const dispatch = useAppDispatch();
    return (
        <Box>
            <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0.3)' : undefined} />
            <Stack spacing={3}>
                <Stack sx={{ flex: '1 1 auto', borderBottom: "1px solid #484848", pb: 1 }}>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography variant="body2" sx={{ fontSize: "18px", fontWeight: "bold" }}>
                                Thông tin
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
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <AvatarView
                            imagePreview={imagePreview}
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

export default AddManga;