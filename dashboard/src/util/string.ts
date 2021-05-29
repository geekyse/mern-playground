export const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


export const Summarize = (str: string, length: number) => {
  if (undefined == str) {
    return '';
  }
  if (str.length < length) {
    return str;
  }
  return str.substring(0, length) + '...';
};
