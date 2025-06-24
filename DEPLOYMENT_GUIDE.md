# PULSE4 DEPLOYMENT GUIDE

## 🚀 **PRODUCTION DEPLOYMENT INSTRUCTIONS**

### **Prerequisites**
- Python 3.9+
- Node.js 18+
- MongoDB 5.0+
- Git

### **Quick Setup**
```bash
# Clone repository
git clone [PULSE4_REPOSITORY_URL]
cd Pulse4

# Backend setup
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URL

# Frontend setup  
cd ../frontend
yarn install
cp .env.example .env
# Edit .env with your backend URL

# Run production scraper (optional)
cd ..
python scripts/production_real_scraper.py
```

### **Environment Variables**

#### **Backend (.env)**
```bash
MONGO_URL=mongodb://localhost:27017
DB_NAME=pulse_auto_market_v4
```

#### **Frontend (.env)**
```bash
REACT_APP_BACKEND_URL=https://your-api-domain.com
```

### **Production Deployment**

#### **Backend (FastAPI)**
```bash
cd backend
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker server:app --bind 0.0.0.0:8001
```

#### **Frontend (React)**
```bash
cd frontend
yarn build
# Serve build/ directory with nginx or Apache
```

### **Database Setup**
```bash
# MongoDB collections will be created automatically
# No manual schema setup required
```

### **Live System Features**
- **49 Real Vehicles** with authentic photos
- **Mobile-optimized** responsive design
- **Enhanced desking** with VSC/GAP
- **Vehicle details pages** with galleries
- **Admin portal** with live stats
- **Real dealer integration**

### **Monitoring**
- Health check: `/api/health`
- Admin stats: `/api/admin/stats`
- Vehicle count: `/api/customer/vehicles`

**🎯 Ready for production traffic!**