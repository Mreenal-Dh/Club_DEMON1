# CLUB DEMON - College Club & Event Management System

A modern, minimalistic website for managing college clubs and events with an admin portal.

## 🌟 Features

### Student Features
- Browse all clubs with detailed information
- View upcoming events in a masonry layout
- Apply to join clubs through online forms
- Responsive design for all devices
- Minimalistic black & white design with geometric aesthetics

### Admin Features
- Complete dashboard for managing clubs and events
- Add, edit, and delete clubs
- Manage events with full details
- Review and approve/reject club applications
- Real-time database integration with Supabase

## 📁 Project Structure

```
Website_project/
├── index.html              # Login page
├── home.html               # Student home page
├── clubs.html              # Clubs listing
├── club-detail.html        # Individual club details
├── events.html             # Events masonry layout
├── admin-dashboard.html    # Admin portal
├── styles.css              # All styling
├── script.js               # Frontend JavaScript
├── admin.js                # Admin dashboard logic
├── config.js               # Supabase configuration
├── assets/
│   └── images/
│       └── logo.png        # College logo
├── SUPABASE_HOSTING_GUIDE.md  # Detailed hosting guide
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Local Setup

1. **Clone or download this project**
   ```bash
   cd Desktop/Website_project
   ```

2. **Open with Live Server**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Website will open at `http://localhost:5500`

3. **Test the website**
   - Login page: Default credentials `admin` / `admin123`
   - Click "I am a Student" to access student pages

### 2. Supabase Setup

**Follow the detailed guide in `SUPABASE_HOSTING_GUIDE.md`**

Quick steps:
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run the SQL schema (provided in guide)
4. Get your API credentials
5. Update `config.js` and `admin.js` with your credentials

### 3. Deploy to Web

**Option A: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

**Option B: Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop your `Website_project` folder
- Done!

**Option C: GitHub Pages**
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

## 🔑 Default Login Credentials

**Admin Portal:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change these in production!**

## 📚 Database Schema

### Tables Created:
- `clubs` - Store club information
- `club_activities` - Club activities list
- `club_gallery` - Club images
- `events` - Event details
- `club_applications` - Student applications
- `admin_users` - Admin authentication

## 🎨 Design Features

- **Minimalistic Design** - Clean black & white aesthetic
- **Geometric Shapes** - Animated background elements
- **Typography** - Sans-serif for UI, Georgia serif for content
- **Responsive** - Mobile, tablet, and desktop optimized
- **Masonry Layout** - Pinterest-style events page
- **Modal Interactions** - Instagram-style event details
- **Hover Effects** - Smooth animations and transitions

## 🔧 Configuration

### Update Supabase Credentials

1. Open `config.js`
2. Replace:
   ```javascript
   url: 'YOUR_SUPABASE_PROJECT_URL'
   anonKey: 'YOUR_SUPABASE_ANON_KEY'
   ```

3. Open `admin.js`
4. Update lines 2-3:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```

### Add Your College Logo

1. Replace `assets/images/logo.png` with your college logo
2. Recommended size: 100x100 pixels
3. Format: PNG with transparent background

## 📱 Pages Overview

### Student Pages
- **index.html** - Login page with admin/student options
- **home.html** - Welcome page with Clubs/Events cards
- **clubs.html** - Grid of all clubs with hover effects
- **club-detail.html** - Detailed club information with apply form
- **events.html** - Masonry layout of events with modal details

### Admin Pages
- **admin-dashboard.html** - Complete management dashboard
  - Clubs management (Add/Edit/Delete)
  - Events management (Add/Edit/Delete)
  - Applications review (Approve/Reject)

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel / Netlify / GitHub Pages
- **Storage:** Supabase Storage (for images)
- **Authentication:** Session-based (upgrade to Supabase Auth recommended)

## 📈 Future Enhancements

- [ ] Supabase Authentication integration
- [ ] Email notifications for applications
- [ ] Image upload functionality
- [ ] Search and filter for clubs/events
- [ ] Student dashboard
- [ ] Analytics and statistics
- [ ] Export applications to CSV
- [ ] Event calendar view
- [ ] Club member management

## 🐛 Troubleshooting

### Images not loading?
- Check if `assets/images/logo.png` exists
- Verify file paths are correct
- Check browser console for errors

### Admin dashboard not loading data?
- Verify Supabase credentials in `admin.js`
- Check if database tables are created
- Open browser console to see errors
- Ensure Row Level Security policies are set

### Can't login to admin?
- Default credentials: `admin` / `admin123`
- Check browser console for JavaScript errors
- Clear browser cache and try again

### CORS errors?
- Add your website URL to Supabase allowed URLs
- Go to: Project Settings → API → Site URL

## 📞 Support

For issues and questions:
1. Check `SUPABASE_HOSTING_GUIDE.md` for detailed setup
2. Review browser console for errors
3. Check Supabase dashboard logs
4. Refer to [Supabase Documentation](https://supabase.com/docs)

## 📄 License

This project is created for educational purposes.

## 👥 Credits

- **College:** Dr. Shyama Prasad Mukherjee International Institute of Information Technology, Naya Raipur
- **Project:** Club & Event Management System
- **Design:** Minimalistic with geometric aesthetics
- **Icons:** SVG icons throughout

---

**Ready to launch? Follow the `SUPABASE_HOSTING_GUIDE.md` for deployment!** 🚀
