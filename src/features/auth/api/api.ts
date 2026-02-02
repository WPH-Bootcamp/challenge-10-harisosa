import { api } from "@/lib/api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  AuthUserResponse,
} from "@/features/auth/types";

export const login = async (payload: LoginPayload) => {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
};

export const register = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>(
    "/auth/register",
    payload
  );

  return data;
};

export const getAuthUser = async (): Promise<AuthUserResponse> => {
  const { data } = await api.get<AuthUserResponse>("/users/me");
  return data;
};
