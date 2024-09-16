'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';
import { IComment } from '@/redux/interfaces/interfaces';
function noop(): void {
    // do nothing
}
interface CommentTableProps {
    count?: number;
    page?: number;
    comments?: IComment[];
    rowsPerPage?: number;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
    console.log('Trang mới:', newPage);
}

export function CommentsTable({
    count = 0,
    comments = [],
    page = 0,
    rowsPerPage = 0,
}: CommentTableProps): React.JSX.Element {

    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Tạo bởi</TableCell>
                            <TableCell>Nội dung</TableCell>
                            <TableCell>Tạo lúc</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment) => {
                            return (
                                <TableRow hover key={comment.id} >
                                    <TableCell>{comment.id}</TableCell>
                                    <TableCell>{comment?.user?.name}</TableCell>
                                    <TableCell
                                        dangerouslySetInnerHTML={{ __html: comment.content }}
                                    />
                                    <TableCell>
                                        {comment.created_at ? dayjs(comment.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
                                    </TableCell>
                                    <TableCell>1</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25,]}
            />
        </Card>
    );
}
