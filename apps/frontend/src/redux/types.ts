// user
export interface UserType {
  isJwtValid: boolean | false;
  email: string;
}
export interface StateUserType {
  loading: boolean;
  data: UserType;
  error: string;
}
