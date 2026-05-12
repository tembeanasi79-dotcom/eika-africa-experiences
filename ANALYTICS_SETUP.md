# Eika Africa Experience - Analytics Integration Guide

## Environment Variables Setup

Add these variables to your `.env` file (for local development) and your deployment platform's environment variables:

### Google Analytics 4 (GA4)
```env
VITE_GTAG_ID=G-XXXXXXXXXX
```
- Get your ID from: [Google Analytics](https://analytics.google.com) → Admin → Property → Data Streams → Web → Measurement ID

### Google Ads Conversion Tracking (Optional)
```env
VITE_CONVERSION_ID=AW-18147899322
```
- Get your ID from: [Google Ads](https://ads.google.com) → Tools & Settings → Conversions

## How Analytics Works

The analytics system is initialized automatically on app startup via `src/main.tsx`:

1. **Sentry** - Error and performance tracking
2. **PostHog** - Product analytics and feature tracking
3. **Google Analytics** - Website traffic and user behavior (NEW)

## Using Analytics in Your Code

### Track Custom Events

```typescript
import { trackConversion, GtagEvents } from "@/lib/gtag";

// Track a booking started
GtagEvents.bookingStarted("Gorilla Trek", "premium");

// Track a booking completed
GtagEvents.bookingCompleted("Gorilla Trek", 2999.99, "USD");

// Track tour view
GtagEvents.tourViewed("African Safari", "adventure");

// Track newsletter signup
GtagEvents.newsletterSignup();

// Track custom conversion
trackConversion("custom_event", {
  custom_property: "value",
  amount: 100
});
```

### Available Conversion Events

Located in `src/lib/gtag.ts`, the `GtagEvents` object provides pre-built events for common actions:

- `bookingStarted(tourName, tier)` - Begin checkout
- `bookingCompleted(tourName, value, currency)` - Purchase completed
- `tourViewed(tourName, category)` - Tour page viewed
- `newsletterSignup()` - Newsletter subscription
- `contactFormSubmitted()` - Contact form submitted
- `searchPerformed(searchTerm)` - Search performed

## Verifying Setup

1. **Development Mode**: Check browser console for `[gtag]` logs
2. **Production**: Verify data appears in Google Analytics Real-time view within 10-30 seconds of activity
3. **Google Ads**: Track conversions in your Google Ads account

## Troubleshooting

### Data not appearing in Google Analytics?
- Verify `VITE_GTAG_ID` is set correctly
- Check browser console for warnings
- Ensure you're viewing the correct GA4 property
- Allow 24-48 hours for historical data to fully process

### Conversion tracking not working?
- Verify `VITE_CONVERSION_ID` format: `AW-XXXXXXXXX`
- Ensure conversion is properly linked in Google Ads
- Check Google Ads conversion settings match your event names

## Files Modified

- `src/lib/gtag.ts` - New Google Analytics integration module
- `src/main.tsx` - Added gtag initialization
- `index.html` - Removed hardcoded gtag script (now dynamic)

## References

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Google Analytics Events](https://support.google.com/analytics/answer/9234069)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/1722054)
