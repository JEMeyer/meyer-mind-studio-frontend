import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { credentialsState } from '../state/userState';
import { useMemo } from 'react';
import { Buffer } from 'buffer';

export const useApi = () => {
    const credentials = useRecoilValue(credentialsState);
    const apiKey = process.env.REACT_APP_BACKEND_API_KEY;

    const instance = useMemo(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_MEYER_MIND_BACKEND_URL,
            headers: {
                Authorization: apiKey ? `Basic ${Buffer.from(apiKey).toString('base64')}` : `Bearer ${credentials}`
            },
        });

        return axiosInstance;
    }, [credentials, apiKey]);

    return instance;
};