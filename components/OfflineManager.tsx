import React from 'react';
import { OFFLINE_RESOURCES } from '../constants';
import type { DownloadStatus } from '../types';

interface OfflineManagerProps {
    statuses: Record<string, DownloadStatus>;
    progress: Record<string, number>;
    downloadResource: (id: string) => void;
    removeResource: (id: string) => void;
}

const OfflineManager: React.FC<OfflineManagerProps> = ({ statuses, progress, downloadResource, removeResource }) => {

    const getStatusText = (status: DownloadStatus | undefined) => {
        switch (status) {
            case 'downloading':
                return 'Downloading...';
            case 'downloaded':
                return 'On your device';
            default:
                return 'Not downloaded';
        }
    }

    return (
        <div>
            <h3 className="text-lg font-medium text-primary mb-1">Manage Offline Content</h3>
            <p className="text-sm text-secondary mb-4">Download translations and commentaries to read them without an internet connection.</p>
            <ul className="space-y-4">
                {OFFLINE_RESOURCES.map(resource => {
                    const status = statuses[resource.id] || 'not-downloaded';
                    const currentProgress = progress[resource.id] || 0;

                    return (
                        <li key={resource.id} className="bg-tertiary p-4 rounded-lg flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-primary">{resource.name}</h4>
                                <p className="text-sm text-secondary">{resource.size} - {getStatusText(status)}</p>
                                {status === 'downloading' && (
                                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${currentProgress}%` }}></div>
                                    </div>
                                )}
                            </div>
                            <div>
                                {status === 'downloaded' ? (
                                    <button 
                                        onClick={() => removeResource(resource.id)}
                                        className="text-sm text-danger font-semibold px-3 py-1.5 rounded-md hover:bg-danger hover:text-white"
                                        aria-label={`Remove ${resource.name}`}
                                    >
                                        Remove
                                    </button>
                                ) : status === 'downloading' ? (
                                     <button 
                                        className="text-sm text-secondary font-semibold px-3 py-1.5 rounded-md"
                                        disabled
                                    >
                                        ...
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => downloadResource(resource.id)}
                                        className="text-sm text-white font-semibold bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700"
                                        aria-label={`Download ${resource.name}`}
                                    >
                                        Download
                                    </button>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default OfflineManager;
