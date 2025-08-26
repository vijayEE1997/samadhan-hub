# 🚀 Samadhan Hub - Agnivirya Ancient Modern Wellness

A modern full-stack wellness platform built with React (frontend) and Node.js/Express (backend) that can be run with a single command. **Now with Server-Side Rendering (SSR) enabled for all routes!**

**Production Domain**: [samadhanhub.com](https://samadhanhub.com)

## ✨ Features

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + SSR Support
- **API**: RESTful endpoints with user management
- **Development**: Hot reload for both frontend and backend
- **Production**: Full server-side rendering
- **Routing**: Client-side routing with SSR support
- **Unified Scripts**: Run everything with one command
- **🚀 Vercel Ready**: Optimized for Vercel deployment

## 🆕 SSR Features

- **Universal Rendering**: All routes are server-side rendered
- **SEO Optimized**: Better search engine visibility
- **Performance**: Faster initial page loads
- **Hydration**: Seamless client-side takeover
- **Route Support**: `/`, `/about`, `/contact`, and dynamic routes

## 🏗️ Project Structure

```
samadhan/
├── client-agnivirya/       # React frontend (Agnivirya Wellness Platform)
│   ├── src/
│   │   ├── App.tsx        # Main application component with routing
│   │   ├── App.css        # Application styles
│   │   ├── main.tsx       # Client entry point with hydration
│   │   ├── entry-server.tsx # SSR entry point
│   │   ├── index.css      # Base styles with Agnivirya Design System
│   │   └── components/    # Agnivirya wellness components
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration with SSR
│   └── tsconfig.json      # TypeScript configuration
├── server/                 # Node.js backend
│   ├── index.js           # Express server with SSR
│   ├── package.json       # Backend dependencies
│   └── .env.dev           # Development environment variables
├── package.json            # Root package.json with unified scripts
├── vercel.json            # Vercel deployment configuration
├── README.md              # This file
└── VERCEL_DEPLOYMENT.md   # Detailed Vercel deployment guide
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd samadhan
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

That's it! 🎉 Both frontend and backend will start automatically with SSR support.

## 🌐 Available Routes

| Route | Description | SSR Status |
|-------|-------------|------------|
| `/` | Home page with user management | ✅ SSR Enabled |
| `/about` | About page with features | ✅ SSR Enabled |
| `/contact` | Contact form | ✅ SSR Enabled |
| `/api/*` | Backend API endpoints | 🔌 API Only |
| `/*` | 404 page for unknown routes | ✅ SSR Enabled |

## 📱 Available Scripts

### Root Level Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run build` | Build the React app for production |
| `npm run start` | Start the production server with SSR |
| `npm run install:all` | Install dependencies for all packages |
| `npm run setup` | Complete setup (install + build) |
| `npm run ssr:build` | Build and start production with SSR |
| `npm run vercel-build` | Build optimized for Vercel deployment |
| `npm run vercel-dev` | Vercel-compatible development mode |

### Frontend Scripts (client-agnivirya/)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (port 3000) |
| `npm run build` | Build for production with SSR support |
| `npm run preview` | Preview production build |

### Backend Scripts (server/)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm run start` | Start production server with SSR |

## 🌐 Development URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **SSR Routes**: http://localhost:5000/* (all routes)
- **Health Check**: http://localhost:5000/api/health

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create new user |

## 🚀 Vercel Deployment

This project is **fully optimized for Vercel deployment** with SSR support!

### Quick Deploy to Vercel

1. **Push your code to GitHub**
2. **Go to [vercel.com](https://vercel.com)**
3. **Import your repository**
4. **Configure:**
   - Build Command: `npm run vercel-build`
   - Output Directory: `client/dist`
   - Install Command: `npm run install:all`

### Vercel Features

- ✅ **Serverless Functions** for API and SSR
- ✅ **Static Builds** for React app
- ✅ **Automatic Deployments** on git push
- ✅ **Global CDN** for fast loading
- ✅ **Edge Functions** support (optional)

📖 **See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.**

## 🎯 Features

### Frontend
- Modern React with TypeScript
- Client-side routing with history API
- Responsive design with CSS Grid/Flexbox
- User management interface
- Real-time API integration
- Beautiful UI with gradients and animations
- **SSR hydration support**

### Backend
- Express.js server with middleware
- **Server-side rendering for all routes**
- CORS enabled for development
- Security headers with Helmet
- Request logging with Morgan
- Error handling and validation
- **Universal route handling**
- **Vercel serverless compatibility**

## 🚀 Production Deployment with SSR

### Local Production
1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start production server with SSR:**
   ```bash
   npm run start
   ```

### Vercel Production (Recommended)
1. **Push to GitHub**
2. **Vercel automatically deploys**
3. **SSR works out of the box**

## 🔧 Configuration

### Frontend (Vite)
- Port: 3000
- API proxy to backend: 5000
- Hot module replacement enabled
- **SSR build configuration**
- **Code splitting optimization**
- **Vercel build optimization**

### Backend (Express)
- Port: 5000 (configurable via env)
- CORS enabled for development
- **SSR rendering for all routes**
- **Universal route handling**
- **Vercel serverless compatibility**

## 🛠️ Customization

### Adding New Routes
1. Add route case in `client/src/App.tsx` renderRouteContent function
2. Add navigation button in the nav section
3. The route will automatically be SSR-enabled

### Adding New API Endpoints
1. Add routes in `server/index.js`
2. Create corresponding frontend components
3. Update the API service layer

### Styling
- Modify `client/src/App.css` for component styles
- Update `client/src/index.css` for global styles
- Use CSS custom properties for theming

## 📚 Technologies Used

- **Frontend**: React 18, TypeScript, Vite, CSS3
- **Backend**: Node.js, Express, CORS, Helmet, Morgan
- **SSR**: ReactDOM Server, Universal Rendering
- **Development**: Nodemon, Concurrently
- **Build**: Vite, TypeScript compiler
- **Routing**: Client-side routing with SSR support
- **Deployment**: Vercel, Serverless Functions

## 🔍 How SSR Works

1. **Server Request**: User visits any route
2. **Server Rendering**: Express server renders React app server-side
3. **HTML Response**: Server sends complete HTML with initial state
4. **Client Hydration**: React hydrates the server-rendered HTML
5. **Interactive App**: App becomes fully interactive client-side

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run dev`
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own applications!

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
- Frontend: Change port in `client/vite.config.ts`
- Backend: Change PORT in `server/.env`

**Dependencies not found:**
```bash
npm run install:all
```

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

**SSR not working:**
- Check if backend is running on port 5000
- Verify NODE_ENV is set correctly
- Check server console for SSR errors

**Vercel deployment issues:**
- Check build logs in Vercel dashboard
- Verify `vercel.json` configuration
- Ensure build command is correct

**API connection issues:**
- Check if backend is running on port 5000
- Verify CORS settings in server
- Check browser console for errors

**Route not found:**
- All routes are handled by the server
- Check server logs for routing errors
- Verify the route is defined in App.tsx

---

**Happy coding with SSR and Vercel! 🚀**
