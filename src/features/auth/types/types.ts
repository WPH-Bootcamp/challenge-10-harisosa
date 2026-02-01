export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};


export type RegisterPayload = {
  name: string;
  username?: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
};

export type AuthUserResponse = {
   id: number;
  name: string;
  email: string;
  headline: string;
  avatarUrl: string;
}