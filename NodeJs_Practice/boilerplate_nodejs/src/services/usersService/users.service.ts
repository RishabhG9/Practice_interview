import { UsersModel } from "@/models";
import { UserProfile } from "./type";
import { AppError } from "@/utils/appError";

export const getUserProfileData = (): UserProfile => {
  // Dummy data for now
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };
};


export const registerUser = async (name: string, email_id: string) => {
  const existingUser = await UsersModel.findUserByEmail(email_id);

  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }

  const user = await UsersModel.createUser(name, email_id);
  return user;
};

export const findUserByEmailId = async (email: string) => {
  const userDetail = await UsersModel.findUserByEmail(email);

  return userDetail;
}