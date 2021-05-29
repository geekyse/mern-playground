export const getCompanyLogo = (company, size = 150) => {
  if (!company.logoThumb) {
    return `https://via.placeholder.com/${size}`;
  }
  return `https://media.faaks.com/${company.logoThumb}`;

};

export const getUserPhoto = (user, size = 150) => {
  if (!user.photoThumb) {
    return `https://via.placeholder.com/${size}`;
  }
  return `https://media.faaks.com/${user.photoThumb}`;

};

export const isProduction = () => {
  return process.env.NODE_ENV == 'production';
};
