import dynamic from 'next/dynamic';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface TypePilotProps {
    text?: string;
}

export const MangaPilotForm: React.FC<TypePilotProps> = ({ text }) => {
    const [value, setValue] = React.useState(text);
    React.useEffect(() => {
        setValue(text);
    }, [text]);
    return (
        <ReactQuill
            theme="snow"
            style={{ height: '20vh', maxHeight: '20vh' }}
            value={value}
            onChange={setValue}
        />
    );
};