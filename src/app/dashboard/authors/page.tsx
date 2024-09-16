"use client";
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IAuthor } from '@/redux/interfaces/interfaces';
import { AuthorFilters } from '@/components/dashboard/author/author-filter';
import { AuthorsTable } from '@/components/dashboard/author/author-table';
import { getAuhtors } from '@/redux/actions/author';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const authors = useAppSelector((state: RootState) => state.author.authors);
    const pagination = useAppSelector((state: RootState) => state.author.pagination);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAuhtors({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(authors, page, rowsPerPage);
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Typography variant="h4">Tác giả</Typography>
            </Stack>
            <AuthorFilters />
            <AuthorsTable
                count={pagination.count}
                page={pagination.currentPage}
                authors={authors}
                rowsPerPage={pagination.totalPages}
            />
        </Stack>
    );
}

function applyPagination(authors: IAuthor[], page: number, rowsPerPage: number): IAuthor[] {
    return authors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
