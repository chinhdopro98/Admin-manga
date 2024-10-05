"use client";
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IGroup } from '@/redux/interfaces/interfaces';
import { createGroup, deleteGroup, getGroups, updateGroup } from '@/redux/actions/group';
import LoadingPopup from '@/components/core/loadding';
import { Box } from '@mui/material';
import ConfirmDeleteDialog from '@/components/dashboard/core/dialog/delete';
import CreateItemDialog from '@/components/dashboard/core/dialog/create';
import UpdateItemDialog from '@/components/dashboard/core/dialog/update';
import HeaderPage from '@/components/dashboard/core/header/hearder';
import AlertNotification from '@/components/core/toast';
import SearchName from '@/components/dashboard/core/search/search-name'
import GroupList from '@/components/dashboard/group/group-list';
import { changeGroupItem, deleteGroupItem, onCloseToastGroup } from '@/redux/reducers/group';

export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const groups = useAppSelector((state: RootState) => state.group.groups);
    const pagination = useAppSelector((state: RootState) => state.group.pagination);
    const loading = useAppSelector((state: RootState) => state.group.loading);
    const showSuccess = useAppSelector((state: RootState) => state.group.showSuccess);
    const showError = useAppSelector((state: RootState) => state.group.showError);
    const [value, setSearchValue] = useState('');
    const [bgDark, setBgDark] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCteate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [name, setName] = useState('');
    const [group, setGroup] = useState<IGroup | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getGroups({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(groups, page, rowsPerPage);
    const handleOpenModelCreate = () => {
        setOpenModalCreate(true);
    };
    const handleReset = () => {
        setSearchValue('');
        dispatch(getGroups({ page: 1, per_page: rowsPerPage, sort, include }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getGroups({ page, per_page: rowsPerPage, sort, include, name: value }));
    };

    // delete
    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setGroup(null);
    };

    const handleDelete = (group: IGroup) => {
        setGroup(group);
        setOpenModalDelete(true);
    };


    const handleConfirmDelete = () => {
        if (group && group?.id) {
            setBgDark(true);
            setSearchValue('');
            setOpenModalDelete(false);
            dispatch(deleteGroup(group?.id));
            dispatch(deleteGroupItem(group?.id))
        }
    };

    // create
    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        setName('');
    };

    const handleConfirmCreate = () => {
        setBgDark(true);
        dispatch(createGroup(name));
        dispatch(getGroups({ page, per_page: rowsPerPage, sort, include, name: value }));
        setName('');
    };

    const toggleBgDark = () => {
        setBgDark(true);
    }

    // update
    const handleUpdate = (group: IGroup) => {
        setGroup(group);
        setOpenModalUpdate(true);
        setName(group?.name);
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
        setName('');
    };

    const handleConfirmUpdate = () => {
        setBgDark(true);
        dispatch(updateGroup({ id: group?.id, name }));
        dispatch(changeGroupItem({ id: group?.id, name }));
        setName('');
    };

    return (
        <Box>
            <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0)' : undefined} />
            <Stack spacing={3}>
                <HeaderPage name="Nhóm dịch" onClick={handleOpenModelCreate} />
                <SearchName
                    title='Tên nhóm'
                    value={value}
                    placeholder='name'
                    onSearchChange={setSearchValue}
                    onReset={handleReset}
                    onSubmit={handleSubmit}
                />
                <GroupList
                    toggleBgDark={toggleBgDark}
                    count={pagination.count}
                    page={pagination.currentPage}
                    groups={groups}
                    rowsPerPage={pagination.totalPages}
                    onDeleteItem={handleDelete}
                    onUpdateItem={handleUpdate}
                />
            </Stack>
            <AlertNotification showError={showError} showSuccess={showSuccess} onClose={onCloseToastGroup} />
            <ConfirmDeleteDialog
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                onConfirm={handleConfirmDelete}
                name={group ? group.name : ''}
                type='nhóm dịch'
            />
            <CreateItemDialog
                open={openModalCteate}
                onClose={handleCloseModalCreate}
                onConfirm={handleConfirmCreate}
                name='Nhóm dịch'
                inputValue={name}
                onInputChange={setName}
            />
            <UpdateItemDialog
                open={openModalUpdate}
                onClose={handleCloseModalUpdate}
                onConfirm={handleConfirmUpdate}
                name='Nhóm dịch'
                inputValue={name}
                onInputChange={setName}
            />

        </Box>
    );
}

function applyPagination(types: IGroup[], page: number, rowsPerPage: number): IGroup[] {
    return types.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
