import {
  findUserByEmail,
  
} from "../repositories/user.repository.js";
import { findUserById } from "../repositories/user.repository.js";

export const getUserByEmail = async (email) => {
  return findUserByEmail(email);
};
export const getCurrentUser = async (userId) => {
  return findUserById(userId);
};
