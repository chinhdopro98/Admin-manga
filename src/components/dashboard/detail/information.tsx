import React, { useCallback, memo, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { ICategory, IManga, IType } from '@/redux/interfaces/interfaces';
import { MangaPilotForm } from '../core/form/manga-pilot';
import { MangaNameForm } from '../core/form/manga-name';
import { MangaSubNameForm } from '../core/form/manga-subname';
import { MangaTypeForm } from '../core/form/manga-type';
import { MangaCategoryForm } from '../core/form/manga-category';
import { MangaActionForm } from '../core/form/manga-action';
import useDebounce from '@/hooks/use-hook-debound';
import { MangaHotForm } from '../core/form/manga-hot';

interface MangaDetailProps {
    manga?: IManga | null;
    onChange: (field: string, value: any) => void;
}

export const InformationDetail: React.FC<MangaDetailProps> = memo(({ manga, onChange }) => {
    const [name, setName] = useState<string>(manga?.name || '');
    const [nameAlt, setNameAlt] = useState<string>(manga?.name_alt || '');
    const [type, setType] = useState<IType | null>(manga?.doujinshi || null);
    const [finishedBy, setFinishedBy] = useState<string>(manga?.finished_by || '');
    const [genres, setGenres] = useState<ICategory[] | null>(manga?.genres || []);
    const [pilot, setPilot] = useState<string>(manga?.pilot || '');
    const [is_hot, setIsHot] = useState<boolean>(manga?.is_hot || false);
    const [isSearchMode, setIsSearchMode] = useState<boolean>(true);
    const handleInputChange = () => {
        setIsSearchMode(false);
    };
    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (e.target.value !== manga?.name) onChange('name', e.target.value);
    }, []);
    const handleNameAltChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setNameAlt(e.target.value), []);
    const handlePilotChange = useCallback((value: string) => setPilot(value), []);
    const handleFinishedByChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFinishedBy(e.target.value), []);
    const handleGenresChange = useCallback((updatedGenres: any) => {
        setGenres(updatedGenres);
        onChange('genres', updatedGenres)
    }, []);

    const handleTypeChange = (newType: IType | null) => {
        setType(newType);
        onChange('doujinshi_id', newType?.id);
        onChange('doujinshi', newType);
    };

    const handleHotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsHot(event.target.checked);
        onChange('is_hot', event.target.checked)
    };

    const debouncedNameAlt = useDebounce(nameAlt);
    const debouncedPilot = useDebounce(pilot);
    const debouncedActionChange = useDebounce(finishedBy);

    useEffect(() => {
        if (debouncedNameAlt !== manga?.name_alt) onChange('name_alt', debouncedNameAlt);
    }, [debouncedNameAlt]);

    useEffect(() => {
        if (debouncedPilot !== manga?.pilot) onChange('pilot', debouncedPilot);
    }, [debouncedPilot]);

    useEffect(() => {
        if (debouncedActionChange !== manga?.finished_by) onChange('finished_by', debouncedActionChange);
    }, [debouncedActionChange]);

    useEffect(() => {
        setName(manga?.name || '');
        setNameAlt(manga?.name_alt || '');
        setType(manga?.doujinshi || null);
        setFinishedBy(manga?.finished_by || '');
        setGenres(manga?.genres || []);
        setPilot(manga?.pilot || '');
        setIsHot(manga?.is_hot || false);
    }, [manga]);

    return (
        <Card>
            <CardContent>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, borderBottom: '1px solid #ccc',
                    pb: 2
                }}>
                    <Typography variant="h6" sx={{ fontSize: "17px" }}>Thông tin chi tiết</Typography>
                    <MangaHotForm is_hot={is_hot} onChange={handleHotChange} sx={{ flexShrink: 0, display: "flex" }} />
                </Box>
                <MangaNameForm sx={{ marginBottom: 2 }} name={name} onChange={handleNameChange} />
                <MangaSubNameForm sx={{ marginBottom: 2 }} name={nameAlt} onChange={handleNameAltChange} />
                <MangaTypeForm sx={{ marginBottom: 2 }} type={type} onChange={handleTypeChange} placeholder="" isSearchMode={isSearchMode} onInputChange={handleInputChange} />
                <MangaActionForm sx={{ marginBottom: 2 }} text={finishedBy} onChange={handleFinishedByChange} />
                <MangaCategoryForm sx={{ marginBottom: 1 }} props={genres} onChange={handleGenresChange} />
                <MangaPilotForm sx={{ marginBottom: 4 }} text={pilot} onChange={handlePilotChange} />
            </CardContent >
        </Card >
    )

});