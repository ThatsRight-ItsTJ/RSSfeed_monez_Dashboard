# RSS Feed Monetization Dashboard

A modern React dashboard for managing and monitoring your RSS Feed Monetization system. This dashboard provides a clean interface to manage RSS feeds, monitor system performance, and add new feeds to your monetization platform.

## 🚀 Features

- **Feed Management**: View, test, and delete RSS feeds
- **Add New Feeds**: Easy form to add new RSS feeds with Discord webhook integration
- **System Monitoring**: Real-time stats and system performance metrics
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Built with React, Tailwind CSS, and Recharts

## 📋 Prerequisites

Before deploying, ensure you have:
- A [Vercel account](https://vercel.com) (free)
- Your RSS Feed Monetization API deployed on [Railway](https://railway.app)
- Git repository access to this dashboard

## 🌐 Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Fork or Clone this Repository**
   ```bash
   git clone https://github.com/ThatsRight-ItsTJ/RSSfeed_monez_Dashboard.git
   cd RSSfeed_monez_Dashboard
   ```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In the Vercel deployment settings, add this environment variable:
   ```
   VITE_API_BASE=https://your-railway-app.railway.app
   ```
   Replace `your-railway-app` with your actual Railway app name.

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your dashboard
   - You'll get a live URL like `https://your-dashboard.vercel.app`

### Method 2: Deploy via Vercel CLI

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

4. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_BASE
   # Enter: https://your-railway-app.railway.app
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

## 🚄 Connect to Railway RSS API

### Step 1: Get Your Railway API URL

1. Go to your [Railway dashboard](https://railway.app)
2. Find your RSS Feed Monetization project
3. Click on your service
4. Copy the public domain (e.g., `https://rssfeed-monez-production.up.railway.app`)

### Step 2: Update Environment Variable

In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Update `VITE_API_BASE` with your Railway URL
4. Redeploy the project

### Step 3: Verify API Endpoints

Your Railway API should have these endpoints available:
- `GET /api/feeds` - List all feeds
- `POST /api/feeds` - Create new feed
- `DELETE /api/feeds/:id` - Delete feed
- `GET /api/test-feed/:id` - Test feed
- `GET /stats` - System statistics

## 🔧 Local Development

If you want to run the dashboard locally:

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

3. **Update .env**
   ```env
   VITE_API_BASE=https://your-railway-app.railway.app
   ```

4. **Start Development Server**
   ```bash
   pnpm run dev
   ```

5. **Build for Production**
   ```bash
   pnpm run build
   ```

## 📡 API Integration

The dashboard integrates with your RSS Feed Monetization API through these services:

### Feed Management
- View all configured RSS feeds
- Add new feeds with validation
- Delete unwanted feeds
- Test feed functionality

### System Monitoring
- Real-time system statistics
- Processing metrics
- Cache management
- Rate limit monitoring

## 🛠️ Troubleshooting

### Build Errors
If you encounter build errors:
```bash
pnpm install
pnpm run build
```

### API Connection Issues
1. Verify your Railway API is running
2. Check the `VITE_API_BASE` environment variable
3. Ensure CORS is configured on your Railway API
4. Test API endpoints directly in browser/Postman

### Environment Variable Issues
- Environment variables in Vercel must start with `VITE_`
- Redeploy after changing environment variables
- Check Vercel deployment logs for errors

## 📚 Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Deployment**: Vercel
- **Backend**: Node.js on Railway

## 🤝 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify Railway API is accessible
3. Test API endpoints independently
4. Check browser console for errors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**🎉 Your RSS Feed Monetization Dashboard is ready to deploy!**

After deployment, you'll have a professional interface to manage your RSS feeds and monitor your monetization system performance.