export const echo = (message) => {
  return console.log(message);
};
export const isProduction = () => {
  return process.env.NODE_ENV == 'production';
};
