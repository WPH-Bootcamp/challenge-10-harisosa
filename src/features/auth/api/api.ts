import { api } from "@/lib/api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
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
