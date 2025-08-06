import { useState, useEffect } from "react";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  loading = "lazy",
  fallback = "/images/placeholder.png",
  width,
  height,
  priority = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Generate WebP version if available
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    
    // Check if it's already a modern format
    const modernFormats = ['.webp', '.avif'];
    if (modernFormats.some(format => originalSrc.includes(format))) {
      return originalSrc;
    }
    
    // Try WebP first, fallback to original
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpSrc;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    // If WebP fails, try original format
    if (currentSrc !== src && !hasError) {
      setCurrentSrc(src);
      return;
    }
    
    setIsLoading(false);
    setHasError(true);
  };

  useEffect(() => {
    setCurrentSrc(getOptimizedSrc(src));
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  // Calculate aspect ratio for responsive images
  const aspectRatio = width && height ? (height / width) * 100 : null;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { paddingBottom: `${aspectRatio}%` } : undefined}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      <img
        src={hasError ? fallback : currentSrc}
        alt={alt || "Bell & Barks - Pet adoption and care services"}
        loading={priority ? "eager" : loading}
        width={width || "auto"}
        height={height || "auto"}
        decoding={priority ? "sync" : "async"}
        fetchpriority={priority ? "high" : "auto"}
        className={`${aspectRatio ? 'absolute inset-0 w-full h-full object-cover' : ''} transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
