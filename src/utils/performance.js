// Performance monitoring utilities
export class PerformanceMonitor {
  static measurements = new Map();

  static startMeasurement(name) {
    this.measurements.set(name, performance.now());
  }

  static endMeasurement(name) {
    const startTime = this.measurements.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.measurements.delete(name);

      // Log performance in development
      if (import.meta.env.DEV) {
        console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
      }

      // In production, send to analytics service
      if (import.meta.env.PROD) {
        this.sendToAnalytics(name, duration);
      }

      return duration;
    }
    return null;
  }

  static sendToAnalytics(name, duration) {
    // Example: Google Analytics 4 custom event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "performance_timing", {
        custom_parameter_1: name,
        custom_parameter_2: duration,
      });
    }

    // Example: Custom analytics endpoint
    // fetch('/api/analytics/performance', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ metric: name, duration, timestamp: Date.now() })
    // });
  }

  // Core Web Vitals monitoring
  static monitorCoreWebVitals() {
    // In a real implementation, you would install web-vitals package
    // if (typeof web_vitals !== 'undefined') {
    //   web_vitals.getLCP(this.handleWebVital);
    //   web_vitals.getFID(this.handleWebVital);
    //   web_vitals.getCLS(this.handleWebVital);
    //   web_vitals.getFCP(this.handleWebVital);
    //   web_vitals.getTTFB(this.handleWebVital);
    // }
  }

  static handleWebVital(metric) {
    console.log(`📊 ${metric.name}:`, metric.value);

    if (import.meta.env.PROD) {
      // Send to analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", metric.name, {
          value: Math.round(
            metric.name === "CLS" ? metric.value * 1000 : metric.value,
          ),
          custom_parameter_1: metric.id,
        });
      }
    }
  }

  // Animation performance monitoring
  static monitorAnimationFrame() {
    let frameCount = 0;
    let startTime = performance.now();

    const checkFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - startTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - startTime));

        if (import.meta.env.DEV && fps < 55) {
          console.warn(`🎭 Low FPS detected: ${fps}fps`);
        }

        frameCount = 0;
        startTime = currentTime;
      }

      requestAnimationFrame(checkFPS);
    };

    requestAnimationFrame(checkFPS);
  }
}

// React hook for performance monitoring
import { useEffect } from "react";

export const usePerformanceMonitor = (componentName) => {
  useEffect(() => {
    PerformanceMonitor.startMeasurement(`${componentName}_mount`);

    return () => {
      PerformanceMonitor.endMeasurement(`${componentName}_mount`);
    };
  }, [componentName]);

  const measureOperation = (operationName, operation) => {
    PerformanceMonitor.startMeasurement(`${componentName}_${operationName}`);
    const result = operation();
    PerformanceMonitor.endMeasurement(`${componentName}_${operationName}`);
    return result;
  };

  return { measureOperation };
};

// GSAP animation performance monitoring
export const monitorGSAPPerformance = (animation, name = "animation") => {
  if (import.meta.env.DEV) {
    animation.eventCallback("onStart", () => {
      PerformanceMonitor.startMeasurement(`gsap_${name}`);
    });

    animation.eventCallback("onComplete", () => {
      PerformanceMonitor.endMeasurement(`gsap_${name}`);
    });
  }

  return animation;
};
