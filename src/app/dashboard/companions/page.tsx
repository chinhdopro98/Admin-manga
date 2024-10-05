"use client";
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { ICompanion } from '@/redux/interfaces/interfaces';
import { getCompanions } from '@/redux/actions/companion';
import { Box } from '@mui/material';
import LoadingPopup from '@/components/core/loadding';
import CompanionList from '@/components/dashboard/companion/companion-list';
import SearchName from '@/components/dashboard/core/search/search-name';
import HeaderPage from '@/components/dashboard/core/header/hearder';
import ConfirmDeleteDialog from '@/components/dashboard/core/dialog/delete';
import FormCompanionDialog from '@/components/dashboard/core/dialog/companion';
export default function Page(): React.JSX.Element {
    const page = 1;
    const rowsPerPage = 50;
    const sort = '-created_at';
    const include = 'user';
    const companions = useAppSelector((state: RootState) => state.companion.companions);
    const pagination = useAppSelector((state: RootState) => state.companion.pagination);
    const loading = useAppSelector((state: RootState) => state.companion.loading);
    const showSuccess = useAppSelector((state: RootState) => state.companion.showSuccess);
    const showError = useAppSelector((state: RootState) => state.companion.showError);
    const [value, setSearchValue] = useState('');
    const [bgDark, setBgDark] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [mode, setMode] = useState('add');
    const [image, setImage] = React.useState<File | null>(null);
    const [companion, setCompanion] = useState<ICompanion | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCompanions({ page, per_page: rowsPerPage, sort, include }));
    }, [dispatch]);
    const paginatedCustomers = applyPagination(companions, page, rowsPerPage);
    const handleOpenModelCreate = () => {
        setOpenModal(true);
        setMode('add');
    };
    const handleReset = () => {
        setSearchValue('');
        dispatch(getCompanions({ page: 1, per_page: rowsPerPage, sort, include }));
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getCompanions({ page, per_page: rowsPerPage, sort, include, name: value }));
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setCompanion(null);
    };

    const handleDelete = (companion: ICompanion) => {
        setCompanion(companion);
        setOpenModalDelete(true);
    };


    const handleConfirmDelete = () => {
        if (companion && companion?.id) {
            setBgDark(true);
            setSearchValue('');
            setOpenModalDelete(false);
            // dispatch(deleteGroup(group?.id));
            // dispatch(deleteGroupItem(group?.id))
        }
    };

    // create
    const handleCloseModalCreate = () => {
        setOpenModal(false);
        setPrice('');
        setName('');
        setImage(null);
    };

    const handleConfirmCreate = () => {
        setBgDark(true);
        // dispatch(createGroup(name));
        dispatch(getCompanions({ page, per_page: rowsPerPage, sort, include, name: value }));
        setName('');
    };

    const toggleBgDark = () => {
        setBgDark(true);
    }

    // update
    const handleUpdate = (companion: ICompanion) => {
        setMode('edit');
        setCompanion(companion);
        setOpenModal(true);
        setName(companion?.name);
        setPrice(companion?.price.toString());
    };

    const handleCloseModalUpdate = () => {
        setOpenModal(false);
        setName('');
    };

    const handleConfirmUpdate = () => {
        setBgDark(true);
        // dispatch(updateGroup({ id: group?.id, name }));
        // dispatch(changeGroupItem({ id: group?.id, name }));
        setName('');
    };
    return (
        <Box>
            <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0)' : undefined} />
            <Stack spacing={3}>
                <HeaderPage name="Bạn đồng hành" onClick={handleOpenModelCreate} />
                <SearchName
                    title='Tên bạn đồng hành'
                    value={value}
                    placeholder='name'
                    onSearchChange={setSearchValue}
                    onReset={handleReset}
                    onSubmit={handleSubmit}
                />
                <CompanionList
                    toggleBgDark={toggleBgDark}
                    count={pagination.count}
                    page={pagination.currentPage}
                    companions={companions}
                    rowsPerPage={pagination.totalPages}
                    onDeleteItem={handleDelete}
                    onUpdateItem={handleUpdate}
                />
            </Stack>
            <ConfirmDeleteDialog
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                onConfirm={handleConfirmDelete}
                name={companion ? companion.name : ''}
                type='Bạn đồng hành'
            />
            <FormCompanionDialog
                open={openModal}
                onClose={handleCloseModalCreate}
                onConfirm={mode === 'add' ? handleConfirmCreate : handleConfirmUpdate}
                name='Bạn đồng hành'
                inputName={name}
                onChangeName={setName}
                inputPrice={price}
                onChangePrice={setPrice}
                image={image}
                onChangeImage={setImage}
                mode='add'
                url={mode === 'edit' && companion?.image_full_url ? companion.image_full_url : ''}
            />
        </Box >
    );
}

function applyPagination(companions: ICompanion[], page: number, rowsPerPage: number): ICompanion[] {
    return companions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
