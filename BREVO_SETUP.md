# Brevo Email Setup

We use Brevo (formerly Sendinblue) for sending transactional emails. Here's how to get it configured.

## Getting Started

1. Create an account at brevo.com
2. Go to Settings > SMTP & API > API Keys
3. Generate a new key and name it something like "Eika Production"
4. Copy the key (you won't be able to see it again)

## Supabase Configuration

Add the API key to Supabase Edge Functions secrets:

1. Open your Supabase dashboard
2. Go to Settings > Edge Functions > Secrets
3. Add BREVO_API_KEY with your key value

Or via CLI: supabase secrets set BREVO_API_KEY=your-key-here

## Domain Verification

To send from @eikafricaexperience.com addresses, you need to verify the domain:

1. In Brevo, go to Senders & IPs > Senders
2. Add noreply@eikafricaexperience.com as a sender
3. Click the verification link they email you

For better deliverability, also set up SPF/DKIM/DMARC records in your DNS. Brevo will give you the exact values when you add your domain under Senders & IPs > Domains.

## Deploying Edge Functions

After setting up secrets:

supabase functions deploy send-booking-notification
supabase functions deploy send-newsletter-welcome

## What Gets Sent

- Booking inquiry notification (to business)
- Booking confirmation (to customer)
- Newsletter welcome email
- Newsletter admin notification

## Free Tier Limits

Brevo's free plan gives you 300 emails/day and 9000/month. Should be plenty for a small to medium business.

## Troubleshooting

Emails not sending: Check the BREVO_API_KEY secret is set, verify your sender email, check Brevo's email logs.

Going to spam: Make sure you set up the SPF/DKIM/DMARC records. Also helps to warm up a new domain by sending small volumes first.
