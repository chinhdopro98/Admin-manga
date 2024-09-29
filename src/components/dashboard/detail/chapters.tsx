import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Box, Button,
    CardContent, Card, CardHeader, Typography
} from '@mui/material';
import { Trash, PencilSimpleLine, Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr';
import { IChapter } from '@/redux/interfaces/interfaces';
import dayjs from 'dayjs';
import Link from 'next/link';
import { paths } from '@/paths';
import DeleteConfirmationModal from '../core/model/delete-model';

interface ChapterProps {
    chapters?: IChapter[];
    mangaId?: string;
}

const Chapters: React.FC<ChapterProps> = ({ chapters = [], mangaId }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [selectedChapter, setSelectedChapter] = useState<IChapter | null>(null);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allChapterIds = chapters.map((chapter) => chapter.id);
            setSelectedChapters(allChapterIds);
            setSelectAll(true);
        } else {
            setSelectedChapters([]);
            setSelectAll(false);
        }
    };

    const getDeleteModalTitle = () => {
        if (selectedChapter) {
            return `${selectedChapter.name}`;
        }
        return `${selectedChapters.length} chương đã chọn`;
    };

    const handleCheckboxClick = (chapterId: string) => {
        const updatedSelectedChapters = selectedChapters.includes(chapterId)
            ? selectedChapters.filter(id => id !== chapterId)
            : [...selectedChapters, chapterId];
        setSelectedChapters(updatedSelectedChapters);
        setSelectAll(updatedSelectedChapters.length === chapters.length);
    };

    const handleDeleteClick = (chapter?: IChapter) => {
        setOpenModal(true);
        if (chapter) {
            setSelectedChapter(chapter);
        } else {
            setSelectedChapter(null);
        }
    };

    const handleConfirmDelete = () => {
        setOpenModal(false);
        setSelectedChapter(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedChapter(null);
    };

    return (
        <>
            <Card sx={{ mt: 5 }}>
                <CardContent>
                    <CardHeader
                        sx={{ p: 0, pb: 2, borderBottom: "1px solid #303030" }}
                        title="Danh sách chương"
                        action={
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {selectedChapters.length > 0 && (
                                    <Button
                                        startIcon={<Trash fontSize="var(--icon-fontSize-md)" />}
                                        variant="outlined"
                                        sx={{ borderRadius: "5px", minWidth: "80px", height: "40px" }}
                                        onClick={() => handleDeleteClick()}
                                    >
                                        Xóa
                                    </Button>
                                )}
                                <Button
                                    startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
                                    variant="contained"
                                    sx={{ borderRadius: "5px", minWidth: "100px", height: "40px" }}
                                >
                                    Tạo mới
                                </Button>
                            </Box>
                        }
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox" style={{ width: '50px', textAlign: 'center' }}>
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={handleSelectAllClick}
                                            indeterminate={selectedChapters.length > 0 && selectedChapters.length < chapters.length}
                                        />
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell style={{ width: '100px' }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chapters.map((chapter) => {
                                    const isSelected = selectedChapters.includes(chapter.id);
                                    return (
                                        <TableRow hover key={chapter.id}>
                                            <TableCell padding="checkbox" style={{ width: '50px', textAlign: 'center' }}>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() => handleCheckboxClick(chapter.id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography component="span" sx={{ color: '#635bff' }}>
                                                    {chapter.name}
                                                </Typography>
                                                <Typography component="p" sx={{ fontSize: '14px', mt: 1 }}>
                                                    {chapter.created_at ? dayjs(chapter.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" gap={1}>
                                                    <Link href={paths.dashboard.chapterDetail(mangaId, chapter.id)} passHref>
                                                        <Button variant="outlined" sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px" }}>
                                                            <PencilSimpleLine size={16} />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px" }}
                                                        onClick={() => handleDeleteClick(chapter)}
                                                    >
                                                        <Trash size={16} />
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {(selectedChapter || selectedChapters.length > 0) && (
                <DeleteConfirmationModal
                    open={openModal}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    itemName={getDeleteModalTitle()}
                />
            )}
        </>
    );
};

export default Chapters;