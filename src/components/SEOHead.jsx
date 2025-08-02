import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEOHead = ({ 
  title = "Bell & Barks - Professional Pet Adoption Platform",
  description = "Find your perfect companion at Bell & Barks. Professional pet adoption platform connecting loving families with dogs, cats, birds, fish, rabbits, and reptiles.",
  keywords = "pet adoption, dogs, cats, birds, fish, rabbits, reptiles, animal rescue, pet care",
  image = "/images/logo.png",
  url
}) => {
  const location = useLocation();
  const currentUrl = url || `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement("meta");
        if (name.startsWith("og:") || name.startsWith("twitter:")) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic SEO tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:url", currentUrl);
    updateMetaTag("og:type", "website");
    updateMetaTag("og:site_name", "Bell & Barks");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Additional SEO tags
    updateMetaTag("robots", "index, follow");
    updateMetaTag("author", "Bell & Barks Team");
    updateMetaTag("viewport", "width=device-width, initial-scale=1");

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

  }, [title, description, keywords, image, currentUrl]);

  return null; // This component doesn't render anything
};

export default SEOHead;
