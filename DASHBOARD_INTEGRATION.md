# Admin Dashboard Notes

This doc covers how the admin dashboard is integrated into the site.

## Authentication

The ProtectedRoute component wraps the dashboard and checks that:
1. User is logged in via Supabase auth
2. User's ID exists in the admin_users table

If either check fails, they get bounced back to /admin (the login page).

The component uses onAuthStateChange to watch for login/logout events in real-time, so if someone's session expires they're automatically logged out.

## Admin Header

The header at the top of the dashboard has:
- Clickable logo that goes to the homepage
- A "Back to Site" link
- Logout button
- Responsive layout (icons only on mobile)

## Error Handling

Most data fetching is wrapped in try/catch blocks. When something goes wrong, we show a toast notification so admins know there's an issue without the whole page crashing.

There's also an ErrorBoundary component wrapping the dashboard that catches runtime errors and shows a friendly error screen instead of a blank page.

## Login Flow

When you hit /admin, the AdminLogin page first checks if you're already logged in as an admin. If so, you get redirected straight to the dashboard instead of having to log in again.

## Skeleton Loaders

Instead of showing "Loading..." text, most tabs show skeleton placeholders that match the shape of the actual content. Looks more polished.

## Page Titles

The dashboard sets the document title to "Admin Dashboard | Eika Africa Experience" so you can tell which tab you're in when you have multiple open.
