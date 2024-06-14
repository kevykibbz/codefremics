import { UserActionTypes } from "./actions";

export interface User {
  firstName: string;
  lastName: string;
  id: string;
  currency: string;
  remember_me?: boolean;
  isAuthenticated?: boolean;
}

export interface AuthState {
  access_token: string;
  refresh_token: string;
}

interface SetUserDataAction {
  type: UserActionTypes.SET_USER_DATA;
  payload: Partial<User>;
}
