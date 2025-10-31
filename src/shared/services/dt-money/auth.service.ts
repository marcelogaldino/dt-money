import { FormLoginParams } from "@/screens/Login/LoginForm";
import { RegisterFormParams } from "@/screens/Register/RegisterForm";
import { dtMoneyApi } from "@/shared/api/dt-money";
import { IAuthenticateResponse } from "@/shared/interfaces/http/authenticate-response.interface";

export const authenticate = async (
  userData: FormLoginParams
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData
  );

  return data;
};

export const registerUser = async (
  userData: RegisterFormParams
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/register",
    userData
  );
  return data;
};
