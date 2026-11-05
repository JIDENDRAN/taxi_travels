# taxi_travels

Full-stack web application for **Madurai Best Taxi Travels**.

- **Frontend (`best-fe`)**: React 19, Vite, Tailwind CSS v4, Framer Motion
- **Backend (`best-be`)**: Node.js, Express, Neon PostgreSQL, Baileys WhatsApp bot

---

## Deployment Guide

### 1. Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import the repository: `JIDENDRAN/taxi_travels`.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `best-fe`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - **`VITE_API_URL`**: `https://<YOUR-RENDER-BACKEND-URL>.onrender.com` (from Step 2 below)
5. Click **Deploy**.

---

### 2. Deploy Backend on Render
1. Go to [render.com](https://render.com) and click **"New +" -> "Web Service"**.
2. Connect your GitHub repository: `JIDENDRAN/taxi_travels`.
3. Configure settings:
   - **Name**: `madurai-taxi-backend`
   - **Root Directory**: `best-be`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In **Environment Variables**, add:
   - **`DATABASE_URL`**: `postgresql://neondb_owner:npg_q9xsQlJyDN2r@ep-icy-fire-bdiuv4o4-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require`
   - **`PORT`**: `5000`
5. Click **Create Web Service**.
6. Once deployed, copy your Render URL (e.g. `https://madurai-taxi-backend.onrender.com`) and paste it as `VITE_API_URL` in Vercel.
