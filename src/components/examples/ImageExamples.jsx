import Image from "next/image";
import ResponsiveImage from "../common/ResponsiveImage";
import Logo from "../common/Logo";
import { getImageSize, getResponsiveImageProps } from "../../config/imageSizes";

const ImageExamples = () => {
  return (
    <div className="image-examples">
      <h2>Different Ways to Handle Image Dimensions in Next.js</h2>
      
      {/* Method 1: Direct Next.js Image with hardcoded dimensions */}
      <section>
        <h3>1. Direct Next.js Image Component</h3>
        <Image
          src="/assets/images/logo.png"
          alt="Direct Image"
          width={30}
          height={30}
          className="img-fluid"
        />
      </section>

      {/* Method 2: Using our Logo component with variants */}
      <section>
        <h3>2. Reusable Logo Component</h3>
        <div>
          <Logo variant="SMALL" className="me-3" />
          <Logo variant="MEDIUM" className="me-3" />
          <Logo variant="LARGE" className="me-3" />
          <Logo variant="MOBILE" />
        </div>
      </section>

      {/* Method 3: Using ResponsiveImage component with variants */}
      <section>
        <h3>3. ResponsiveImage Component with Variants</h3>
        <div>
          <ResponsiveImage
            src="/assets/images/bg/gallery-1.png"
            alt="Gallery Image"
            variant="thumbnail"
            className="me-3"
          />
          <ResponsiveImage
            src="/assets/images/bg/gallery-2.png"
            alt="Gallery Image"
            variant="card"
            className="me-3"
          />
          <ResponsiveImage
            src="/assets/images/bg/gallery-3.png"
            alt="Gallery Image"
            variant="hero"
            className="me-3"
          />
        </div>
      </section>

      {/* Method 4: Using configuration helpers */}
      <section>
        <h3>4. Using Configuration Helpers</h3>
        <div>
          {(() => {
            const logoProps = getResponsiveImageProps(
              "/assets/images/logo.png",
              "Logo using config",
              "LOGO",
              "MEDIUM"
            );
            return (
              <Image
                {...logoProps}
                className="img-fluid me-3"
              />
            );
          })()}
          
          {(() => {
            const thumbnailProps = getResponsiveImageProps(
              "/assets/images/bg/gallery-1.png",
              "Thumbnail using config",
              "THUMBNAIL",
              "LARGE"
            );
            return (
              <Image
                {...thumbnailProps}
                className="img-fluid"
              />
            );
          })()}
        </div>
      </section>

      {/* Method 5: Responsive images with fill */}
      <section>
        <h3>5. Responsive Images with Fill</h3>
        <div style={{ position: 'relative', width: '300px', height: '200px' }}>
          <Image
            src="/assets/images/bg/gallery-1.png"
            alt="Responsive Fill Image"
            fill
            style={{ objectFit: 'cover' }}
            className="img-fluid"
          />
        </div>
      </section>

      {/* Method 6: Using sizes prop for responsive images */}
      <section>
        <h3>6. Responsive Images with Sizes</h3>
        <Image
          src="/assets/images/bg/gallery-1.png"
          alt="Responsive with sizes"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="img-fluid"
        />
      </section>
    </div>
  );
};

export default ImageExamples; 