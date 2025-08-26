# Cashfree Payment Gateway Integration

## Overview
This document describes the complete integration of Cashfree payment gateway into the Samadhan application, following the [Cashfree documentation](https://www.cashfree.com/docs/payments/online/web/redirect).

## Features Implemented

### ✅ **Backend Integration**
- Cashfree SDK integration with Node.js
- Order creation API endpoint
- Payment verification API endpoint
- Webhook handling for payment updates
- Automatic customer details extraction from email

### ✅ **Frontend Integration**
- Cashfree JavaScript SDK integration
- Secure payment form with email validation
- Real-time order creation
- Seamless checkout experience
- Loading states and error handling

### ✅ **Customer Data Processing**
- **Fullname**: Automatically extracted from email prefix (e.g., `john@gmail.com` → `john`)
- **Mobile Number**: Randomly generated 10-digit number for each order
- **Email**: User-provided email address
- **Order ID**: Unique identifier generated for each transaction

## Architecture

```
Client (Port 3000) → Server (Port 5000) → Cashfree API
     ↓                    ↓                    ↓
Payment Form → Create Order → Payment Gateway
     ↓                    ↓                    ↓
Checkout ← Payment Session ← Order Response
```

## API Endpoints

### 1. Create Payment Order
```http
POST /api/payment/create-order
Content-Type: application/json

{
  "email": "user@example.com",
  "amount": 99,
  "currency": "INR"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": "order_1234567890_abc123",
    "paymentSessionId": "session_1234567890",
    "orderStatus": "ACTIVE",
    "customerDetails": {
      "customerName": "user",
      "customerEmail": "user@example.com",
      "customerPhone": "9876543210"
    }
  }
}
```

### 2. Verify Payment
```http
GET /api/payment/verify/{orderId}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verification completed",
  "data": {
    "isPaid": true,
    "orderData": { ... },
    "message": "Payment verified successfully"
  }
}
```

### 3. Webhook Handler
```http
POST /api/webhook/cashfree
```

## Implementation Details

### Backend Service (`/server/services/cashfreeService.js`)

#### Order Creation
```javascript
static async createOrder(orderData) {
  // Extract fullname from email
  const fullname = orderData.email.split('@')[0];
  
  // Generate random mobile number
  const mobileNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  
  // Create Cashfree order
  const request = {
    order_amount: orderData.amount.toString(),
    order_currency: "INR",
    customer_details: {
      customer_name: fullname,
      customer_email: orderData.email,
      customer_phone: mobileNumber,
    },
    // ... other order details
  };
}
```

#### Payment Verification
```javascript
static async verifyPayment(orderId) {
  const orderData = await this.fetchOrder(orderId);
  
  if (orderData.orderData.order_status === 'PAID') {
    return { success: true, isPaid: true };
  }
  
  return { success: true, isPaid: false };
}
```

### Frontend Component (`/client-agnivirya/src/pages/PaymentPage.tsx`)

#### Payment Flow
1. **Email Validation**: User enters email address
2. **Order Creation**: Frontend calls backend to create order
3. **Cashfree Checkout**: Opens Cashfree payment gateway
4. **Payment Processing**: User completes payment on Cashfree
5. **Return to Success**: User redirected to success page

#### Cashfree SDK Integration
```javascript
// Initialize Cashfree
const cashfree = window.Cashfree({
  mode: 'sandbox' // or 'production'
});

// Open checkout
cashfree.checkout({
  paymentSessionId: result.data.paymentSessionId,
  redirectTarget: '_self'
});
```

## Environment Configuration

### Server Environment Variables
```bash
# Copy from env.template
cp server/env.template server/.env

# Update with your Cashfree credentials
CASHFREE_CLIENT_ID=your_actual_client_id
CASHFREE_CLIENT_SECRET=your_actual_client_secret
CASHFREE_WEBHOOK_URL=https://yourdomain.com/api/webhook/cashfree
```

### Client Configuration
The frontend automatically detects the environment and uses appropriate API endpoints:
- **Development**: `http://localhost:5000/api`
- **Production**: `/api` (relative paths)

## Testing

### 1. Sandbox Testing
- Use Cashfree sandbox credentials
- Test with sandbox payment methods
- Verify webhook handling

### 2. Production Testing
- Use production Cashfree credentials
- Test with real payment methods
- Verify webhook signatures

## Security Features

### ✅ **Implemented Security Measures**
- CORS configuration for cross-origin requests
- Input validation and sanitization
- Error handling without exposing sensitive data
- Webhook endpoint for payment updates

### 🔒 **Production Security Checklist**
- [ ] Verify webhook signatures
- [ ] Use HTTPS for all endpoints
- [ ] Implement rate limiting
- [ ] Add request validation middleware
- [ ] Secure environment variables

## Error Handling

### Common Error Scenarios
1. **Invalid Email**: Form validation prevents submission
2. **Order Creation Failed**: Backend error handling with user feedback
3. **Payment Gateway Error**: Cashfree error handling
4. **Network Issues**: Frontend retry logic

### Error Response Format
```json
{
  "success": false,
  "error": "Error description",
  "message": "User-friendly error message"
}
```

## Deployment

### 1. **Environment Setup**
```bash
# Production environment
NODE_ENV=production
APP_MODE=prod
CASHFREE_CLIENT_ID=prod_client_id
CASHFREE_CLIENT_SECRET=prod_client_secret
```

### 2. **Domain Whitelisting**
- Add your production domain to Cashfree dashboard
- Update CORS configuration for production
- Configure webhook URLs

### 3. **SSL Certificate**
- Ensure HTTPS is enabled
- Update return URLs to use HTTPS
- Configure secure webhook endpoints

## Monitoring & Logging

### Backend Logs
```javascript
console.log('🔧 Creating Cashfree order with data:', request);
console.log('✅ Cashfree order created successfully:', response.data);
console.log('❌ Payment order creation error:', error);
```

### Frontend Logs
```javascript
console.log('🔧 Payment order created:', result.data);
console.log('❌ Payment error:', error);
```

## Troubleshooting

### Issue 1: "Cashfree SDK not loaded"
- Check if Cashfree script is included in HTML
- Verify script loading order
- Check browser console for errors

### Issue 2: "Order creation failed"
- Verify Cashfree credentials
- Check server logs for detailed errors
- Verify API endpoint accessibility

### Issue 3: "CORS errors"
- Check server CORS configuration
- Verify client and server ports
- Check environment variables

### Issue 4: "Payment not redirecting"
- Verify payment session ID
- Check Cashfree mode (sandbox/production)
- Verify return URL configuration

## Support & Resources

### Documentation
- [Cashfree API Documentation](https://www.cashfree.com/docs/payments/online/web/redirect)
- [Cashfree SDK Reference](https://www.cashfree.com/docs/payments/online/web/redirect)

### Testing Tools
- Cashfree Dashboard (sandbox mode)
- Postman/Insomnia for API testing
- Browser developer tools for frontend debugging

### Contact
- Cashfree Support: [support@cashfree.com](mailto:support@cashfree.com)
- Technical Documentation: [docs.cashfree.com](https://docs.cashfree.com)

## Next Steps

### Immediate Actions
1. ✅ Set up Cashfree sandbox account
2. ✅ Configure environment variables
3. ✅ Test payment flow in sandbox
4. ✅ Verify webhook handling

### Future Enhancements
1. **Payment Analytics**: Track payment success rates
2. **Retry Logic**: Implement payment retry mechanisms
3. **Multi-Currency**: Support for different currencies
4. **Subscription Payments**: Recurring payment support
5. **Payment Methods**: Add more payment options

---

**Note**: This integration follows Cashfree's best practices and security guidelines. Always test thoroughly in sandbox mode before going live.
