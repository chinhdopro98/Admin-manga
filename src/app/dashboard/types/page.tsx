"use client";
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { TypeFilters } from '@/components/dashboard/type/type-filter';
import { TypeMangaTable } from '@/components/dashboard/type/type-table';
import { IType } from '@/redux/interfaces/interfaces';
import { getTypes } from '@/redux/actions/type';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const types = useAppSelector((state: RootState) => state.type.types);
    const pagination = useAppSelector((state: RootState) => state.type.pagination);
    const loading = useAppSelector((state: RootState) => state.type.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTypes({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(types, page, rowsPerPage);
    return (
        <Box>
            <LoadingPopup open={loading} />
            <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                    <Typography variant="h4">Kiểu truyện</Typography>
                </Stack>
                <TypeFilters />
                <TypeMangaTable
                    count={pagination.count}
                    page={pagination.currentPage}
                    types={types}
                    rowsPerPage={pagination.totalPages}
                />
            </Stack>
        </Box>
    );
}

function applyPagination(types: IType[], page: number, rowsPerPage: number): IType[] {
    return types.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
