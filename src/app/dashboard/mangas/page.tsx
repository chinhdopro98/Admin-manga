"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { getMangas } from '@/redux/actions/manga';
import LoadingPopup from '@/components/core/loadding';
import { IAuthor, IGroup, IType, IUser } from '@/redux/interfaces/interfaces';
import MangaList from '@/components/dashboard/manga/manga-list';
import MangaFilters from '@/components/dashboard/manga/manga-filters';

export default function Page(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;
  const sort = '-created_at';
  const include = 'group,user,genres,artist,doujinshi';
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const mangas = useAppSelector((state: RootState) => state.manga.mangas);
  const pagination = useAppSelector((state: RootState) => state.manga.pagination);
  const [name, setName] = useState<string | ''>('');
  const [creator, setCreator] = useState<IUser | null>(null);
  const [type, setType] = useState<IType | null>(null);
  const [group, setGroup] = useState<IGroup | null>(null)
  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [approve, setApprove] = useState<string | ''>('');
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(getMangas({ page: value, per_page: rowsPerPage, sort, include }));
  };
  useEffect(() => {
    dispatch(getMangas({ page, per_page: rowsPerPage, sort, include }));
  }, [dispatch]);
  return (
    <Box>
      <LoadingPopup open={loading} />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5">Danh sách truyện</Typography>
          </Stack>
          <div>
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
              Tạo mới
            </Button>
          </div>
        </Stack>
        <MangaFilters
          name={name} setName={setName}
          creator={creator} setCreator={setCreator}
          type={type} setType={setType}
          group={group} setGroup={setGroup}
          author={author} setAuthor={setAuthor}
          approve={approve} setApprove={setApprove}
        />
        <MangaList mangas={mangas} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination count={Math.ceil((pagination.total / rowsPerPage))} page={page} size="small" onChange={handleChangePage} />
        </Box>
      </Stack>
    </Box>
  );
}
