import { usersModel } from "@/models";
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
  const existingUser = await usersModel.findUserByEmail(email_id);

  if (existingUser) {
    throw new AppError('Email already registered', 409);
  }

  const data = {
    name,
    email_id
  }
  const user = await usersModel.create(data);

  // const user = await usersModel.createUser(name, email_id);
  return user;
};

export const findUserByEmailId = async (email: string) => {
  const userDetail = await usersModel.findAll();
  // const userDetail = await usersModel.findUserByEmail(email);

  return userDetail;
}