"use client";

import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { ICategory } from '@/redux/interfaces/interfaces';
import { createCategory, deleteCategory, getCategories } from '@/redux/actions/category';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';
import AlertNotification from '@/components/core/toast';
import { onCloseToastCategory } from '@/redux/reducers/category';
import ConfirmDeleteDialog from '@/components/dashboard/core/dialog/delete';
import CreateItemDialog from '@/components/dashboard/core/dialog/create';
import HeaderPage from '@/components/dashboard/core/header/hearder';
import CategoryList from '@/components/dashboard/category/category-list';
import SearchName from '@/components/dashboard/core/search/search-name';
export default function Page(): React.JSX.Element {
  const page = 1;
  const rowsPerPage = 50;
  const sort = '-id';
  const [value, setSearchValue] = useState('');
  const [bgDark, setBgDark] = useState(false);
  const categories = useAppSelector((state: RootState) => state.category.categories);
  const pagination = useAppSelector((state: RootState) => state.category.pagination);
  const loading = useAppSelector((state: RootState) => state.category.loading);
  const showSuccess = useAppSelector((state: RootState) => state.category.showSuccess);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalCteate, setOpenModalCreate] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ICategory | null>(null);
  const showError = useAppSelector((state: RootState) => state.category.showError);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategories({ page, per_page: rowsPerPage, sort, name: value }));
  }, [dispatch]);
  const paginatedCustomers = applyPagination(categories, page, rowsPerPage);
  const handleReset = () => {
    setSearchValue('');
    dispatch(getCategories({ page: 1, per_page: rowsPerPage, sort, name: '' }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getCategories({ page, per_page: rowsPerPage, sort, name: value }));
  };
  const toggleBgDark = () => {
    setBgDark(true);
  }

  const handleDelete = (category: ICategory) => {
    setCategory(category);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
    setCategory(null);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
    setName('');
  };

  const handleOpenModelCreate = () => {
    setOpenModalCreate(true);
  };
  const handleConfirmDelete = () => {
    if (category && category?.id) {
      setSearchValue('');
      setOpenModalDelete(false);
      dispatch(deleteCategory(category.id));
      dispatch(getCategories({ page, per_page: rowsPerPage, sort, name: '' }));
    }
  };

  const handleConfirmCreate = () => {
    setBgDark(true);
    dispatch(createCategory(name));
    dispatch(getCategories({ page, per_page: rowsPerPage, sort, name: value }));
    setName('');
  };
  return (
    <Box>
      <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0)' : undefined} />
      <Stack spacing={3}>
        <HeaderPage name="Thể loại" onClick={handleOpenModelCreate} />
        <SearchName
          title='Tên thể loại'
          value={value}
          placeholder='name'
          onSearchChange={setSearchValue}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
        <CategoryList
          toggleBgDark={toggleBgDark}
          count={pagination.count}
          page={pagination.currentPage}
          categories={categories}
          rowsPerPage={pagination.totalPages}
          onDeleteItem={handleDelete}
        />
      </Stack>
      <AlertNotification showError={showError} showSuccess={showSuccess} onClose={onCloseToastCategory} />
      <ConfirmDeleteDialog
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        onConfirm={handleConfirmDelete}
        name={category ? category.name : ''}
        type='Thể loại'
      />
      <CreateItemDialog
        open={openModalCteate}
        onClose={handleCloseModalCreate}
        onConfirm={handleConfirmCreate}
        name='Thể loại'
        inputValue={name}
        onInputChange={setName}
      />
    </Box>
  );
}

function applyPagination(categories: ICategory[], page: number, rowsPerPage: number): ICategory[] {
  return categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
