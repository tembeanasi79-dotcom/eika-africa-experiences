/**
 * Google Analytics and Google Ads Conversion Tracking Integration
 * 
 * Environment variables needed:
 * VITE_GTAG_ID=G-XXXXXXXXXX (Google Analytics 4 ID)
 * VITE_CONVERSION_ID=AW-XXXXXXXXX (Google Ads Conversion ID - optional)
 * 
 * Get your IDs from:
 * - GA4: Google Analytics -> Admin -> Property -> Data Streams
 * - Conversion: Google Ads -> Tools -> Conversions
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

export function initGtag() {
  const gtagId = import.meta.env.VITE_GTAG_ID;
  const conversionId = import.meta.env.VITE_CONVERSION_ID;

  // Only initialize if GA4 ID is configured
  if (!gtagId) {
    console.warn("[gtag] Google Analytics ID not configured. Add VITE_GTAG_ID to your .env file.");
    return;
  }

  // Initialize data layer
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  function gtag(...args: unknown[]) {
    window.dataLayer.push(arguments);
  }

  // Set gtag on window
  window.gtag = gtag;

  // Load gtag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
  document.head.appendChild(script);

  // Initialize Google Analytics
  gtag("js", new Date());
  gtag("config", gtagId, {
    send_page_view: true,
  });

  // Initialize Google Ads conversion tracking if configured
  if (conversionId) {
    gtag("config", conversionId, {
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
    });
  }

  console.log("[gtag] Google Analytics initialized with ID:", gtagId);
  if (conversionId) {
    console.log("[gtag] Google Ads conversion tracking initialized with ID:", conversionId);
  }
}

/**
 * Track a conversion event
 * 
 * Usage:
 * trackConversion("purchase", {
 *   value: 99.99,
 *   currency: "USD",
 *   transaction_id: "TXN123"
 * })
 */
export function trackConversion(eventName: string, eventData?: Record<string, unknown>) {
  if (!window.gtag) {
    console.warn("[gtag] gtag not initialized. Make sure initGtag() was called.");
    return;
  }

  window.gtag("event", eventName, eventData);
  console.log("[gtag] Conversion tracked:", eventName, eventData);
}

/**
 * Track page view explicitly
 */
export function trackPageView(pagePath: string, pageTitle: string) {
  if (!window.gtag) return;

  window.gtag("config", import.meta.env.VITE_GTAG_ID, {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

/**
 * Set user ID for cross-device tracking
 */
export function setUserId(userId: string) {
  if (!window.gtag) return;

  window.gtag("config", import.meta.env.VITE_GTAG_ID, {
    user_id: userId,
  });
}

/**
 * Common conversion events for travel booking
 */
export const GtagEvents = {
  // Booking funnel
  bookingStarted: (tourName?: string, tier?: string) => {
    trackConversion("begin_checkout", {
      tour_name: tourName,
      tier,
    });
  },

  bookingCompleted: (tourName: string, value: number, currency: string = "USD") => {
    trackConversion("purchase", {
      tour_name: tourName,
      value,
      currency,
      transaction_id: `booking_${Date.now()}`,
    });
  },

  // Tour interactions
  tourViewed: (tourName: string, tourCategory?: string) => {
    trackConversion("view_item", {
      items: [
        {
          item_name: tourName,
          item_category: tourCategory || "tour",
        },
      ],
    });
  },

  // Newsletter
  newsletterSignup: () => {
    trackConversion("subscribe", {
      subscription_type: "newsletter",
    });
  },

  // Contact
  contactFormSubmitted: () => {
    trackConversion("contact", {
      contact_type: "form",
    });
  },

  // Search
  searchPerformed: (searchTerm: string) => {
    trackConversion("search", {
      search_term: searchTerm,
    });
  },
};
