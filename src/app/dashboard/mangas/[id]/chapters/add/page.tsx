"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/use-hook-redux";
import { CardContent, Card, Grid, Typography, Button, Box } from "@mui/material";
import { FloppyDiskBack } from '@phosphor-icons/react/dist/ssr';
import ImageDropzone from "@/components/dashboard/chapter/dropzone";
import { ChapName } from "@/components/dashboard/chapter/name-chap";
import PanelList from "@/components/dashboard/chapter/panel-list";
import { ContentChap } from "@/redux/interfaces/interfaces";
import ErrorDialog from "@/components/dashboard/core/dialog/error";

const AddChapter: React.FC = () => {
    const params = useParams();
    const mangaId = params.id as string;
    const [name, setName] = useState('');
    const [images, setImages] = useState<any[]>([]);
    const [chapterContent, setChapterContent] = useState<ContentChap[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useAppDispatch();

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleDropImages = (newImages: any[]) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        const newPanels = newImages.map((image, index) => ({
            name: `Page ${chapterContent.length + index + 1}`,
            url: image.preview,
        }));
        setChapterContent((prev) => [...prev, ...newPanels]);
    };

    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const handleSubmit = async () => {
        const chapterData = {
            name,
            content: chapterContent,
            mangaId,
        };
        if (!name) {
            setOpenDialog(true);
        } else if (images.length === 0) {
            setOpenDialog(true);
        }
        // router.push(`/dashboard/mangas/${mangaId}/chapters`);
    };
    const onDragEndProp = (sourceIndex: number, destinationIndex: number) => {
        if (sourceIndex === destinationIndex || !chapterContent) return;
        const updatedPanels = [...chapterContent];
        const removed = updatedPanels.splice(sourceIndex, 1);
        if (removed.length > 0) {
            const itemToMove = removed[0];
            updatedPanels.splice(destinationIndex, 0, itemToMove);
        }
        setChapterContent(updatedPanels);
    };
    const deletePanelProp = (index: number) => {
        const updatedChapters = [...chapterContent];
        updatedChapters.splice(index, 1);
        setChapterContent(updatedChapters);
    };
    return (
        <Box>
            <Grid container alignItems="center" sx={{ mb: 3, pb: 1, borderBottom: "1px solid #484848" }}>
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
                        sx={{ borderRadius: "5px", p: "8px 15px" }}
                    >
                        <FloppyDiskBack size={18} /> Lưu
                    </Button>
                </Grid>
            </Grid>
            <ChapName name={name} onNameChange={handleNameChange} />
            <Box>
                <Typography sx={{ fontSize: "16px" }}>Hình chương:</Typography>
                <ImageDropzone
                    onDropImages={handleDropImages}
                    text={'Bấm chọn hoặc kéo thả vào đây, tối đa 200 ảnh, mỗi ảnh 3MB'
                    } />
            </Box>
            <Card sx={{ mt: 5 }}>
                {
                    images.length > 0 &&
                    (
                        <CardContent>
                            <PanelList
                                chapterContent={chapterContent}
                                isUpdate={false}
                                onDragEndProp={onDragEndProp}
                                deletePanelProp={deletePanelProp} />
                        </CardContent>
                    )
                }
            </Card>
            <ErrorDialog
                open={openDialog}
                handleClose={handleCloseDialog}
                message="Chương phải có ít nhất 1 hình"
            />
        </Box>
    );
};

export default AddChapter;