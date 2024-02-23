export interface IUserRepository {
  signUp: (email: string, password: string) => Promise<string>;
  signIn: (email: string, password: string) => Promise<string>;
}
