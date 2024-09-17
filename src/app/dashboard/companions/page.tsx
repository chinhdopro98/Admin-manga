"use client";
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { ICompanion } from '@/redux/interfaces/interfaces';
import { getCompanions } from '@/redux/actions/companion';
import { CompanionsTable } from '@/components/dashboard/companion/companion-table';
import { CompanionFilters } from '@/components/dashboard/companion/companion-filter';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const companions = useAppSelector((state: RootState) => state.companion.companions);
    const pagination = useAppSelector((state: RootState) => state.companion.pagination);
    const loading = useAppSelector((state: RootState) => state.companion.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCompanions({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(companions, page, rowsPerPage);
    return (
        <Box>
            <LoadingPopup open={loading} />
            <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                    <Typography variant="h4">Bạn đồng hành</Typography>
                </Stack>
                <CompanionFilters />
                <CompanionsTable
                    count={pagination.count}
                    page={pagination.currentPage}
                    companions={companions}
                    rowsPerPage={pagination.totalPages}
                />
            </Stack>
        </Box>
    );
}

function applyPagination(companions: ICompanion[], page: number, rowsPerPage: number): ICompanion[] {
    return companions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
