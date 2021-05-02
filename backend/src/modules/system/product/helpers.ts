import slugify from 'slugify';

export const cleanProductUrl = (category, title, id) => {
  const sludgedTitle = slugify(title, '-');
  return category + '/' + sludgedTitle + '-' + id;
};
