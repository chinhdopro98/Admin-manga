import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
