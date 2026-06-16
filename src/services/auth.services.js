import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async ({ email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    email,
    password: hashedPassword,
  });

  return user;
};
export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user.id);

  return {
    user,
    token,
  };
};