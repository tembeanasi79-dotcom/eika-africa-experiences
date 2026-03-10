# Admin Setup

How to set up an admin user for the dashboard.

## Creating an Admin

1. Go to your Supabase dashboard (uxdiipqxujzbzfizbhic)
2. Under Authentication > Users, click "Add user" > "Create new user"
3. Enter the email and password, check "Auto Confirm User"
4. Note the User ID (UUID) from the user list

Then run this SQL in the SQL Editor:

INSERT INTO public.admin_users (user_id, email)
VALUES ('paste-user-id-here'::uuid, 'admin@example.com');

## Testing

Go to /admin and log in with the credentials you created. You should be redirected to /admin/dashboard.

## Troubleshooting

If you see "You don't have admin access", check that:
- The user exists in admin_users table
- The user_id matches the auth.users id exactly
