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
  if (typeof document !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = '/fonts/ProximaNova-Regular.otf';
    fontLink.as = 'font';
    fontLink.type = 'font/otf';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
  }
};

// Performance monitoring
export const performanceMonitor = {
  measureLCP: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP monitoring not supported');
      }
    }
  },
  
  measureFID: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID monitoring not supported');
      }
    }
  },
  
  measureCLS: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS monitoring not supported');
      }
    }
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined') {
    try {
      performanceMonitor.measureLCP();
      performanceMonitor.measureFID();
      performanceMonitor.measureCLS();
      
      // Preload critical resources
      preloadCriticalImages();
      optimizeFont();
      
      console.log('Performance monitoring initialized');
    } catch (error) {
      console.warn('Performance monitoring failed to initialize:', error);
    }
  }
};

// Network information for adaptive loading
export const getNetworkInfo = () => {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = navigator.connection;
    return {
      effectiveType: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
      saveData: conn.saveData
    };
  }
  return null;
};

// Adaptive image loading based on network
export const shouldLoadHighQuality = () => {
  const networkInfo = getNetworkInfo();
  if (!networkInfo) return true; // Default to high quality
  
  return !networkInfo.saveData && 
         networkInfo.effectiveType !== 'slow-2g' && 
         networkInfo.effectiveType !== '2g';
};
