# 📊 Visitor Tracking System - Samadhan Hub

A comprehensive IP-based visitor tracking system that automatically tracks unique visitors and provides detailed analytics.

## 🚀 Features

- **Automatic Tracking**: Every page visit is automatically tracked without manual intervention
- **IP-based Uniqueness**: Tracks unique visitors based on IP addresses
- **Real-time Analytics**: Provides live visitor counts and statistics
- **Persistent Storage**: Data is automatically saved to JSON files
- **Comprehensive API**: Multiple endpoints for different use cases
- **Admin Controls**: Ability to reset data and view detailed information

## 🔧 How It Works

1. **Automatic Tracking**: The system automatically tracks every request to your website
2. **IP Detection**: Extracts IP addresses from various headers (x-forwarded-for, x-real-ip, etc.)
3. **Unique Counting**: Counts unique visitors based on IP addresses
4. **Data Storage**: Saves visitor data to `api/data/visitors.json`
5. **Auto-save**: Data is automatically saved every 5 minutes and after each visit

## 📡 API Endpoints

### 1. Get Visitor Count
```
GET /api/visitors/count
```
Returns basic visitor statistics including unique visitors and total visits.

**Response:**
```json
{
  "success": true,
  "message": "Unique visitor count retrieved successfully",
  "data": {
    "uniqueVisitors": 150,
    "totalVisits": 450,
    "todayUniqueVisitors": 25,
    "last24HoursUniqueVisitors": 30
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "server": "unified-server"
}
```

### 2. Get Detailed Statistics
```
GET /api/visitors/stats
```
Returns comprehensive visitor statistics including today's data and last 24 hours.

**Response:**
```json
{
  "success": true,
  "message": "Visitor statistics retrieved successfully",
  "data": {
    "overall": {
      "totalVisits": 450,
      "uniqueVisitors": 150,
      "lastReset": "2024-01-01T00:00:00.000Z"
    },
    "today": {
      "visits": 45,
      "uniqueVisitors": 25
    },
    "last24Hours": {
      "visits": 67,
      "uniqueVisitors": 30
    },
    "lastUpdated": "2024-01-15T10:30:00.000Z"
  }
}
```

### 3. Get Visitor List
```
GET /api/visitors/list?limit=50&offset=0
```
Returns a paginated list of visitors with detailed information.

**Parameters:**
- `limit`: Number of visitors to return (max 100)
- `offset`: Number of visitors to skip

**Response:**
```json
{
  "success": true,
  "message": "Visitor list retrieved successfully",
  "data": {
    "visitors": [
      {
        "ip": "192.168.1.1",
        "firstVisit": "2024-01-15T08:00:00.000Z",
        "lastVisit": "2024-01-15T10:30:00.000Z",
        "totalVisits": 5,
        "recentVisits": [...]
      }
    ],
    "pagination": {
      "limit": 50,
      "offset": 0,
      "total": 150,
      "hasMore": true
    }
  }
}
```

### 4. Manual Visit Tracking
```
GET /api/visitors/track
```
Manually track a visit (though visits are tracked automatically).

### 5. Reset Data
```
POST /api/visitors/reset
```
⚠️ **Dangerous**: Resets all visitor tracking data. Use with caution!

### 6. Get Data File Info
```
GET /api/visitors/data-file
```
Returns information about the data storage file.

## 🎯 Demo Page

Visit `/visitor-demo` to see a live demonstration of the visitor tracking system.

The demo page includes:
- Real-time visitor statistics
- Interactive API testing
- Auto-refresh functionality
- Beautiful UI with responsive design

## 🔍 Data Structure

Visitor data is stored in the following format:

```json
{
  "visitors": [
    [
      "192.168.1.1",
      {
        "ip": "192.168.1.1",
        "firstVisit": "2024-01-15T08:00:00.000Z",
        "lastVisit": "2024-01-15T10:30:00.000Z",
        "visits": [
          {
            "ip": "192.168.1.1",
            "userAgent": "Mozilla/5.0...",
            "referer": "https://google.com",
            "timestamp": "2024-01-15T10:30:00.000Z",
            "path": "/",
            "method": "GET",
            "headers": {
              "accept-language": "en-US,en;q=0.9",
              "accept-encoding": "gzip, deflate",
              "cache-control": "max-age=0"
            }
          }
        ],
        "totalVisits": 5
      }
    ]
  ],
  "stats": {
    "totalVisits": 450,
    "uniqueVisitors": 150,
    "lastReset": "2024-01-01T00:00:00.000Z"
  },
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

## 🛡️ Security Features

- **Rate Limiting**: Integrated with your existing rate limiting system
- **CORS Support**: Proper CORS headers for cross-origin requests
- **Input Validation**: Parameter validation for all endpoints
- **Error Handling**: Comprehensive error handling and logging

## 📱 Integration Examples

### Frontend Integration

```javascript
// Get visitor count
async function getVisitorCount() {
  try {
    const response = await fetch('/api/visitors/count');
    const data = await response.json();
    
    if (data.success) {
      console.log(`Unique visitors: ${data.data.uniqueVisitors}`);
      console.log(`Total visits: ${data.data.totalVisits}`);
    }
  } catch (error) {
    console.error('Error fetching visitor count:', error);
  }
}

// Get detailed stats
async function getVisitorStats() {
  try {
    const response = await fetch('/api/visitors/stats');
    const data = await response.json();
    
    if (data.success) {
      console.log(`Today's visitors: ${data.data.today.uniqueVisitors}`);
      console.log(`Last 24 hours: ${data.data.last24Hours.uniqueVisitors}`);
    }
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
  }
}
```

### Backend Integration

```javascript
// The system automatically tracks all requests
// No additional code needed for basic tracking

// If you need to access visitor data in your routes:
app.get('/my-route', (req, res) => {
  const stats = visitorTracker.getStats();
  const visitorCount = stats.overall.uniqueVisitors;
  
  res.json({
    message: `Welcome! You are visitor #${visitorCount}`,
    stats: stats
  });
});
```

## 🔧 Configuration

The visitor tracking system works out of the box with default settings. Data is automatically stored in:

```
api/data/visitors.json
```

### Environment Variables

No additional environment variables are required. The system uses your existing server configuration.

## 📊 Monitoring and Logging

The system provides comprehensive logging:

- **Visit Tracking**: Logs each new and returning visitor
- **Error Handling**: Logs any tracking errors without blocking requests
- **Data Operations**: Logs data loading, saving, and reset operations

### Console Output Examples

```
📊 Visitor tracking system initialized
📊 Loaded 150 existing visitors from storage
🆕 New visitor: 192.168.1.100 (total unique: 151)
🔄 Returning visitor: 192.168.1.1 (visit #6)
```

## 🚀 Getting Started

1. **Automatic Setup**: The system is automatically initialized when your server starts
2. **No Configuration**: Works out of the box with default settings
3. **Immediate Tracking**: Starts tracking visitors from the first request
4. **Demo Page**: Visit `/visitor-demo` to see it in action

## 🔍 Troubleshooting

### Common Issues

1. **Data not persisting**: Check if the `api/data` directory exists and is writable
2. **IP addresses showing as 'unknown'**: Check your proxy configuration and headers
3. **High memory usage**: The system stores visitor data in memory for performance

### Debug Mode

Enable debug logging by checking the console output. The system logs all major operations.

## 📈 Performance Considerations

- **Memory Usage**: Visitor data is stored in memory for fast access
- **Auto-save**: Data is saved every 5 minutes to prevent data loss
- **Asynchronous Tracking**: Visit tracking doesn't block request processing
- **Efficient Storage**: Uses Map data structure for O(1) lookups

## 🔮 Future Enhancements

Potential improvements for future versions:

- **Database Integration**: Support for MongoDB, PostgreSQL, etc.
- **Advanced Analytics**: Geographic data, device detection, etc.
- **Real-time Updates**: WebSocket support for live updates
- **Export Features**: CSV/Excel export of visitor data
- **Privacy Controls**: GDPR compliance features

## 📞 Support

For issues or questions about the visitor tracking system:

1. Check the console logs for error messages
2. Verify the data file exists and is writable
3. Test the API endpoints manually
4. Check the demo page for functionality

---

**Note**: This system tracks visitors based on IP addresses. In production environments with shared IPs (corporate networks, mobile carriers), multiple users might appear as a single visitor.
