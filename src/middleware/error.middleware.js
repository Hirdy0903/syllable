export const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Prisma duplicate key error
  if (err.code === "P2002") {
    statusCode = 409;
    message = `Duplicate field value entered`;
  }

  // Prisma foreign key constraint error
  if (err.code === "P2003") {
    statusCode = 400;
    message = "Related record not found";
  }

  // Prisma validation error
  if (err.name === "PrismaClientValidationError") {
    statusCode = 400;
    message = "Invalid input data";
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    // show real error in development
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
      code: err.code,
      name: err.name,
    }),
  });
};