import axios from "axios";
import { useMemo } from "react";
import { googleLogout } from "@react-oauth/google";
import { useCredentials } from "../hooks/useAuth";
import { useTabState } from "../hooks/useAppState";

export const useApi = (withAuth = true) => {
  const [credentials, setCredentials] = useCredentials();
  const { setTab } = useTabState();

  const instance = useMemo(() => {
    const authHeaders = { Authorization: `Bearer ${credentials}` };
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_MEYER_MIND_BACKEND_URL,
      headers: withAuth ? authHeaders : {},
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
          setTab(1);
          setCredentials(null);
        }

        // If you want to continue the error handling chain, reject the error
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }, [credentials, withAuth, setTab, setCredentials]);

  return instance;
};
