import Image from "next/image";
import Link from "next/link";
import { getImageSize } from "../../config/imageSizes";

const Logo = ({ 
  variant = "SMALL", 
  className = "", 
  priority = false,
  href = "/" 
}) => {
  const dimensions = getImageSize('LOGO', variant);
  
  const logoConfig = {
    SMALL: {
      src: "/assets/images/logo.png",
      alt: "Solara Logo"
    },
    MEDIUM: {
      src: "/assets/images/logo.png", 
      alt: "Solara Logo"
    },
    LARGE: {
      src: "/assets/images/logo.png",
      alt: "Solara Logo"
    },
    MOBILE: {
      src: "/_next/image?url=%2Fassets%2Fimages%2Flogo.png&w=128&q=75",
      alt: "Solara Logo"
    }
  };

  const config = logoConfig[variant] || logoConfig.SMALL;

  return (
    <Link href={href} legacyBehavior>
      <a>
        <Image
          alt={config.alt}
          className={className}
          src={config.src}
          width={dimensions.width}
          height={dimensions.height}
          priority={priority}
        />
      </a>
    </Link>
  );
};

export default Logo; 