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
  onDelete: () => void;
}

export function MangaCard({ manga, onDelete }: MangaCardProps): React.JSX.Element {
  const typographySx: SxProps<Theme> = {
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'justify',
    fontSize: "12px"
  };

  const typographyName: SxProps<Theme> = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    fontSize: "18px",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'justify',
    lineHeight: "1.3"
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flex: '1 1 auto', padding: '15px 18px' }}>
        <Stack spacing={2}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{
              width: "150px", flexShrink: 0, position: "relative",
              '&:hover .delete-button': { visibility: 'visible', opacity: 1 }
            }}>
              <img src={manga.cover_full_url} style={{ width: "100%", height: "200px" }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '200px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  '&:hover': { opacity: 1 },
                  '&:hover + .delete-button': { visibility: 'visible', opacity: 1 }
                }}
              />
              <Button
                variant="contained"
                onClick={onDelete}
                className="delete-button"
                sx={{
                  position: "absolute",
                  bottom: 1,
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  '& span': { mb: 0, mt: 0, lineHeight: "normal" },
                  borderRadius: "3px",
                  minWidth: 21,
                  padding: "5px 10px !important",
                  visibility: 'hidden',
                  opacity: 0,
                  transition: 'visibility 0s, opacity 0.2s linear',
                }}
              >
                <Tooltip title="Xóa" sx={{ mt: "1px" }}>
                  <span>
                    <Trash fontSize="var(--icon-fontSize-md)" />
                  </span>
                </Tooltip>
              </Button>
            </Box>
            <Stack spacing={1} sx={{ flex: 1, ml: 2 }}>
              <Typography align="center" variant="h6" sx={typographyName}>
                <Link href={paths.dashboard.mangaDetail(manga?.id as string)} style={{ textDecoration: "none" }}>
                  {manga.name}
                </Link>
              </Typography>
              <Box>
                {
                  manga?.genres?.map((genre) => (
                    <Chip key={genre?.id} label={genre.name} sx={{ background: '#2e95ea;', fontSize: '8px', height: '20px', lineHeight: '20px', mr: "5px", fontWeight: "bold" }} />
                  ))
                }
              </Box>
              <Typography align="center" variant="body1" sx={{ ...typographySx, mb: 0, '& p': { mb: 0, mt: 0 } }}>
                <Box component="span" dangerouslySetInnerHTML={{ __html: manga.pilot as string }} sx={{ mb: 0 }} />
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
      <Divider />
    </Card>
  );
}