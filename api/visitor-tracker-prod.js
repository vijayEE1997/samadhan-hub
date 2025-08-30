const fs = require('fs');
const path = require('path');

class VisitorTrackerProduction {
  constructor() {
    this.isVercel = process.env.VERCEL === '1';
    this.isProduction = process.env.NODE_ENV === 'production';
    
    // Use in-memory storage for Vercel (resets on each cold start)
    this.visitors = new Map();
    this.stats = {
      totalVisits: 0,
      uniqueVisitors: 0,
      lastReset: new Date().toISOString()
    };
    
    // Only try file operations if not on Vercel
    if (!this.isVercel) {
      this.dataFile = path.join(__dirname, 'data', 'visitors.json');
      this.loadData();
      this.setupAutoSave();
    } else {
      console.log('🚀 Vercel environment detected - using in-memory storage');
      console.log('⚠️ Note: Data will reset on cold starts in production');
    }
  }

  // Load existing visitor data from file (only for non-Vercel)
  loadData() {
    if (this.isVercel) return;
    
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
        this.visitors = new Map(data.visitors || []);
        this.stats = data.stats || this.stats;
        console.log(`📊 Loaded ${this.visitors.size} existing visitors from storage`);
      } else {
        // Create data directory if it doesn't exist
        const dataDir = path.dirname(this.dataFile);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        this.saveData();
        console.log('📊 Created new visitor tracking storage');
      }
    } catch (error) {
      console.error('❌ Error loading visitor data:', error);
      this.visitors = new Map();
    }
  }

  // Save visitor data to file (only for non-Vercel)
  saveData() {
    if (this.isVercel) return;
    
    try {
      const data = {
        visitors: Array.from(this.visitors.entries()),
        stats: this.stats,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('❌ Error saving visitor data:', error);
    }
  }

  // Setup auto-save every 5 minutes (only for non-Vercel)
  setupAutoSave() {
    if (this.isVercel) return;
    
    setInterval(() => {
      this.saveData();
    }, 5 * 60 * 1000); // 5 minutes
  }

  // Enhanced IP detection for production environments
  getClientIP(req) {
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
    
    // If x-forwarded-for contains multiple IPs, take the first one
    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    
    // Clean up IP address
    if (ip && ip.startsWith('::ffff:')) {
      ip = ip.substring(7); // Remove IPv6 prefix
    }
    
    // Validate IP format
    if (ip === 'unknown' || !ip || ip === '::1' || ip === 'localhost') {
      // Fallback to a generated ID for local/unknown IPs
      ip = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    return ip;
  }

  // Track a new visit with enhanced production handling
  trackVisit(req) {
    const ip = this.getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'unknown';
    const referer = req.headers['referer'] || 'direct';
    const timestamp = new Date().toISOString();
    
    // Get additional request info
    const visitData = {
      ip,
      userAgent,
      referer,
      timestamp,
      path: req.path,
      method: req.method,
      headers: {
        'accept-language': req.headers['accept-language'],
        'accept-encoding': req.headers['accept-encoding'],
        'cache-control': req.headers['cache-control'],
        'host': req.headers['host'],
        'origin': req.headers['origin']
      },
      // Production-specific data
      environment: this.isProduction ? 'production' : 'development',
      platform: this.isVercel ? 'vercel' : 'local',
      timestamp: timestamp
    };

    // Check if this IP has visited before
    if (this.visitors.has(ip)) {
      const existingVisitor = this.visitors.get(ip);
      existingVisitor.visits.push(visitData);
      existingVisitor.lastVisit = timestamp;
      existingVisitor.totalVisits = existingVisitor.visits.length;
      
      console.log(`🔄 Returning visitor: ${ip} (visit #${existingVisitor.totalVisits})`);
    } else {
      // New visitor
      const newVisitor = {
        ip,
        firstVisit: timestamp,
        lastVisit: timestamp,
        visits: [visitData],
        totalVisits: 1
      };
      
      this.visitors.set(ip, newVisitor);
      this.stats.uniqueVisitors = this.visitors.size;
      
      console.log(`🆕 New visitor: ${ip} (total unique: ${this.stats.uniqueVisitors})`);
    }

    this.stats.totalVisits++;
    
    // Auto-save after each visit (only for non-Vercel)
    if (!this.isVercel) {
      this.saveData();
    }
    
    return {
      ip,
      isNewVisitor: !this.visitors.has(ip) || this.visitors.get(ip).totalVisits === 1,
      visitCount: this.visitors.get(ip).totalVisits,
      totalUniqueVisitors: this.stats.uniqueVisitors,
      totalVisits: this.stats.totalVisits,
      environment: this.isProduction ? 'production' : 'development',
      platform: this.isVercel ? 'vercel' : 'local'
    };
  }

  // Get visitor statistics with production context
  getStats() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Calculate today's visits
    let todayVisits = 0;
    let todayUniqueVisitors = 0;
    const todayVisitors = new Set();
    
    for (const [ip, visitor] of this.visitors) {
      const todayVisitorVisits = visitor.visits.filter(visit => {
        const visitDate = new Date(visit.timestamp);
        return visitDate >= today;
      });
      
      if (todayVisitorVisits.length > 0) {
        todayVisits += todayVisitorVisits.length;
        todayUniqueVisitors++;
        todayVisitors.add(ip);
      }
    }

    // Get recent activity (last 24 hours)
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    let last24HoursVisits = 0;
    let last24HoursUniqueVisitors = new Set();
    
    for (const [ip, visitor] of this.visitors) {
      const recentVisits = visitor.visits.filter(visit => {
        const visitDate = new Date(visit.timestamp);
        return visitDate >= last24Hours;
      });
      
      if (recentVisits.length > 0) {
        last24HoursVisits += recentVisits.length;
        last24HoursUniqueVisitors.add(ip);
      }
    }

    return {
      overall: {
        totalVisits: this.stats.totalVisits,
        uniqueVisitors: this.stats.uniqueVisitors,
        lastReset: this.stats.lastReset
      },
      today: {
        visits: todayVisits,
        uniqueVisitors: todayUniqueVisitors
      },
      last24Hours: {
        visits: last24HoursVisits,
        uniqueVisitors: last24HoursUniqueVisitors.size
      },
      lastUpdated: new Date().toISOString(),
      environment: this.isProduction ? 'production' : 'development',
      platform: this.isVercel ? 'vercel' : 'local',
      storageType: this.isVercel ? 'in-memory (resets on cold start)' : 'file-based (persistent)'
    };
  }

  // Get detailed visitor information
  getVisitors(limit = 50, offset = 0) {
    const visitorsArray = Array.from(this.visitors.entries())
      .map(([ip, visitor]) => ({
        ip,
        firstVisit: visitor.firstVisit,
        lastVisit: visitor.lastVisit,
        totalVisits: visitor.totalVisits,
        recentVisits: visitor.visits.slice(-5) // Last 5 visits
      }))
      .sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit))
      .slice(offset, offset + limit);

    return {
      visitors: visitorsArray,
      pagination: {
        limit,
        offset,
        total: this.visitors.size,
        hasMore: offset + limit < this.visitors.size
      },
      environment: this.isProduction ? 'production' : 'development',
      platform: this.isVercel ? 'vercel' : 'local'
    };
  }

  // Reset all data
  resetData() {
    this.visitors.clear();
    this.stats = {
      totalVisits: 0,
      uniqueVisitors: 0,
      lastReset: new Date().toISOString()
    };
    
    if (!this.isVercel) {
      this.saveData();
    }
    
    console.log('🔄 Visitor tracking data reset');
  }

  // Get data file path for external access
  getDataFilePath() {
    if (this.isVercel) {
      return 'Not available in Vercel environment (in-memory storage)';
    }
    return this.dataFile;
  }

  // Get system status and configuration
  getSystemStatus() {
    return {
      environment: this.isProduction ? 'production' : 'development',
      platform: this.isVercel ? 'vercel' : 'local',
      storageType: this.isVercel ? 'in-memory' : 'file-based',
      dataPersistence: this.isVercel ? 'temporary (resets on cold start)' : 'persistent',
      visitorCount: this.visitors.size,
      totalVisits: this.stats.totalVisits,
      lastReset: this.stats.lastReset,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = VisitorTrackerProduction;
