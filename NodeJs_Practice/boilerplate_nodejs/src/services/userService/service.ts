import { UserProfile } from "./type";

export const getUserProfileData = (): UserProfile => {
  // Dummy data for now
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };
};
