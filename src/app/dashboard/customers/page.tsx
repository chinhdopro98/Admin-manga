"use client";

import React, { useEffect } from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { getAllUser } from '@/redux/actions/user';
import { IUser } from '@/redux/interfaces/interfaces';


export default function Page(): React.JSX.Element {
  const page = 1;
  const rowsPerPage = 5;
  const sort = '-created_at';
  const users = useAppSelector((state: RootState) => state.user.users);
  const pagination = useAppSelector((state: RootState) => state.user.pagination);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUser({ page, per_page: rowsPerPage, sort }));
  }, [dispatch]);
  const paginatedCustomers = applyPagination(users, page, rowsPerPage);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
      <Typography variant="h4">Danh sách thành viên</Typography>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={pagination.count}
        page={pagination.currentPage}
        users={users}
        rowsPerPage={pagination.totalPages}
      />
    </Stack>
  );
}

function applyPagination(users: IUser[], page: number, rowsPerPage: number): IUser[] {
  return users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
