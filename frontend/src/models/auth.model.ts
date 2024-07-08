import { User } from "./user.model";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
