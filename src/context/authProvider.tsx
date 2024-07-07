import React, {
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext, User } from "./authContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    Cookies.remove("access_token");
    setUser(null);
    setIsLoading(false);
    navigate("/");
  }, [navigate]);

  const fetchUserDetails = useCallback(
    async (token: string) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_AUTHENTIK_URL}/application/o/userinfo/?access_token=${token}`
        );
        const data = await response.json();
        setUser({ email: data.email, role: data.role });
      } catch (error) {
        console.error("Failed to fetch user details", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    },
    [logout]
  );

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      fetchUserDetails(token);
    } else {
      setIsLoading(false);
    }
  }, [fetchUserDetails]);

  const login = useCallback(
    async (token: string) => {
      Cookies.set("access_token", token, { expires: 1 });
      await fetchUserDetails(token);
    },
    [fetchUserDetails]
  );

  const isAuthenticated = !!user;

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
      isLoading,
    }),
    [user, isAuthenticated, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };
