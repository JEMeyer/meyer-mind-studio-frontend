import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { credentialsState } from '../state/userState';
import { useMemo } from 'react';

export const useApi = () => {
    const credentials = useRecoilValue(credentialsState);

    const instance = useMemo(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_MEYER_MIND_BACKEND_URL,
            headers: {
                Authorization: `Bearer ${credentials}`
            },
        });

        return axiosInstance;
    }, [credentials]);

    return instance;
};