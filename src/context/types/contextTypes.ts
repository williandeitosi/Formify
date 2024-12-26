export interface IUser {
  email?: string;
  token?: string;
}

export interface IContext extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  userRegister: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
}

export interface IAuthProvider {
  children: React.ReactNode;
}

export interface ApiResponse {
  result: {
    access_token: string;
    email: string;
  };
}
