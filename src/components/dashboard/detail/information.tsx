import React, { useCallback, memo, useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ICategory, IManga, IType } from '@/redux/interfaces/interfaces';
import { MangaPilotForm } from '../core/form/manga-pilot';
import { MangaNameForm } from '../core/form/manga-name';
import { MangaSubNameForm } from '../core/form/manga-subname';
import { MangaTypeForm } from '../core/form/manga-type';
import { MangaCategoryForm } from '../core/form/manga-category';
import { MangaActionForm } from '../core/form/manga-action';
import useDebounce from '@/hooks/use-hook-debound';

interface MangaDetailProps {
    manga?: IManga | null;
    onChange: (field: string, value: any) => void;
}

export const InformationDetail: React.FC<MangaDetailProps> = memo(({ manga, onChange }) => {
    const [name, setName] = React.useState<string>(manga?.name || '');
    const [nameAlt, setNameAlt] = React.useState<string>(manga?.name_alt || '');
    const [type, setType] = React.useState<IType | null>(null);
    const [finishedBy, setFinishedBy] = React.useState<string>(manga?.finished_by || '');
    const [genres, setGenres] = React.useState<ICategory[] | null>(manga?.genres || []);
    const [pilot, setPilot] = React.useState<string>(manga?.pilot || '');
    const [isSearchMode, setIsSearchMode] = useState<boolean>(true);
    const handleInputChange = () => {
        setIsSearchMode(false);
    };
    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);
    const handleNameAltChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setNameAlt(e.target.value), []);
    const handlePilotChange = useCallback((value: string) => setPilot(value), []);
    const handleFinishedByChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFinishedBy(e.target.value), []);
    const handleGenresChange = useCallback((updatedGenres: any) => {
        setGenres(updatedGenres);
        onChange('genres', updatedGenres)
    }, []);

    const debouncedName = useDebounce(name);
    const debouncedNameAlt = useDebounce(nameAlt);
    const debouncedPilot = useDebounce(pilot);
    const debouncedActionChange = useDebounce(finishedBy);

    useEffect(() => {
        if (debouncedName !== manga?.name) onChange('name', debouncedName);
    }, [debouncedName]);

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
    }, [manga]);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Thông tin chi tiết</Typography>
                <MangaNameForm sx={{ marginBottom: 2 }} name={name} onChange={handleNameChange} />
                <MangaSubNameForm sx={{ marginBottom: 2 }} name={nameAlt} onChange={handleNameAltChange} />
                <MangaTypeForm type={type} onChange={setType} placeholder="" isSearchMode={isSearchMode} onInputChange={handleInputChange} />
                <MangaActionForm sx={{ marginBottom: 2 }} text={finishedBy} onChange={handleFinishedByChange} />
                <MangaCategoryForm sx={{ marginBottom: 1 }} props={genres} onChange={handleGenresChange} />
                <MangaPilotForm sx={{ marginBottom: 5 }} text={pilot} onChange={handlePilotChange} />
            </CardContent>
        </Card>
    )

});