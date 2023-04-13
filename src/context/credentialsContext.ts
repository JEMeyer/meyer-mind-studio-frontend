import { createContext } from 'react';

interface CredentialsContextType {
  credentials: string | null;
  setCredentials: (credentials: string | null) => void;
}

const CredentialsContext = createContext<CredentialsContextType>({
  credentials: null,
  setCredentials: () => {},
});

export default CredentialsContext;
