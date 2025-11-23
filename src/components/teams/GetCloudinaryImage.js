export const CLOUD_NAME = 'dwpdekzdb';

export const getCloudinaryImage = (publicId, options = {}) => {
  const {
    width = 500,
    height = 500,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'face',
    effects = []
  } = options;

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    `q_${quality}`,
    `f_${format}`,
    ...effects
  ].join(',');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
};
