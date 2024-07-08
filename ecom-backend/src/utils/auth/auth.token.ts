import jwt from "jsonwebtoken";

const generateToken = (userId: string, email: string, role: string): string => {
  const token: string = jwt.sign(
    { userId: userId, email: email, role: role },
    process.env.JWT_SECRET as string
  );
  return token;
};

export { generateToken };
