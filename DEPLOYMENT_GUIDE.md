# DEPLOYMENT GUIDE: Hosting Your College Website on Supabase

## Complete Step-by-Step Instructions for Beginners

---

## PART 1: UNDERSTANDING SUPABASE

Supabase is a platform that provides:
- Database (PostgreSQL)
- Authentication
- Storage
- **Hosting for static websites**

We'll be using Supabase's storage feature to host your website files.

---

## PART 2: SETTING UP YOUR SUPABASE ACCOUNT

### Step 1: Create a Supabase Account

1. **Go to Supabase Website**
   - Open your browser and visit: https://supabase.com
   
2. **Click "Start Your Project"**
   - Look for the green button on the homepage

3. **Sign Up**
   - Click "Sign Up" 
   - You can sign up using:
     - GitHub account (recommended)
     - Email and password
   
4. **Verify Your Email**
   - Check your email inbox
   - Click the verification link sent by Supabase

### Step 2: Create a New Project

1. **After logging in, click "New Project"**
   
2. **Fill in Project Details:**
   - **Name**: Choose a name (e.g., "college-clubs-portal")
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose the closest region to India (e.g., "Southeast Asia (Singapore)")
   - **Pricing Plan**: Select "Free" tier

3. **Click "Create New Project"**
   - Wait 2-3 minutes for the project to initialize

---

## PART 3: HOSTING YOUR WEBSITE FILES

### Method 1: Using Supabase Storage (Recommended)

#### Step 1: Create a Storage Bucket

1. **In your Supabase Dashboard:**
   - Click on "Storage" in the left sidebar
   - Click "Create a new bucket"
   
2. **Configure the Bucket:**
   - **Name**: Enter "website" (lowercase, no spaces)
   - **Public bucket**: Toggle this ON (important!)
   - Click "Create bucket"

#### Step 2: Upload Your Website Files

1. **Click on the "website" bucket you just created**

2. **Upload Files One by One:**
   - Click "Upload file" button
   - Upload these files in order:
     - `index.html` (your login page)
     - `home.html`
     - `clubs.html`
     - `events.html`
     - `styles.css`
     - `script.js`

3. **Verify All Files Are Uploaded**
   - You should see all 6 files listed in your bucket

#### Step 3: Make Files Publicly Accessible

1. **Still in the Storage section:**
   - Click on "Policies" tab at the top
   
2. **Create a New Policy:**
   - Click "New Policy"
   - Select "For full customization, create a policy from scratch"
   
3. **Configure the Policy:**
   - **Policy name**: "Public Access"
   - **Allowed operation**: Check "SELECT"
   - **Target roles**: Select "public"
   - **USING expression**: Enter `true`
   - Click "Review" then "Save policy"

#### Step 4: Get Your Website URLs

1. **For each file in your bucket:**
   - Click the three dots (•••) next to `index.html`
   - Select "Get URL"
   - Copy the URL (it will look like: `https://[project-ref].supabase.co/storage/v1/object/public/website/index.html`)

2. **Save Your URLs:**
   - Main URL: `https://[your-project].supabase.co/storage/v1/object/public/website/index.html`
   - This is your website's address!

---

## PART 4: ALTERNATIVE HOSTING METHOD (Using Vercel - Easier!)

Since Supabase is primarily a database service, I recommend using **Vercel** for hosting your static website. It's FREE and much easier!

### Step 1: Install Git (if not already installed)

1. **Download Git:**
   - Visit: https://git-scm.com/download/win
   - Download and install Git for Windows

### Step 2: Prepare Your Project

1. **Open PowerShell in your project folder:**
   - Right-click on your `Website_project` folder
   - Select "Open PowerShell window here"

2. **Initialize Git Repository:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   ```

### Step 3: Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com
   - Sign in or create an account

2. **Create New Repository:**
   - Click the "+" icon → "New repository"
   - Name: "college-clubs-website"
   - Keep it Public
   - DON'T initialize with README
   - Click "Create repository"

3. **Push Your Code:**
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/college-clubs-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 4: Deploy to Vercel

1. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Sign Up" → Use GitHub account

2. **Import Your Project:**
   - Click "Add New..." → "Project"
   - Find "college-clubs-website" repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset**: Leave as "Other"
   - Click "Deploy"

4. **Get Your Website URL:**
   - After deployment (1-2 minutes)
   - You'll get a URL like: `https://college-clubs-website.vercel.app`
   - **This is your live website!**

---

## PART 5: SETTING UP DATABASE (For Future Features)

### Creating Database Tables in Supabase

1. **Go to "SQL Editor" in Supabase Dashboard**

2. **Create Admin Users Table:**
   ```sql
   CREATE TABLE admin_users (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       username TEXT UNIQUE NOT NULL,
       password_hash TEXT NOT NULL,
       email TEXT UNIQUE NOT NULL,
       created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Create Clubs Table:**
   ```sql
   CREATE TABLE clubs (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name TEXT NOT NULL,
       description TEXT,
       category TEXT,
       image_url TEXT,
       created_at TIMESTAMP DEFAULT NOW()
   );
   ```

4. **Create Events Table:**
   ```sql
   CREATE TABLE events (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       title TEXT NOT NULL,
       description TEXT,
       event_date TIMESTAMP,
       location TEXT,
       club_id UUID REFERENCES clubs(id),
       image_url TEXT,
       created_at TIMESTAMP DEFAULT NOW()
   );
   ```

5. **Click "Run" to execute each query**

---

## PART 6: CONNECTING YOUR WEBSITE TO SUPABASE

### Step 1: Install Supabase JavaScript Client

1. **Add this to your HTML files (before closing `</body>` tag):**
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```

2. **Update your `script.js` file** with Supabase initialization:
   ```javascript
   // Add at the top of script.js
   const SUPABASE_URL = 'YOUR_PROJECT_URL';
   const SUPABASE_KEY = 'YOUR_ANON_KEY';
   const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
   ```

### Step 2: Get Your Supabase Credentials

1. **In Supabase Dashboard:**
   - Click "Settings" (gear icon) in left sidebar
   - Click "API"
   
2. **Copy These Values:**
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **anon/public key**: Long string of characters

3. **Replace in script.js:**
   - Replace `YOUR_PROJECT_URL` with your Project URL
   - Replace `YOUR_ANON_KEY` with your anon key

---

## PART 7: TESTING YOUR WEBSITE

### Local Testing (Before Deployment)

1. **Open `index.html` in your browser:**
   - Right-click `index.html`
   - Open with your browser (Chrome, Edge, etc.)

2. **Test Navigation:**
   - Click "I am a Student" → Should go to home page
   - Click "Clubs" card → Should go to clubs page
   - Click "Events" card → Should go to events page
   - Click "← Back to Home" → Should return to home page

### Live Testing (After Deployment)

1. **Visit your Vercel URL**
2. **Test all the same navigation**
3. **Test on mobile phone** (responsive design)

---

## PART 8: UPDATING YOUR WEBSITE

### If Hosted on Vercel:

1. **Make changes to your local files**
2. **Push to GitHub:**
   ```powershell
   git add .
   git commit -m "Updated website"
   git push
   ```
3. **Vercel automatically deploys changes** (1-2 minutes)

### If Using Supabase Storage:

1. **Go to Storage → website bucket**
2. **Delete the old file**
3. **Upload the new file**

---

## PART 9: TROUBLESHOOTING

### Common Issues:

1. **"Cannot access website"**
   - Wait 5 minutes after deployment
   - Check if URL is correct
   - Clear browser cache (Ctrl + F5)

2. **"Styles not loading"**
   - Make sure `styles.css` is in the same folder
   - Check file names are exactly correct (case-sensitive)

3. **"Database connection error"**
   - Verify your Supabase URL and Key
   - Check if project is active in Supabase

---

## QUICK START SUMMARY

**Easiest Method (Recommended):**

1. ✅ Create Vercel account (https://vercel.com)
2. ✅ Create GitHub account (https://github.com)
3. ✅ Install Git
4. ✅ Push your code to GitHub
5. ✅ Connect GitHub to Vercel
6. ✅ Deploy!
7. ✅ Get your live URL

**For Database (Supabase):**

1. ✅ Create Supabase account (https://supabase.com)
2. ✅ Create new project
3. ✅ Run SQL queries to create tables
4. ✅ Get API credentials
5. ✅ Add to your website code

---

## YOUR WEBSITE IS NOW LIVE! 🎉

**Questions or Issues?**
- Check the troubleshooting section above
- Visit Vercel Documentation: https://vercel.com/docs
- Visit Supabase Documentation: https://supabase.com/docs

---

## NEXT STEPS

1. **Add real clubs data** to the Clubs page
2. **Add real events data** to the Events page
3. **Implement admin authentication** with Supabase Auth
4. **Create admin dashboard** for managing clubs and events
5. **Add image uploads** for clubs and events

Good luck with your project! 🚀
