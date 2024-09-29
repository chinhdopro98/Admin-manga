import React, { useEffect, useState, memo } from 'react';
import { Alert } from '@mui/material';
import { useAppDispatch } from '@/hooks/use-hook-redux';

interface NotificationProps {
    showSuccess?: boolean;
    showError?: boolean;
    onClose: () => { type: string };
}

const AlertNotification: React.FC<NotificationProps> = memo(({ showSuccess, showError, onClose }) => {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(showSuccess || showError);
    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (showSuccess || showError) {
            setVisible(true);
            timer = setTimeout(() => {
                dispatch(onClose());
                setVisible(false);
            }, 2000);
        } else {
            setVisible(false);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [dispatch, showSuccess, showError, onClose]);

    return (
        <div>
            {visible && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }}>
                    {showSuccess && (
                        <Alert variant="filled" severity="success">
                            Your form has been submitted successfully!
                        </Alert>
                    )}
                    {showError && (
                        <Alert variant="filled" severity="error">
                            An error occurred. Please try again!
                        </Alert>
                    )}
                </div>
            )}
        </div>
    );
});

export default AlertNotification;