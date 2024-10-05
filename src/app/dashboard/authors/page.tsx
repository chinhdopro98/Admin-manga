"use client";
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IAuthor } from '@/redux/interfaces/interfaces';
import { createAuthor, deleteAuthor, getAuhtors, updateAuthor } from '@/redux/actions/author';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';
import HeaderPage from '@/components/dashboard/core/header/hearder';
import SearchName from '@/components/dashboard/core/search/search-name';
import ConfirmDeleteDialog from '@/components/dashboard/core/dialog/delete';
import CreateItemDialog from '@/components/dashboard/core/dialog/create';
import UpdateItemDialog from '@/components/dashboard/core/dialog/update';
import AlertNotification from '@/components/core/toast';
import { changeAuthorItem, deleteAuthorItem, onCloseToastAuthor } from '@/redux/reducers/author';
import AuthorList from '@/components/dashboard/author/author-list';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const authors = useAppSelector((state: RootState) => state.author.authors);
    const pagination = useAppSelector((state: RootState) => state.author.pagination);
    const loading = useAppSelector((state: RootState) => state.author.loading);
    const showSuccess = useAppSelector((state: RootState) => state.author.showSuccess);
    const showError = useAppSelector((state: RootState) => state.author.showError);
    const [value, setSearchValue] = useState('');
    const [bgDark, setBgDark] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCteate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState<IAuthor | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAuhtors({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(authors, page, rowsPerPage);
    const handleOpenModelCreate = () => {
        setOpenModalCreate(true);
    };
    const handleReset = () => {
        setSearchValue('');
        dispatch(getAuhtors({ page: 1, per_page: rowsPerPage, sort, include }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getAuhtors({ page, per_page: rowsPerPage, sort, include, name: value }));
    };

    // delete
    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setAuthor(null);
    };

    const handleDelete = (author: IAuthor) => {
        setAuthor(author);
        setOpenModalDelete(true);
    };


    const handleConfirmDelete = () => {
        if (author && author?.id) {
            setBgDark(true);
            setSearchValue('');
            setOpenModalDelete(false);
            dispatch(deleteAuthor(author?.id));
            dispatch(deleteAuthorItem(author?.id))
        }
    };

    // create
    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        setName('');
    };

    const handleConfirmCreate = () => {
        setBgDark(true);
        dispatch(createAuthor(name));
        dispatch(getAuhtors({ page, per_page: rowsPerPage, sort, include, name: value }));
        setName('');
    };

    const toggleBgDark = () => {
        setBgDark(true);
    }

    // update
    const handleUpdate = (author: IAuthor) => {
        setAuthor(author);
        setOpenModalUpdate(true);
        setName(author?.name);
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
        setName('');
    };

    const handleConfirmUpdate = () => {
        setBgDark(true);
        dispatch(updateAuthor({ id: author?.id, name }));
        dispatch(changeAuthorItem({ id: author?.id, name }));
        setName('');
    };

    return (
        <Box>
            <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0)' : undefined} />
            <Stack spacing={3}>
                <HeaderPage name="Tác giả" onClick={handleOpenModelCreate} />
                <SearchName
                    title='Tên tác giả'
                    value={value}
                    placeholder='name'
                    onSearchChange={setSearchValue}
                    onReset={handleReset}
                    onSubmit={handleSubmit}
                />
                <AuthorList
                    toggleBgDark={toggleBgDark}
                    count={pagination.count}
                    page={pagination.currentPage}
                    authors={authors}
                    rowsPerPage={pagination.totalPages}
                    onDeleteItem={handleDelete}
                    onUpdateItem={handleUpdate}
                />
            </Stack>
            <AlertNotification showError={showError} showSuccess={showSuccess} onClose={onCloseToastAuthor} />
            <ConfirmDeleteDialog
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                onConfirm={handleConfirmDelete}
                name={author ? author.name : ''}
                type='tác giả'
            />
            <CreateItemDialog
                open={openModalCteate}
                onClose={handleCloseModalCreate}
                onConfirm={handleConfirmCreate}
                name='Tác giả'
                inputValue={name}
                onInputChange={setName}
            />
            <UpdateItemDialog
                open={openModalUpdate}
                onClose={handleCloseModalUpdate}
                onConfirm={handleConfirmUpdate}
                name='Tác giả'
                inputValue={name}
                onInputChange={setName}
            />

        </Box>
    );
}

function applyPagination(authors: IAuthor[], page: number, rowsPerPage: number): IAuthor[] {
    return authors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
