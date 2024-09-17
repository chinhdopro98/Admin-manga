"use client";

import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IComment } from '@/redux/interfaces/interfaces';
import { CommentsTable } from '@/components/dashboard/comment/comment-table';
import { CommentFilters } from '@/components/dashboard/comment/comment-filter';
import { getComments } from '@/redux/actions/comment';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';

export default function Page(): React.JSX.Element {
  const page = 1;
  const rowsPerPage = 50;
  const sort = '-created_at';
  const include = 'user';
  const comments = useAppSelector((state: RootState) => state.comment.comments);
  const loading = useAppSelector((state: RootState) => state.comment.loading);
  const pagination = useAppSelector((state: RootState) => state.comment.pagination);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getComments({ page, per_page: rowsPerPage, sort, include }));
  }, [dispatch]);
  const paginatedCustomers = applyPagination(comments, page, rowsPerPage);
  return (
    <Box>
      <LoadingPopup open={loading} />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Typography variant="h4">Thể loại</Typography>
        </Stack>
        <CommentFilters />
        <CommentsTable
          count={pagination.count}
          page={pagination.currentPage}
          comments={comments}
          rowsPerPage={pagination.totalPages}
        />
      </Stack>
    </Box>
  );
}

function applyPagination(comments: IComment[], page: number, rowsPerPage: number): IComment[] {
  return comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
