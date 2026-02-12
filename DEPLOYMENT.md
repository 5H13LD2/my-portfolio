# Deployment Guide - Vercel

This guide will help you deploy your portfolio app to Vercel.

## Prerequisites

- A Vercel account ([sign up here](https://vercel.com/signup))
- Git repository (GitHub, GitLab, or Bitbucket)
- Firebase project with configuration ready

## Quick Deployment Steps

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Push Your Code to Git

Make sure your code is committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 3. Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" > "Project"
3. Import your Git repository
4. Vercel will auto-detect it's a Vite project
5. Configure your environment variables (see below)
6. Click "Deploy"

### 4. Configure Environment Variables

In the Vercel dashboard, add these environment variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Important:** Never commit your `.env` file to Git. Use the `.env.example` as a reference.

### 5. Deploy via CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Build Configuration

The project is configured with:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

These settings are defined in [vercel.json](vercel.json).

## Post-Deployment

### Update Firebase CORS Settings

If using Firebase, update your CORS settings to allow requests from your Vercel domain:

1. Go to Firebase Console
2. Navigate to Authentication > Settings > Authorized domains
3. Add your Vercel domain (e.g., `your-app.vercel.app`)

### Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting

### Build Fails

- Check if all dependencies are in `package.json`
- Verify TypeScript compilation: `npm run build` locally
- Check build logs in Vercel dashboard

### Environment Variables Not Working

- Ensure all variables start with `VITE_` prefix
- Redeploy after adding/changing environment variables
- Check if variables are set in Production environment

### 404 on Page Refresh

- The `vercel.json` configuration handles SPA routing
- If issues persist, check the rewrite rules in `vercel.json`

## Monitoring

- View deployment logs in Vercel Dashboard
- Set up analytics in Settings > Analytics
- Configure custom monitoring if needed

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Firebase Documentation](https://firebase.google.com/docs)
