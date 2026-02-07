export const verifyToken = (token) => {
  return token === process.env.VITE_AUTH_TOKEN;
};