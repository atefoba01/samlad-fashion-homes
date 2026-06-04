# Samlad Fashion Homes - Database Setup Complete

## Database Overview

Your Supabase PostgreSQL database has been fully configured with all necessary tables, security policies, and sample data for the Samlad Fashion Homes color app.

---

## Tables Created

### 1. **palettes** (12 rows - sample data included)
Stores all color palettes available in the app.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | TEXT | Palette name |
| description | TEXT | Description |
| colors | JSONB | Array of color objects with hex, rgb, name |
| category | TEXT | wedding, traditional, birthday, corporate, casual, party, trending |
| likes_count | INTEGER | Number of likes |
| is_trending | BOOLEAN | If palette is featured |
| image_url | TEXT | Inspiration image URL |
| tags | TEXT[] | Search tags |
| created_at | TIMESTAMPTZ | Auto-set timestamp |
| updated_at | TIMESTAMPTZ | Auto-updated timestamp |

**RLS Policy**: Public read-only (everyone can view)

---

### 2. **saved_palettes** (user-specific board)
Tracks which palettes each user has saved.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| user_id | UUID | References auth.users |
| palette_id | UUID | References palettes table |
| saved_at | TIMESTAMPTZ | When saved |

**RLS Policies**:
- SELECT: Users can view their own saved palettes
- INSERT: Users can save palettes for themselves
- DELETE: Users can remove saved palettes

---

### 3. **gallery_posts** (9 rows - sample data included)
Portfolio of fashion designs.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| title | TEXT | Post title |
| description | TEXT | Design description |
| image_url | TEXT | Fashion photo URL |
| category | TEXT | Wedding, Traditional, Casual, etc. |
| tags | TEXT[] | Search tags |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last updated |

**RLS Policy**: Public read-only

---

### 4. **reviews** (5 rows - sample testimonials)
Client reviews and testimonials.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| client_name | TEXT | Client name |
| review_text | TEXT | Review content |
| rating | INTEGER | 1-5 stars |
| media_url | TEXT | Photo/video URL |
| media_type | TEXT | 'photo' or 'video' |
| event_type | TEXT | Wedding, Birthday, etc. |
| created_at | TIMESTAMPTZ | Submission date |

**RLS Policy**: Public read-only

---

### 5. **contact_submissions**
Contact form submissions from website visitors.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| name | TEXT | Visitor name |
| email | TEXT | Email address |
| phone | TEXT | Phone number |
| message | TEXT | Message content |
| submitted_at | TIMESTAMPTZ | Submission timestamp |

**RLS Policy**: Anyone can submit (INSERT)

---

## Sample Data Included

### Palettes (12 trending + classic combinations)
- Royal Elegance (wedding)
- Sage & Gold (traditional)
- Burgundy Luxe (wedding)
- Navy & Silver (corporate)
- Terracotta Vibes (traditional)
- Emerald Royalty (Aso Ebi)
- Coral Sunrise (birthday)
- African Sunset (party)
- White & Gold Glam (wedding)
- Midnight Glam (corporate)
- Blush Romance (wedding)
- Ankara Festival (traditional)

### Gallery Posts (9 fashion designs)
- Royal Bridal Collection
- Yoruba Traditional Attire
- Ankara Glamour Set
- Emerald Aso Ebi
- Corporate Chic
- Birthday Ball Gown
- Igbo Bride Look
- Evening Dinner Look
- Blush Bridesmaid Collection

### Reviews (5 5-star testimonials)
From clients: Adaeze, Tunde, Chidinma, Funmilayo, Emeka

---

## How the App Uses the Database

### Frontend Integration (`src/lib/supabase.ts`)

```typescript
// Load trending palettes on app home
getPalettes('trending')

// Load all gallery posts
getGalleryPosts()

// Load reviews for ReviewSlider
getReviews()

// Submit contact form
submitContactForm(name, email, phone, message)

// User-specific features (requires auth)
getSavedPalettes(userId)
savePalette(userId, paletteId)
removeSavedPalette(userId, paletteId)
```

### Pages That Use Database

- `/app/trending` - Loads palettes with category filtering
- `/gallery` - Loads gallery posts with category filtering
- `/contact` - Submits contact form entries
- `/app/saved` - User's saved palettes (requires Supabase auth)

---

## Environment Variables Required

Add these to your `.env` file:

```env
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

Find these in your Supabase project settings → API.

---

## Security Features

✅ Row Level Security (RLS) enabled on all tables
✅ Public read-only access for portfolio content
✅ User-specific access for saved palettes
✅ Anonymous submissions allowed for contact form
✅ Proper foreign key constraints
✅ Data validation (ratings, categories, etc.)

---

## Indexes for Performance

```sql
idx_palettes_category
idx_palettes_trending
idx_gallery_category
idx_saved_user
idx_reviews_event
```

---

## Next Steps

1. **Add Supabase Auth** (optional)
   - Enable email/password authentication
   - Users can create accounts and save palettes

2. **Admin Dashboard** (optional)
   - Add new palettes
   - Upload gallery posts
   - Moderate contact submissions

3. **Analytics** (optional)
   - Track palette likes and views
   - Monitor user engagement
   - View contact form submissions

---

## Database Stats

| Table | Rows | RLS Enabled | Public Access |
|-------|------|-------------|----------------|
| palettes | 12 | ✓ | Read-only |
| gallery_posts | 9 | ✓ | Read-only |
| reviews | 5 | ✓ | Read-only |
| saved_palettes | 0 | ✓ | User-specific |
| contact_submissions | 0 | ✓ | Write-only |

---

## Questions?

The database is fully configured and ready to use. The frontend app automatically:
- Loads trending palettes on app home
- Displays gallery posts
- Shows client reviews
- Accepts contact submissions
- Stores user-saved palettes (when authenticated)

All data is currently seeded with sample content for demonstration. Update or add new content directly in the Supabase dashboard.
