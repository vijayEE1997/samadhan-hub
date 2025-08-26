# 🚀 Vercel Deployment Guide

This guide will help you deploy your Samadhan Hub - Agnivirya Wellness Platform with SSR to Vercel.

**Production Domain**: [samadhanhub.com](https://samadhanhub.com)

## 📋 Prerequisites

- [Vercel CLI](https://vercel.com/cli) installed
- [Git](https://git-scm.com/) repository set up
- [Node.js](https://nodejs.org/) 18+ installed

## 🚀 Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
2. **Go to [vercel.com](https://vercel.com) and sign in**
3. **Click "New Project"**
4. **Import your repository**
5. **Configure the project:**
   - **Framework Preset**: Other
   - **Root Directory**: `./` (root of project)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm run install:all`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to your project
cd samadhan

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? [your-username]
# - Link to existing project? N
# - Project name? samadhanhub
# - In which directory is your code located? ./
# - Want to override the settings? Y
# - Build Command: npm run vercel-build
# - Output Directory: client/dist
# - Install Command: npm run install:all
# - Want to override the settings? N
```

## ⚙️ Vercel Configuration

The project includes a `vercel.json` file that configures:

- **Serverless Functions**: API routes and SSR handling
- **Static Builds**: React app build output
- **Routing**: All routes go through the server for SSR
- **Environment**: Production mode enabled

## 🔧 Build Process

### Local Development
```bash
npm run dev          # Start both servers
npm run vercel-dev   # Vercel-compatible dev mode
```

### Production Build
```bash
npm run vercel-build # Build for Vercel deployment
npm run build        # Standard build
```

## 🌐 Deployment URLs

After deployment, you'll get:

- **Production**: `https://your-app.vercel.app`
- **Preview**: `https://your-app-git-branch.vercel.app`
- **API**: `https://your-app.vercel.app/api/*`
- **SSR Routes**: `https://your-app.vercel.app/*` (all routes)

## 📁 Project Structure for Vercel

```
samadhan/
├── vercel.json           # Vercel configuration
├── package.json          # Root package with Vercel scripts
├── server/
│   ├── index.js         # Serverless function entry point
│   └── package.json     # Server dependencies
└── client-agnivirya/
    ├── src/             # React source code (Agnivirya Wellness)
    ├── package.json     # Client dependencies
    └── dist/            # Build output (generated)
```

## 🔍 How Vercel SSR Works

1. **Request**: User visits any route
2. **Vercel Function**: `server/index.js` handles the request
3. **SSR Rendering**: Server renders React app
4. **Response**: HTML sent to browser
5. **Hydration**: Client-side React takes over

## 🚨 Important Notes

### Environment Variables
- Set `NODE_ENV=production` in Vercel dashboard
- Add any custom environment variables you need

### Build Output
- The `client/dist` folder contains the built React app
- Vercel serves this as static files
- SSR is handled by the serverless function

### API Routes
- All `/api/*` routes go to the serverless function
- API responses are JSON (not SSR)

### SSR Routes
- All other routes (`/*`) are SSR-enabled
- Each route gets server-side rendered
- Client-side hydration makes them interactive

## 🛠️ Troubleshooting

### Build Failures
```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing dependencies
# - Build command errors
# - Output directory not found
```

### SSR Not Working
- Verify `vercel.json` routes are correct
- Check serverless function logs
- Ensure `NODE_ENV=production`

### API Errors
- Check serverless function logs
- Verify API routes in `server/index.js`
- Test locally with `npm run dev`

### Performance Issues
- Vercel has cold start times for serverless functions
- Consider using Vercel Pro for better performance
- Optimize your React bundle size

## 🔄 Continuous Deployment

Vercel automatically deploys on:

- **Push to main branch**: Production deployment
- **Push to other branches**: Preview deployment
- **Pull requests**: Preview deployment

## 📊 Monitoring

- **Vercel Dashboard**: View deployments, logs, and analytics
- **Function Logs**: Monitor serverless function performance
- **Analytics**: Track page views and performance

## 🚀 Advanced Configuration

### Custom Domains
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain

### Environment Variables
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add your variables

### Edge Functions (Optional)
For better performance, you can convert to Edge Functions:

```json
{
  "functions": {
    "server/index.js": {
      "runtime": "@vercel/edge"
    }
  }
}
```

## 🎉 Success!

After deployment, your app will have:

- ✅ **Full SSR** for all routes
- ✅ **API endpoints** working
- ✅ **Client-side routing** with hydration
- ✅ **Automatic deployments** on git push
- ✅ **Global CDN** for fast loading
- ✅ **Serverless scaling** for your backend

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel SSR Guide](https://vercel.com/docs/concepts/functions/serverless-functions)
- [React SSR Best Practices](https://react.dev/reference/react-dom/server)

---

**Happy deploying to Vercel! 🚀**
