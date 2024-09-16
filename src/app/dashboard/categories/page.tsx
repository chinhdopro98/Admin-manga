"use client";

import React, { useEffect } from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { ICategory } from '@/redux/interfaces/interfaces';
import { getCategories } from '@/redux/actions/category';
import { CategoriesFilters } from '@/components/dashboard/category/category-filter';
import { CategoriesTable } from '@/components/dashboard/category/category-table';
export default function Page(): React.JSX.Element {
  const page = 1;
  const rowsPerPage = 50;
  const sort = '-id';
  const categories = useAppSelector((state: RootState) => state.category.categories);
  const pagination = useAppSelector((state: RootState) => state.category.pagination);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategories({ page, per_page: rowsPerPage, sort }));
  }, [dispatch]);
  const paginatedCustomers = applyPagination(categories, page, rowsPerPage);
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
      <Typography variant="h4">Thể loại</Typography>
      </Stack>
      <CategoriesFilters />
      <CategoriesTable
        count={pagination.count}
        page={pagination.currentPage}
        categories={categories}
        rowsPerPage={pagination.totalPages}
      />
    </Stack>
  );
}

function applyPagination(categories: ICategory[], page: number, rowsPerPage: number): ICategory[] {
  return categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
