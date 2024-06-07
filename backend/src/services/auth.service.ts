import { getUserFilter, UserSignUpData } from "../utils/auth.types";
import * as authRepositories from "../repositories/auth.repository";

export const signUp = async (userData: UserSignUpData) => {
  return await authRepositories.signUp(userData);
};
export const getUser = async (filter: getUserFilter) => {
  return await authRepositories.getUser(filter);
};

export const updateTempOTP = async (email: string, tempOTP: number | null) => {
  return await authRepositories.updateTempOTP(email, tempOTP);
};
