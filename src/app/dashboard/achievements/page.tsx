"use client";
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IAchievement } from '@/redux/interfaces/interfaces';
import { AchievementFilters } from '@/components/dashboard/achievement/achievement-filter';
import { AchievementsTable } from '@/components/dashboard/achievement/achievement-table';
import { getAchievements } from '@/redux/actions/achievement';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const achievements = useAppSelector((state: RootState) => state.achievement.achievements);
    const pagination = useAppSelector((state: RootState) => state.achievement.pagination);
    const loading = useAppSelector((state: RootState) => state.achievement.loading);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAchievements({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(achievements, page, rowsPerPage);
    return (
        <Box>
            <LoadingPopup open={loading} />
            <Stack spacing={3}>
                <Stack direction="row" spacing={3}>
                    <Typography variant="h4">Danh hiệu</Typography>
                </Stack>
                <AchievementFilters />
                <AchievementsTable
                    count={pagination.count}
                    page={pagination.currentPage}
                    achievements={achievements}
                    rowsPerPage={pagination.totalPages}
                />
            </Stack>
        </Box>
    );
}

function applyPagination(achievements: IAchievement[], page: number, rowsPerPage: number): IAchievement[] {
    return achievements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
