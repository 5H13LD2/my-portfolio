# Portfolio Deployment Guide

## 🚀 Deployment Status
- **Repository**: https://github.com/5H13LD2/my-portfolio.git
- **Platform**: Vercel
- **Framework**: React + Vite + TypeScript
- **Build Output**: `dist/` folder

## 📋 Prerequisites
- [x] Git repository connected to GitHub
- [x] Vercel account
- [x] Node.js 18+ installed locally

## 🔗 Connecting Vercel to GitHub

### Method 1: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import from GitHub: `https://github.com/5H13LD2/my-portfolio.git`
4. Configure project settings:
   ```json
   {
     "Framework Preset": "Vite",
     "Build Command": "npm run build",
     "Output Directory": "dist",
     "Install Command": "npm install",
     "Root Directory": "./"
   }
   ```
5. Click "Deploy"

### Method 2: Vercel CLI
```bash
# In your project directory
cd C:\Users\sawad\OneDrive\Desktop\my-portfolio

# Link to existing project or create new
vercel --prod

# Follow prompts:
# - Link to existing project? [y/N] y
# - Link to GitHub repo? [y/N] y  
# - Select: 5H13LD2/my-portfolio
```

## ⚙️ Project Configuration

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Environment Variables
If your app uses environment variables, add them in Vercel Dashboard:
```bash
# Example variables (add in Vercel Dashboard -> Settings -> Environment Variables)
NODE_ENV=production
VITE_APP_TITLE=Jerico Jimenez Portfolio
```

### Vercel Configuration (`vercel.json`)
Current configuration includes:
- SPA routing support
- Asset caching headers
- Security headers
- Build optimization

## 🚀 Deployment Commands

### Manual Deploy (if needed)
```bash
# Build locally first
npm run build

# Deploy to production
vercel --prod
```

### Auto Deploy (GitHub Integration)
- **Main Branch**: Auto-deploys to production
- **Other Branches**: Auto-deploys to preview URLs
- **Pull Requests**: Creates preview deployments

## 🔧 Build Process
1. **Install Dependencies**: `npm install`
2. **TypeScript Compilation**: `tsc -b`
3. **Vite Build**: `vite build`
4. **Output**: Static files in `dist/` folder
5. **Deploy**: Files served from Vercel CDN

## 🌐 Domain Setup
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add custom domain (optional):
   - `your-domain.com`
   - Configure DNS records as instructed

## 📁 Project Structure
```
my-portfolio/
├── public/              # Static assets
│   ├── assets/         # Images, screenshots
│   ├── other/          # Resume, documents
│   └── favicon.jpg     # Site icon
├── src/                # Source code
│   ├── components/     # React components
│   ├── data/          # Project & certificate data
│   ├── pages/         # Page components
│   ├── types/         # TypeScript definitions
│   └── utils/         # Utility functions
├── vercel.json        # Vercel configuration
└── package.json       # Dependencies & scripts
```

## 🔍 Troubleshooting

### Build Failures
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript types are correct

### Environment Issues
- Add environment variables in Vercel Dashboard
- Prefix client-side vars with `VITE_`
- Check variable names match your code

### Routing Issues
- `vercel.json` includes SPA rewrite rules
- All routes redirect to `index.html`
- React Router handles client-side routing

## 📊 Performance Optimization
- ✅ Asset caching headers configured
- ✅ Code splitting with Vite
- ✅ Image optimization enabled
- ✅ Bundle size warnings set to 1000kb

## 🔒 Security Headers
Current security headers in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📝 Deployment Checklist
- [x] Repository connected to GitHub
- [x] Vercel project configured
- [x] Build settings verified
- [x] Environment variables set (if needed)
- [x] Custom domain configured (optional)
- [x] SSL certificate active (automatic)

## 🚀 Production URLs
- **Production**: Will be provided after Vercel deployment
- **GitHub**: https://github.com/5H13LD2/my-portfolio.git

## 📞 Support
- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **GitHub Issues**: Create issues in your repository

---

**Last Updated**: February 2026
**Version**: 1.0
**Author**: Jerico Jimenez