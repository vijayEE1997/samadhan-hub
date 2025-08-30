# 🚨 Production Troubleshooting Guide - Visitor Tracking

This guide helps you resolve issues when deploying the visitor tracking system to production environments, especially Vercel.

## 🔍 **Common Production Issues**

### 1. **Vercel Serverless Function Limitations**

**Problem**: Visitor tracking works locally but not on Vercel
**Cause**: Vercel's serverless functions have limitations:
- No persistent file system access
- Memory resets on cold starts
- Function timeout limits

**Solution**: Use the production-ready visitor tracker:
```javascript
// The system automatically detects Vercel environment
if (process.env.VERCEL === '1') {
  visitorTracker = new VisitorTrackerProduction();
} else {
  visitorTracker = new VisitorTracker();
}
```

### 2. **IP Address Detection Issues**

**Problem**: All visitors show as "unknown" IP
**Cause**: Production proxy configurations block real IP addresses

**Solution**: Enhanced IP detection in production:
```javascript
// Production IP detection with better proxy handling
let ip = req.headers['x-forwarded-for'] || 
         req.headers['x-real-ip'] || 
         req.headers['x-client-ip'] || 
         req.headers['cf-connecting-ip'] || // Cloudflare
         req.headers['x-forwarded'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress || 
         req.ip || 
         'unknown';
```

### 3. **Data Persistence Issues**

**Problem**: Visitor data resets every few minutes
**Cause**: Vercel cold starts reset in-memory data

**Solution**: Accept temporary data storage in production:
- Data resets on cold starts (normal for Vercel)
- Each function invocation tracks visitors independently
- Consider external database for persistent storage

## 🛠️ **Quick Fixes**

### **Fix 1: Environment Detection**
Ensure your server detects production environment:
```bash
# Set environment variables
export NODE_ENV=production
export VERCEL=1
```

### **Fix 2: Use Production Tracker**
The system automatically switches to production mode when:
- `process.env.VERCEL === '1'` (Vercel environment)
- `process.env.NODE_ENV === 'production'` (Production environment)

### **Fix 3: Check API Endpoints**
Test these endpoints to verify functionality:
```bash
# Test system status
curl https://samadhaanhub.co.in/api/visitors/status

# Test visitor count
curl https://samadhaanhub.co.in/api/visitors/count

# Test visit tracking
curl https://samadhaanhub.co.in/api/visitors/track
```

## 🔧 **Step-by-Step Resolution**

### **Step 1: Verify Environment Detection**
Check your server logs for:
```
🚀 Vercel environment detected - using in-memory storage
⚠️ Note: Data will reset on cold starts in production
```

### **Step 2: Test API Endpoints**
Use the test script:
```bash
# Test local
node test-visitor-tracking.js

# Test production
TEST_URL=https://samadhaanhub.co.in node test-visitor-tracking.js
```

### **Step 3: Check Demo Page**
Visit the production demo page:
- **Production**: `/visitor-demo` (automatically serves production version)
- **Local**: `/visitor-demo` (serves development version)

### **Step 4: Monitor Console Logs**
Look for these log messages:
```
📊 Production visitor tracking system initialized (Vercel/Production)
🆕 New visitor: [IP] (total unique: 1)
🔄 Returning visitor: [IP] (visit #2)
```

## 📊 **Expected Behavior in Production**

### **Vercel Environment**
- ✅ **Tracking Works**: Every visit is tracked
- ✅ **API Responses**: All endpoints return data
- ⚠️ **Data Persistence**: Resets on cold starts
- ✅ **IP Detection**: Enhanced proxy handling

### **Local Environment**
- ✅ **Tracking Works**: Every visit is tracked
- ✅ **Data Persistence**: Saves to local files
- ✅ **API Responses**: All endpoints return data
- ✅ **IP Detection**: Direct connection handling

## 🧪 **Testing Commands**

### **Test Local System**
```bash
cd samadhan
npm run server:dev
# In another terminal
node test-visitor-tracking.js
```

### **Test Production System**
```bash
# Test from any machine
curl https://samadhaanhub.co.in/api/visitors/status
curl https://samadhaanhub.co.in/api/visitors/count
curl https://samadhaanhub.co.in/api/visitors/track
```

### **Test Demo Page**
```bash
# Open in browser
https://samadhaanhub.co.in/visitor-demo
```

## 🚨 **Emergency Fixes**

### **If Nothing Works**
1. **Check Server Logs**: Look for error messages
2. **Verify Environment**: Ensure `VERCEL=1` is set
3. **Restart Function**: Trigger a new Vercel deployment
4. **Check Dependencies**: Ensure all modules are loaded

### **Fallback Mode**
The system includes fallback tracking:
```javascript
// Fallback to basic tracking if main system fails
visitorTracker = {
  trackVisit: (req) => ({ ip: 'unknown', error: 'Tracking system unavailable' }),
  getStats: () => ({ overall: { totalVisits: 0, uniqueVisitors: 0 }, error: 'Stats unavailable' }),
  // ... other methods
};
```

## 📱 **Production Demo Page Features**

The production demo page (`/visitor-demo`) automatically:
- Shows system status and configuration
- Displays environment information
- Handles Vercel limitations gracefully
- Provides real-time visitor statistics

## 🔍 **Debugging Tools**

### **System Status Endpoint**
```bash
GET /api/visitors/status
```
Returns:
- Environment (production/development)
- Platform (vercel/local)
- Storage type
- Data persistence status
- Current visitor count

### **Console Logging**
Enable detailed logging by checking:
- Server startup messages
- Visitor tracking logs
- Error messages
- Environment detection

## 📋 **Checklist for Production**

- [ ] Environment variables set correctly
- [ ] Production tracker initialized
- [ ] API endpoints responding
- [ ] Demo page accessible
- [ ] Console logs showing activity
- [ ] IP addresses being detected
- [ ] Visit tracking working
- [ ] Statistics being calculated

## 🆘 **Still Having Issues?**

### **Check These Common Problems**
1. **CORS Issues**: Ensure CORS is configured for production domain
2. **Rate Limiting**: Check if requests are being blocked
3. **Function Timeout**: Ensure functions complete within Vercel limits
4. **Memory Limits**: Check for memory overflow errors

### **Get Help**
1. Check server console logs
2. Test individual API endpoints
3. Verify environment configuration
4. Use the test script to isolate issues

---

**Remember**: In production (especially Vercel), visitor data will reset on cold starts. This is normal behavior for serverless environments. The tracking system is fully functional - it just doesn't persist data between function invocations.
