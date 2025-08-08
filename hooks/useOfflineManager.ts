import { useState, useEffect, useCallback } from 'react';
import type { DownloadStatus } from '../types';

const OFFLINE_STATUS_KEY = 'bible-offline-statuses';

const useOfflineManager = () => {
    const [statuses, setStatuses] = useState<Record<string, DownloadStatus>>(() => {
        try {
            const item = window.localStorage.getItem(OFFLINE_STATUS_KEY);
            return item ? JSON.parse(item) : {};
        } catch (error) {
            console.error('Error reading offline statuses from localStorage', error);
            return {};
        }
    });

    const [progress, setProgress] = useState<Record<string, number>>({});

    useEffect(() => {
        try {
            window.localStorage.setItem(OFFLINE_STATUS_KEY, JSON.stringify(statuses));
        } catch (error) {
            console.error('Error saving offline statuses to localStorage', error);
        }
    }, [statuses]);

    const downloadResource = useCallback((id: string) => {
        setStatuses(prev => ({ ...prev, [id]: 'downloading' }));
        setProgress(prev => ({ ...prev, [id]: 0 }));

        // Simulate download with a timer and progress updates
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = (prev[id] || 0) + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setStatuses(s => ({ ...s, [id]: 'downloaded' }));
                    return { ...prev, [id]: 100 };
                }
                return { ...prev, [id]: newProgress };
            });
        }, 200);
    }, []);

    const removeResource = useCallback((id: string) => {
        setStatuses(prev => ({ ...prev, [id]: 'not-downloaded' }));
        setProgress(prev => ({ ...prev, [id]: 0 }));
    }, []);

    return { statuses, progress, downloadResource, removeResource };
};

export default useOfflineManager;
