# Supabase Hosting & Setup Guide

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Verify your email if required

## Step 2: Create a New Project
1. Click "New Project" in the dashboard
2. Fill in:
   - **Project Name**: `club-demon` (or your choice)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to your location (e.g., Mumbai for India)
   - **Pricing Plan**: Free tier is sufficient to start
3. Click "Create new project"
4. Wait 2-3 minutes for project setup

## Step 3: Set Up Database Tables

### Open SQL Editor
1. In your Supabase project, click "SQL Editor" in the left sidebar
2. Click "New Query"

### Create Tables (Copy and paste this SQL):

```sql
-- Create Clubs Table
CREATE TABLE clubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  logo_url TEXT,
  member_count INTEGER DEFAULT 0,
  is_recruiting BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Club Activities Table
CREATE TABLE club_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  activity_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Club Gallery Table
CREATE TABLE club_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Events Table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  datetime TEXT,
  venue TEXT,
  organizer TEXT,
  registration_info TEXT,
  image_url TEXT,
  highlights TEXT[], -- Array of highlights
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Applications Table
CREATE TABLE club_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  year TEXT NOT NULL,
  branch TEXT NOT NULL,
  motivation TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Admin Users Table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create Policies for Public Read Access
CREATE POLICY "Allow public read access on clubs"
ON clubs FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public read access on club_activities"
ON club_activities FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public read access on club_gallery"
ON club_gallery FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public read access on events"
ON events FOR SELECT
TO anon
USING (true);

-- Create Policy for Applications (Insert only)
CREATE POLICY "Allow public insert on applications"
ON club_applications FOR INSERT
TO anon
WITH CHECK (true);

-- Insert Sample Data
INSERT INTO clubs (name, description, long_description, member_count, is_recruiting) VALUES
('Coding Club', 'Learn programming and participate in hackathons', 'The Coding Club is a vibrant community of programming enthusiasts dedicated to fostering excellence in software development and competitive programming.', 120, true),
('Robotics Club', 'Explore robotics and automation', 'Build robots, participate in competitions, and work on innovative hardware projects with cutting-edge technology.', 85, true),
('Design Club', 'UI/UX design and graphic design', 'Express your creativity through UI/UX design, graphic design, and digital art.', 95, true);

INSERT INTO events (title, description, date, datetime, venue, organizer, registration_info, image_url) VALUES
('Annual Tech Fest 2025', 'Three days of innovation, competitions, and tech talks', 'Dec 15-17, 2025', 'December 15-17, 2025 | 9:00 AM - 6:00 PM', 'Main Campus Auditorium', 'Technical Society', 'Open until Dec 10', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800');
```

3. Click "Run" to execute the SQL
4. You should see "Success. No rows returned" message

## Step 4: Get Your API Credentials

1. Click "Settings" (gear icon) in the left sidebar
2. Click "API" under Project Settings
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`
4. **IMPORTANT**: Copy both and save them securely

## Step 5: Enable Storage for Images

1. Click "Storage" in the left sidebar
2. Click "Create a new bucket"
3. Name it: `club-images`
4. Make it **Public** (toggle the Public option ON)
5. Click "Create bucket"

### Set Storage Policies:
1. Click on the `club-images` bucket
2. Click "Policies" tab
3. Click "New Policy" → "For full customization"
4. Create TWO separate policies:

   **Policy 1 - Public Read:**
   - **Policy Name**: `Public Read Access`
   - **Allowed operation**: SELECT
   - **Policy definition**: `true`
   - **WITH CHECK expression**: (leave empty)
   
   **Policy 2 - Public Upload:**
   - **Policy Name**: `Public Upload Access`  
   - **Allowed operation**: INSERT
   - **Policy definition**: (leave empty)
   - **WITH CHECK expression**: `true`

5. Click "Review" then "Save policy" for each

**Alternative (Easier):** Simply create the bucket as **Public** and skip manual policies - Supabase will handle access automatically.

## Step 6: Deploy Your Website

### Option A: Using Vercel (Recommended)
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository (push your code to GitHub first)
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
6. Add Environment Variables:
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_ANON_KEY`: Your anon public key
7. Click "Deploy"
8. Your site will be live at: `your-project.vercel.app`

### Option B: Using Netlify
1. Go to https://netlify.com
2. Sign up/Login
3. Click "Add new site" → "Deploy manually"
4. Drag and drop your Website_project folder
5. Site will be deployed instantly

### Option C: Using GitHub Pages
1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git push -u origin main
   ```
3. Go to repository Settings → Pages
4. Source: Deploy from branch `main`
5. Folder: `/ (root)`
6. Save and wait 1-2 minutes
7. Your site will be at: `https://YOUR_USERNAME.github.io/REPO_NAME`

## Step 7: Update Your Website Code

You'll need to add the Supabase JavaScript library and connect to your database. 

### Add to index.html (before closing </head>):
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### Create config.js file with your credentials:
```javascript
const SUPABASE_URL = 'YOUR_PROJECT_URL';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## Step 8: Test Your Setup

1. Try loading your website
2. Check if clubs and events load from database
3. Test the application form submission
4. Check Supabase dashboard to see if data is saved

## Troubleshooting

**Issue: CORS Errors**
- Go to Supabase Dashboard → Authentication → URL Configuration
- Add your website URL to "Site URL" and "Redirect URLs"

**Issue: Images not loading**
- Check if storage bucket is set to Public
- Verify the image URLs are correct
- Make sure storage policies allow public access

**Issue: Can't insert data**
- Check Row Level Security policies
- Verify anon key is correct
- Check browser console for errors

## Next Steps

1. Set up admin authentication
2. Create admin portal for managing clubs and events
3. Add image upload functionality
4. Implement email notifications
5. Add analytics tracking

## Important Notes

- **Never commit your Supabase credentials to GitHub** (use environment variables)
- Keep your database password safe
- Monitor your Supabase usage in the dashboard
- Free tier includes:
  - 500 MB database space
  - 1 GB file storage
  - 2 GB bandwidth per month
  - 50,000 monthly active users

## Support Resources

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: https://github.com/supabase/supabase/issues
