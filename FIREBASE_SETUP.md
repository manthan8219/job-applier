# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable the following providers:
   - **Email/Password** - Click Enable
   - **Google** - Click Enable and configure
   - **Phone** - Click Enable (requires billing account for SMS)

## Step 3: Get Firebase Configuration

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Job Applier")
5. Copy the `firebaseConfig` object

## Step 4: Configure Environment Variables

Create a file `.env.local` in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Replace the values with your actual Firebase configuration.

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (e.g., `job-applier.vercel.app`)

## Step 6: Restart Development Server

After adding `.env.local`, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```



## Troubleshooting

- **"Firebase: Error (auth/invalid-api-key)"**: Check your API key in `.env.local`
- **"Firebase: Error (auth/unauthorized-domain)"**: Add your domain to authorized domains
- **reCAPTCHA issues**: Make sure you're testing on `localhost` or an authorized domain
