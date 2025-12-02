# ExcelWASSCE Frontend

A modern React application for WASSCE exam preparation built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Deployment to Vercel

### Prerequisites
- Node.js 18+ installed
- Vercel account
- Backend API deployed and accessible

### Quick Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Setup

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `wacefront` folder as the root directory

2. **Configure Build Settings**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`

3. **Environment Variables**
   Set these in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-domain.com/api
   VITE_APP_NAME=ExcelWASSCE
   VITE_APP_VERSION=1.0.0
   ```

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
wacefront/
├── client/           # React application source
├── public/           # Static assets
├── shared/           # Shared utilities and API
├── dist/             # Build output
├── vercel.json       # Vercel configuration
└── package.json      # Dependencies and scripts
```

## 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `.env.production` - Production environment variables

## 🌐 Features

- **Mobile Responsive** - Works on all devices
- **Modern UI** - Built with Tailwind CSS and Radix UI
- **Type Safe** - Full TypeScript support
- **Fast Loading** - Optimized with Vite
- **SEO Friendly** - Proper meta tags and routing

## 📱 Pages

- Home/Landing page
- About Us
- Programs/Courses
- Login/Signup
- Dashboard (Protected)
- Past Questions (Protected)
- Contact

## 🔐 Authentication

The app uses session-based authentication with the Django backend. Protected routes automatically redirect to login when not authenticated.

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Framer Motion** for animations

## 📦 Build Output

The build process creates:
- `dist/spa/` - Static files for Vercel
- Optimized assets with code splitting
- Compressed images and fonts

## 🚨 Important Notes

1. **Backend URL**: Update `VITE_API_URL` to your deployed backend
2. **CORS**: Ensure backend allows your Vercel domain
3. **Images**: All images are in `public/images/` folder
4. **Routing**: Uses React Router with SPA fallback

## 📞 Support

For deployment issues, check:
- Vercel build logs
- Environment variables are set correctly
- Backend API is accessible from Vercel
- CORS configuration includes your domain