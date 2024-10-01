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
import { deleteManga, getMangas } from '@/redux/actions/manga';
import LoadingPopup from '@/components/core/loadding';
import { IAuthor, IGroup, IType, IUser } from '@/redux/interfaces/interfaces';
import MangaList from '@/components/dashboard/manga/manga-list';
import MangaFilters from '@/components/dashboard/manga/manga-filters';
import { deleteSlotManga } from '@/redux/reducers/manga';

export default function Page(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;
  const sort = '-created_at';
  const include = 'group,user,genres,artist,doujinshi';
  const [bgDark, setBgDark] = React.useState(false);
  const loading = useAppSelector((state: RootState) => state.manga.loading);
  const mangas = useAppSelector((state: RootState) => state.manga.mangas);
  const pagination = useAppSelector((state: RootState) => state.manga.pagination);
  const [name, setName] = useState<string | ''>('');
  const [creator, setCreator] = useState<IUser | null>(null);
  const [type, setType] = useState<IType | null>(null);
  const [group, setGroup] = useState<IGroup | null>(null)
  const [author, setAuthor] = useState<IAuthor | null>(null);
  const [approve, setApprove] = useState<string | ''>('0');
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(getMangas({ page: value, per_page: rowsPerPage, sort, include }));
  };
  useEffect(() => {
    dispatch(getMangas({ page, per_page: rowsPerPage, sort, include }));
  }, [dispatch]);

  const handleSearchSubmit = () => {
    setBgDark(true);
    const search = name;
    const group_id = group ? group.id : undefined;
    const artist_id = author ? author.id : undefined;
    const user_id = creator ? creator.id : undefined;
    const doujinshi_id = type ? type.id : undefined;
    const is_reviewed = approve;
    setPage(1);
    dispatch(getMangas({
      page: 1,
      per_page: rowsPerPage,
      sort,
      include,
      data: {
        search,
        group_id,
        artist_id,
        user_id,
        doujinshi_id,
        is_reviewed,
      }
    }));
  };

  const handleSearchReset = () => {
    setBgDark(true);
    setName('');
    setCreator(null);
    setType(null);
    setGroup(null);
    setAuthor(null);
    setApprove('0');
    setPage(1);
    dispatch(getMangas({
      page: 1,
      per_page: rowsPerPage,
      sort,
      include
    }));
  };

  const handleDelete = (id: string) => {
    setBgDark(true);
    dispatch(deleteSlotManga(id))
    dispatch(deleteManga(id));
  };

  return (
    <Box>
      <LoadingPopup open={loading} bgDark={bgDark ? 'rgba(0, 0, 0, 0.1)' : undefined} />
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h5" sx={{ fontSize: "20px" }}>Danh sách truyện</Typography>
          </Stack>
          <div>
            <Button
              startIcon={<PlusIcon style={{ fontSize: '16px' }} />}
              variant="contained"
              sx={{
                padding: '4px 10px',
                fontSize: '14px',
                minWidth: 'auto',
                borderRadius: "5px"
              }}
            >
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
          handleSubmit={handleSearchSubmit}
          handleReset={handleSearchReset}
        />
        <MangaList mangas={mangas} onDelete={handleDelete} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination count={Math.ceil((pagination.total / rowsPerPage))} page={page} size="small" onChange={handleChangePage} />
        </Box>
      </Stack>
    </Box>
  );
}
