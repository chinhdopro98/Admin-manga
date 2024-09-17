"use client";
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IType } from '@/redux/interfaces/interfaces';
import { GroupsFilters } from '@/components/dashboard/group/group-filter';
import { GroupsTable } from '@/components/dashboard/group/group-table';
import { getGroups } from '@/redux/actions/group';
import LoadingPopup from '@/components/core/loadding';
import { Box } from '@mui/material';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const groups = useAppSelector((state: RootState) => state.group.groups);
    const pagination = useAppSelector((state: RootState) => state.group.pagination);
    const loading = useAppSelector((state: RootState) => state.group.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getGroups({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(groups, page, rowsPerPage);
    return (
        <Box>
            <LoadingPopup open={loading} />
            <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                    <Typography variant="h4">Nhóm dịch</Typography>
                </Stack>
                <GroupsFilters />
                <GroupsTable
                    count={pagination.count}
                    page={pagination.currentPage}
                    groups={groups}
                    rowsPerPage={pagination.totalPages}
                />
            </Stack>
        </Box>
    );
}

function applyPagination(types: IType[], page: number, rowsPerPage: number): IType[] {
    return types.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
