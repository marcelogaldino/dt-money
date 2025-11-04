import { FormLoginParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import { IAuthenticateResponse } from "@/shared/interfaces/http/authenticate-response.interface";
import { IUser } from "@/shared/interfaces/http/user.interface";
import * as authService from "@/shared/services/dt-money/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthenticate = async (userData: FormLoginParams) => {
    const { user, token } = await authService.authenticate(userData);

    console.log({ user, token });

    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );

    setUser(user);
    setToken(token);
  };

  const handleRegister = async (userData: RegisterFormParams) => {
    const { user, token } = await authService.registerUser(userData);

    await AsyncStorage.setItem(
      "dt-money-user",
      JSON.stringify({ user, token })
    );

    setUser(user);
    setToken(token);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setToken(null);
    setUser(null);
  };

  const restoreUserSession = async () => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse;
      setUser(user);
      setToken(token);
    }
    return userData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
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
