import { useContext } from 'react';
import CredentialsContext from '../context/credentialsContext';

type UseCredentialsReturnType = [string | null, (credentials: string | null) => void];


export const useCredentials: () => UseCredentialsReturnType = () => {
  const context = useContext(CredentialsContext);
  return [context.credentials, context.setCredentials];
};

export const useGetCredentials = () => {
  const context = useContext(CredentialsContext);
  return context.credentials;
};

export const useSetCredentials = () => {
  const context = useContext(CredentialsContext);
  return context.setCredentials;
};