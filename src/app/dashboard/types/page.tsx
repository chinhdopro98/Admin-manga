"use client";
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IType } from '@/redux/interfaces/interfaces';
import { createType, deleteType, getTypes, updateType } from '@/redux/actions/type';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';
import TypeList from '@/components/dashboard/type/type-list';
import ConfirmDeleteDialog from '@/components/dashboard/core/dialog/delete';
import CreateItemDialog from '@/components/dashboard/core/dialog/create';
import UpdateItemDialog from '@/components/dashboard/core/dialog/update';
import HeaderPage from '@/components/dashboard/core/header/hearder';
import AlertNotification from '@/components/core/toast';
import SearchName from '@/components/dashboard/core/search/search-name';
import { changeTypeItem, deleteTypeItem, onCloseToastType } from '@/redux/reducers/type';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const types = useAppSelector((state: RootState) => state.type.types);
    const pagination = useAppSelector((state: RootState) => state.type.pagination);
    const loading = useAppSelector((state: RootState) => state.type.loading);
    const showSuccess = useAppSelector((state: RootState) => state.type.showSuccess);
    const showError = useAppSelector((state: RootState) => state.type.showError);
    const [value, setSearchValue] = useState('');
    const [bgDark, setBgDark] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCteate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState<IType | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTypes({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(types, page, rowsPerPage);
    const handleOpenModelCreate = () => {
        setOpenModalCreate(true);
    };
    const handleReset = () => {
        setSearchValue('');
        dispatch(getTypes({ page: 1, per_page: rowsPerPage, sort, include }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getTypes({ page, per_page: rowsPerPage, sort, include, name: value }));
    };

    // delete
    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setType(null);
    };

    const handleDelete = (type: IType) => {
        setType(type);
        setOpenModalDelete(true);
    };


    const handleConfirmDelete = () => {
        if (type && type?.id) {
            setBgDark(true);
            setSearchValue('');
            setOpenModalDelete(false);
            dispatch(deleteType(type?.id));
            dispatch(deleteTypeItem(type?.id))
        }
    };

    // create
    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        setName('');
    };

    const handleConfirmCreate = () => {
        setBgDark(true);
        dispatch(createType(name));
        dispatch(getTypes({ page, per_page: rowsPerPage, sort, include, name: value }));
        setName('');
    };

    const toggleBgDark = () => {
        setBgDark(true);
    }

    // update
    const handleUpdate = (type: IType) => {
        setType(type);
        setOpenModalUpdate(true);
        setName(type?.name);
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
        setName('');
    };

    const handleConfirmUpdate = () => {
        setBgDark(true);
        dispatch(updateType({ id: type?.id, name }));
        dispatch(changeTypeItem({ id: type?.id, name }));
        setName('');
    };

    return (
        <Box>
            <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0)' : undefined} />
            <Stack spacing={3}>
                <HeaderPage name="Kiểu truyện" onClick={handleOpenModelCreate} />
                <SearchName
                    title='Tên kiểu truyện'
                    value={value}
                    placeholder='name'
                    onSearchChange={setSearchValue}
                    onReset={handleReset}
                    onSubmit={handleSubmit}
                />
                <TypeList
                    toggleBgDark={toggleBgDark}
                    count={pagination.count}
                    page={pagination.currentPage}
                    types={types}
                    rowsPerPage={pagination.totalPages}
                    onDeleteItem={handleDelete}
                    onUpdateItem={handleUpdate}
                />
            </Stack>
            <AlertNotification showError={showError} showSuccess={showSuccess} onClose={onCloseToastType} />
            <ConfirmDeleteDialog
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                onConfirm={handleConfirmDelete}
                name={type ? type.name : ''}
                type='kiểu truyện'
            />
            <CreateItemDialog
                open={openModalCteate}
                onClose={handleCloseModalCreate}
                onConfirm={handleConfirmCreate}
                name='Kiểu truyện'
                inputValue={name}
                onInputChange={setName}
            />
            <UpdateItemDialog
                open={openModalUpdate}
                onClose={handleCloseModalUpdate}
                onConfirm={handleConfirmUpdate}
                name='Kiểu truyện'
                inputValue={name}
                onInputChange={setName}
            />

        </Box>
    );
}

function applyPagination(types: IType[], page: number, rowsPerPage: number): IType[] {
    return types.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
