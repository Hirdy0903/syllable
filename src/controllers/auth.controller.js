import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUser } from "../services/auth.services.js";

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await registerUser({
    email,
    password,
  });

  res.status(201).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
    },
  });
});