# Tour Data

We extracted 6 Uganda safari tours from Africa Safari Trips and stored them in our Supabase database.

## Current Tours

1. 9-Day Uganda: Visiting Gorillas & Chimpanzees - $3,068 (slug: 9-day-uganda-visiting-gorillas-chimpanzees)
2. 10 Days Uganda: Safari Among Rhinos, Forests and Lakes - $2,549
3. 16 Days Safari: All Pearls of Uganda - $4,768 
4. 13 Days Uganda Adventure: Hiking/Trekking/Rafting/Cycling - $3,309
5. 11 Days Uganda: Discovering the Culture - $2,653
6. 7 Days Uganda: The Perfect Family Safari - $1,810

## Database Structure

Tours are stored in the tours table with fields for title, slug, duration, price, description, itinerary (as JSON), destinations, highlights, inclusions, exclusions, and images. The slug is used as a unique key.

Images go in the tour-images storage bucket. Each tour has 1 main image and up to 5 gallery images, named like tours/{slug}-0.jpg, tours/{slug}-1.jpg, etc.

## Adding New Tours

Run the extraction script:

cd scripts
node extract-tours.js

The script fetches tour pages, parses the content with Cheerio, downloads images, uploads them to storage, and inserts the data. It uses upsert logic so running it again won't create duplicates.

There's a 2-second delay between requests to avoid hammering the source server.

## Admin Management

You can edit tours, mark them as featured, update pricing tiers, and manage images through the admin dashboard at /admin/dashboard.

Source data came from africasafaritrips.com
