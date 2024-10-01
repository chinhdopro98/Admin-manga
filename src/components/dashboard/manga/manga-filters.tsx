import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import { MangaGroupForm } from '../core/form/manga-group';
import { MangaCreatorForm } from '../core/form/manga-creator';
import { MangaAuthorForm } from '../core/form/manga-author';
import { MangaTypeForm } from '../core/form/manga-type';
import { MangaTitleForm } from '../core/form/manga-title';
import { IAuthor, IGroup, IType, IUser } from '@/redux/interfaces/interfaces';
import { Box, Button, Grid, SelectChangeEvent } from '@mui/material';
import MangaApprovalForm from '../core/form/manga-approval';
import useDebounce from '@/hooks/use-hook-debound';

export interface MangaFilterProps {
  name: string | '';
  setName: (name: string) => void;
  creator?: IUser | null;
  setCreator?: (creator: IUser | null) => void;
  type?: IType | null;
  setType?: (type: IType | null) => void;
  group?: IGroup | null;
  setGroup?: (group: IGroup | null) => void;
  author?: IAuthor | null;
  setAuthor?: (author: IAuthor | null) => void;
  approve?: string | '';
  setApprove: (approve: string) => void;
  handleSubmit: () => void;
  handleReset: () => void;
}

const MangaFilters: React.FC<MangaFilterProps> = ({
  name, setName = () => { },
  creator, setCreator = () => { },
  type, setType = () => { },
  group, setGroup = () => { },
  author, setAuthor = () => { },
  approve, setApprove = () => { },
  handleSubmit = () => { },
  handleReset = () => { },
}) => {
  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} sx={{ mt: 2, padding: "5px 20px" }}>
          <MangaTitleForm name={name} onChange={setName} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ mt: 2, padding: "5px 20px" }}>
          <MangaGroupForm group={group} onChange={setGroup} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "5px 20px" }}>
          <MangaCreatorForm user={creator} onChange={setCreator} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "5px 20px" }}>
          <MangaAuthorForm user={author} onChange={setAuthor} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "5px 20px" }}>
          <MangaTypeForm type={type} onChange={setType} />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "5px 20px" }}>
          <MangaApprovalForm value={approve} onChange={setApprove} />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mr: 2, mt: 1 }}>
        <Button variant="outlined" onClick={handleReset}
          sx={{
            padding: '4px 10px',
            fontSize: '14px',
            minWidth: 'auto',
            borderRadius: "5px",
            mr: 1
          }}
        >Reset</Button>
        <Button variant="contained" onClick={handleSubmit}
          sx={{
            padding: '4px 10px',
            fontSize: '14px',
            minWidth: 'auto',
            borderRadius: "5px"
          }}
        >Tìm kiếm</Button>
      </Box>
    </Card>
  );
}

export default MangaFilters;