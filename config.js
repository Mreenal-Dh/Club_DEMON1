// Supabase Configuration
// IMPORTANT: Replace these with your actual Supabase credentials

const SUPABASE_CONFIG = {
    url: 'YOUR_SUPABASE_PROJECT_URL',  // Example: https://xxxxx.supabase.co
    anonKey: 'YOUR_SUPABASE_ANON_KEY'  // Your anon/public key from Supabase dashboard
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPABASE_CONFIG;
}

// Instructions:
// 1. Go to your Supabase project dashboard
// 2. Click Settings (gear icon) → API
// 3. Copy your Project URL and paste it above
// 4. Copy your anon public key and paste it above
// 5. Never commit this file with real credentials to public repositories
