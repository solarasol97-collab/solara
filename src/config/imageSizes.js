// Standard image dimensions for the application
export const IMAGE_SIZES = {
  // Logo dimensions
  LOGO: {
    SMALL: { width: 30, height: 30 },
    MEDIUM: { width: 50, height: 50 },
    LARGE: { width: 80, height: 80 },
    MOBILE: { width: 150, height: 40 }
  },

  // Thumbnail dimensions
  THUMBNAIL: {
    SMALL: { width: 60, height: 60 },
    MEDIUM: { width: 100, height: 100 },
    LARGE: { width: 200, height: 200 }
  },

  // Card dimensions
  CARD: {
    SMALL: { width: 250, height: 150 },
    MEDIUM: { width: 300, height: 200 },
    LARGE: { width: 400, height: 250 }
  },

  // Hero/Banner dimensions
  HERO: {
    SMALL: { width: 600, height: 300 },
    MEDIUM: { width: 800, height: 400 },
    LARGE: { width: 1200, height: 600 }
  },

  // Icon dimensions
  ICON: {
    SMALL: { width: 16, height: 16 },
    MEDIUM: { width: 24, height: 24 },
    LARGE: { width: 32, height: 32 }
  },

  // Gallery dimensions
  GALLERY: {
    THUMBNAIL: { width: 300, height: 200 },
    FULL: { width: 800, height: 600 }
  },

  // Product dimensions
  PRODUCT: {
    THUMBNAIL: { width: 200, height: 200 },
    DETAIL: { width: 400, height: 400 }
  }
};

// Helper function to get image size
export const getImageSize = (category, size = 'MEDIUM') => {
  return IMAGE_SIZES[category]?.[size] || IMAGE_SIZES.THUMBNAIL.MEDIUM;
};

// Helper function for responsive images
export const getResponsiveImageProps = (src, alt, category, size = 'MEDIUM') => {
  const dimensions = getImageSize(category, size);
  return {
    src,
    alt,
    width: dimensions.width,
    height: dimensions.height
  };
}; 