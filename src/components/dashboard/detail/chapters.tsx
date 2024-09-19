
import React from 'react'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Paper, Box,
    Button,
    CardContent,
    Card,
    CardHeader,
    Typography
} from '@mui/material';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import { PencilSimpleLine } from '@phosphor-icons/react/dist/ssr';
import { IChapter } from '@/redux/interfaces/interfaces';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import Link from 'next/link';
import { paths } from '@/paths';

interface ChapterProps {
    chapters?: IChapter[];
    mangaId?: string
}
const Chapters = ({ chapters = [], mangaId }: ChapterProps) => {
    return (
        <Card sx={{ mt: 5 }}>
            <CardContent>
                <CardHeader sx={{ p: 0, pb: 2, borderBottom: "1px solid #303030" }}
                    title="Danh sách chương"
                    action={
                        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained"
                            sx={{ p: 0, borderRadius: "5px", minWidth: "100px", height: "40px", mr: 1 }}>
                            Tạo mới
                        </Button>
                    }
                />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" style={{ width: '50px', textAlign: 'center' }}>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell style={{ width: '100px' }}>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chapters.map((chapter) => {
                                return (
                                    <TableRow hover key={chapter.id} >
                                        <TableCell padding="checkbox" style={{ width: '50px', textAlign: 'center' }}>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>
                                            <Link href={''}>
                                                <Typography component="span" sx={{ color: '#635bff' }}>{chapter.name}</Typography>
                                            </Link>
                                            <Typography component="p" className="chapter-date" sx={{ fontSize: '14px', mt: 1 }}>
                                                {chapter.created_at ? dayjs(chapter.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" gap={1}>
                                                <Button variant="outlined" sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px" }}>
                                                    <Trash size={16} />
                                                </Button>
                                                <Link href={paths.dashboard.chapterDetail(mangaId, chapter.id)} passHref>
                                                    <Button variant="outlined" sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px" }}>
                                                        <PencilSimpleLine size={16} />
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card >
    )
}

export default Chapters