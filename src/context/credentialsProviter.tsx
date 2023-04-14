import React, { useState, useEffect, FC } from 'react';
import CredentialsContext from './credentialsContext';

interface CredentialsProviderProps {
  children: React.ReactNode;
}

const CredentialsProvider: FC<CredentialsProviderProps> = ({ children }) => {
  const [credentials, setCredentials] = useState<string | null>(() => {
    const storedCredentials = localStorage.getItem('credentials');
    return storedCredentials ? JSON.parse(storedCredentials) : null;
  });

  useEffect(() => {
    if (credentials) {
      localStorage.setItem('credentials', JSON.stringify(credentials));
    } else {
      localStorage.removeItem('credentials');
    }
  }, [credentials]);

  return (
    <CredentialsContext.Provider value={{ credentials, setCredentials }}>
      {children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsProvider;
