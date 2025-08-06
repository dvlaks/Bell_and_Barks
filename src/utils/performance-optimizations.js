// Performance utilities for Bell & Barks
import { lazy } from 'react';

// Lazy load components for code splitting
export const LazyPetCategoryPage = lazy(() => import('../pages/PetCategoryPage'));
export const LazyTestimonialSection = lazy(() => import('../sections/TestimonialSection'));
export const LazyFooterSection = lazy(() => import('../sections/FooterSection'));

// Image optimization utilities
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadCriticalImages = async () => {
  const criticalImages = [
    '/images/hero-img.png',
    '/images/hero-bg.png',
    '/images/logo.png'
  ];
  
  try {
    await Promise.all(criticalImages.map(preloadImage));
    console.log('Critical images preloaded');
  } catch (error) {
    console.warn('Failed to preload some critical images:', error);
  }
};

// Resource optimization
export const optimizeFont = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = '/fonts/ProximaNova-Regular.otf';
  fontLink.as = 'font';
  fontLink.type = 'font/otf';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
};

// Performance monitoring
export const performanceMonitor = {
  measureLCP: () => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({entryTypes: ['largest-contentful-paint']});
  },

  measureFID: () => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({entryTypes: ['first-input']});
  },

  measureCLS: () => {
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', clsValue);
        }
      });
    }).observe({entryTypes: ['layout-shift']});
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined') {
    performanceMonitor.measureLCP();
    performanceMonitor.measureFID();
    performanceMonitor.measureCLS();
    
    // Preload critical resources
    preloadCriticalImages();
    optimizeFont();
  }
};

// Image format detection and optimization
export const getOptimizedImageSrc = (src, format = 'webp') => {
  if (!src) return src;
  
  // Check browser support for modern formats
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };
  
  const supportsAVIF = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  };
  
  // Return optimized format if supported
  if (format === 'avif' && supportsAVIF()) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  } else if (format === 'webp' && supportsWebP()) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return src;
};

// Bundle size analyzer helper
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    const scripts = document.querySelectorAll('script[src]');
    let totalSize = 0;
    
    scripts.forEach(script => {
      fetch(script.src)
        .then(response => response.blob())
        .then(blob => {
          totalSize += blob.size;
          console.log(`Script ${script.src}: ${(blob.size / 1024).toFixed(2)}KB`);
          console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
        })
        .catch(console.error);
    });
  }
};

export default {
  LazyPetCategoryPage,
  LazyTestimonialSection,
  LazyFooterSection,
  preloadImage,
  preloadCriticalImages,
  optimizeFont,
  performanceMonitor,
  initPerformanceMonitoring,
  getOptimizedImageSrc,
  analyzeBundleSize
};
