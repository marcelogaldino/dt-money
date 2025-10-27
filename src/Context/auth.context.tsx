import { FormLoginParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type AuthContextType = {
  user: null;
  token: null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleAuthenticate = async (params: FormLoginParams) => {};
  const handleRegister = async (params: RegisterFormParams) => {};
  const handleLogout = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
