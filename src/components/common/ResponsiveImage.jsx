import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt,
  variant = "default",
  className = "",
  priority = false,
  quality = 75,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
  ...props
}) => {
  // Predefined size variants
  const sizeVariants = {
    // Logo sizes
    logo: { width: 30, height: 30 },
    logoMobile: { width: 150, height: 40 },
    logoLarge: { width: 50, height: 50 },
    
    // Thumbnail sizes
    thumbnail: { width: 100, height: 100 },
    thumbnailSmall: { width: 60, height: 60 },
    thumbnailLarge: { width: 200, height: 200 },
    
    // Card sizes
    card: { width: 300, height: 200 },
    cardSmall: { width: 250, height: 150 },
    cardLarge: { width: 400, height: 250 },
    
    // Hero/Banner sizes
    hero: { width: 1200, height: 600 },
    banner: { width: 800, height: 400 },
    
    // Icon sizes
    icon: { width: 24, height: 24 },
    iconSmall: { width: 16, height: 16 },
    iconLarge: { width: 32, height: 32 },
    
    // Default responsive sizes
    default: { width: 300, height: 200 },
    responsive: { width: 0, height: 0, style: { width: '100%', height: 'auto' } }
  };

  const size = sizeVariants[variant] || sizeVariants.default;

  return (
    <Image
      src={src}
      alt={alt}
      width={size.width}
      height={size.height}
      className={className}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      style={size.style}
      {...props}
    />
  );
};

export default ResponsiveImage; 