import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";

export const getUserByEmail = async (email) => {
  return findUserByEmail(email);
};

export const registerUser = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  return createUser(userData);
};