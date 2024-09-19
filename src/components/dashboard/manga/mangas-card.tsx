import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IManga } from '@/redux/interfaces/interfaces';
import { SxProps, Theme } from '@mui/material/styles';
import { Button, Chip, Tooltip } from '@mui/material';
import { paths } from '@/paths';
import Link from 'next/link';
import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';

export interface MangaCardProps {
  manga: IManga;
}

export function MangaCard({ manga }: MangaCardProps): React.JSX.Element {
  const typographySx: SxProps<Theme> = {
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'justify',
  };

  const typographyName: SxProps<Theme> = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: "23px",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'justify'
  };
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
      <CardContent sx={{ flex: '1 1 auto', padding: '20px 24px' }}>
        <Stack spacing={2}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "180px", flexShrink: 0, position: "relative" }}>
              <img src={manga.cover_full_url} style={{ width: "100%", height: "220px" }} />
              <Button
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: 1,
                  left: "50%",
                  right: "50%",
                  transform: "translate(-50%,-50%)",
                  '& span': { mb: 0, mt: 0, lineHeight: "normal" },
                  borderRadius: 1,
                  minWidth: 22,
                }}
              >
                <Tooltip title="Xóa">
                  <span>
                    <Trash fontSize="var(--icon-fontSize-md)" />
                  </span>
                </Tooltip>
              </Button>
            </Box>
            <Stack spacing={1} sx={{ flex: 1, ml: 2 }}>
              <Typography align="center" variant="h5" sx={typographyName}>
                <Link href={paths.dashboard.mangaDetail(manga.id)}>
                  {manga.name}
                </Link>
              </Typography>
              <Box>
                {
                  manga?.genres?.map((genre) => (
                    <Chip key={genre?.id} label={genre.name} sx={{ background: '#2e95ea;', fontSize: '10px', height: '25px', lineHeight: '25px', mr: "5px", fontWeight: "bold" }} />
                  ))
                }
              </Box>
              <Typography align="center" variant="body1" sx={{ ...typographySx, mb: 0, '& p': { mb: 0, mt: 0 } }}>
                <Box component="span" dangerouslySetInnerHTML={{ __html: manga.pilot }} sx={{ mb: 0 }} />
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}
