import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { credentialsState } from '../state/userState';
import { useMemo } from 'react';
import { Buffer } from 'buffer';
import { googleLogout } from '@react-oauth/google';
import { tabState } from '../state/appState';

export const useApi = () => {
    const [credentials, setCredentials] = useRecoilState(credentialsState);
    const setActiveTab = useSetRecoilState(tabState);
    const apiKey = process.env.REACT_APP_BACKEND_API_KEY;

    const instance = useMemo(() => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_MEYER_MIND_BACKEND_URL,
            headers: {
                Authorization: apiKey ? `Basic ${Buffer.from(apiKey).toString('base64')}` : `Bearer ${credentials}`
            },
        });

        axiosInstance.interceptors.response.use(
            (response) => {
              // If the response is successful, just return it
              return response;
            },
            (error) => {
              // If the response status is 401, do something
              if (error.response && error.response.status === 401) {
                googleLogout();
                setActiveTab(1);
                setCredentials(null);
              }
          
              // If you want to continue the error handling chain, reject the error
              return Promise.reject(error);
            }
          );

        return axiosInstance;
    }, [credentials, apiKey, setActiveTab, setCredentials]);

    return instance;
};