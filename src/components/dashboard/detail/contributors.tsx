"use client";

import React, { useEffect, useState, memo } from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import { IAuthor, IManga, IGroup, IUser } from '@/redux/interfaces/interfaces';
import { MangaAuthorForm } from '../core/form/manga-author';
import { MangaGroupForm } from '../core/form/manga-group';
import { MangaStatusForm } from '../core/form/manga-status';
import { MangaCreatorForm } from '../core/form/manga-creator';

interface MangaDetailProps {
    manga?: IManga | null;
    onChange: (field: string, value: any) => void;
}

const Contributors: React.FC<MangaDetailProps> = ({ manga, onChange }) => {
    const [author, setAuthor] = useState<IAuthor | null>(manga?.artist || null);
    const [group, setGroup] = useState<IGroup | null>(manga?.group || null);
    const [creator, setCreator] = useState<IUser | null>(manga?.user || null);
    const [status, setStatus] = useState<number | null>(manga?.status || null);
    const [isSearchAuthor, setIsSearchAuthor] = useState<boolean>(true);
    const [isSearchGroup, setIsSearchGroup] = useState<boolean>(true);
    const [isSearchCreator, setIsSearchCreator] = useState<boolean>(true);

    const handleAuthorChange = (newAuthor: IAuthor | null) => {
        setAuthor(newAuthor);
        onChange('artist_id', newAuthor?.id);
        onChange('artist', newAuthor);
    };

    const handleGroupChange = (newGroup: IGroup | null) => {
        setGroup(newGroup);
        onChange('group_id', newGroup?.id);
        onChange('group', newGroup);
    };

    const handleCreatorChange = (newCreator: IUser | null) => {
        setCreator(newCreator);
        onChange('user_id', newCreator?.id);
        onChange('user', newCreator)
    };

    const handleStatusChange = (newStatus: number | null) => {
        setStatus(newStatus);
        onChange('status', newStatus)
    };

    const handleAuthorInputChange = () => {
        setIsSearchAuthor(false);
    };

    const handleGroupInputChange = () => {
        setIsSearchGroup(false);
    };

    const handleCreatorInputChange = () => {
        setIsSearchCreator(false);
    };
    useEffect(() => {
        setAuthor(manga?.artist || null);
        setGroup(manga?.group || null);
        setCreator(manga?.user || null);
        setStatus(manga?.status || null);
    }, [manga]);
    return (
        <Card sx={{ mt: "30px" }}>
            <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Thông tin khác</Typography>
                <Box>
                    <MangaStatusForm
                        sx={{ marginBottom: 2 }}
                        status={status}
                        onChange={handleStatusChange}
                    />

                    <MangaAuthorForm
                        sx={{ marginBottom: 2 }}
                        user={author}
                        onChange={handleAuthorChange}
                        isSearchMode={isSearchAuthor}
                        onInputChange={handleAuthorInputChange}
                    />

                    <MangaGroupForm
                        sx={{ marginBottom: 2 }}
                        group={group}
                        onChange={handleGroupChange}
                        isSearchMode={isSearchGroup}
                        onInputChange={handleGroupInputChange}
                    />
                    <MangaCreatorForm
                        sx={{ marginBottom: 2 }}
                        user={creator}
                        onChange={handleCreatorChange}
                        isSearchMode={isSearchCreator}
                        onInputChange={handleCreatorInputChange}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default Contributors;