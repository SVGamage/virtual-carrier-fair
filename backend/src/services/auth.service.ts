import { UserSignUpData } from "../utils/auth.types";
import * as authRepositories from "../repositories/auth.repository";

export const signUp = async (userData: UserSignUpData) => {
  return await authRepositories.signUp(userData);
};
