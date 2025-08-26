const { Cashfree, CFEnvironment } = require("cashfree-pg");

// Initialize Cashfree with environment and credentials
const cashfree = new Cashfree(
  process.env.NODE_ENV === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
  process.env.CASHFREE_CLIENT_ID || 'test_client_id',
  process.env.CASHFREE_CLIENT_SECRET || 'test_client_secret'
);

class CashfreeService {
  /**
   * Create a new order for payment
   * @param {Object} orderData - Order details
   * @param {string} orderData.email - Customer email
   * @param {string} orderData.amount - Order amount
   * @param {string} orderData.currency - Currency (default: INR)
   * @param {string} orderData.returnUrl - Return URL after payment
   * @returns {Promise<Object>} Order creation response
   */
  static async createOrder(orderData) {
    try {
      // Extract fullname from email (everything before @)
      const fullname = orderData.email.split('@')[0];
      
      // Generate random 10-digit mobile number
      const mobileNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      
      // Generate unique order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const request = {
        order_amount: orderData.amount.toString(),
        order_currency: orderData.currency || "INR",
        order_id: orderId,
        customer_details: {
          customer_id: `customer_${Date.now()}`,
          customer_name: fullname,
          customer_email: orderData.email,
          customer_phone: mobileNumber,
        },
        order_meta: {
          return_url: orderData.returnUrl || "http://localhost:3000/success",
          notify_url: process.env.CASHFREE_WEBHOOK_URL || `${process.env.VERCEL_URL || 'http://localhost:5000'}/api/webhook/cashfree`,
        },
        order_note: "AgniVirya Ancient Modern Wellness eBook",
      };

      console.log('🔧 Creating Cashfree order with data:', request);

      const response = await cashfree.PGCreateOrder(request);
      
      console.log('✅ Cashfree order created successfully:', response.data);
      
      return {
        success: true,
        orderId: response.data.order_id,
        paymentSessionId: response.data.payment_session_id,
        orderStatus: response.data.order_status,
        customerDetails: response.data.customer_details,
        orderAmount: response.data.order_amount,
        orderCurrency: response.data.order_currency
      };

    } catch (error) {
      console.error('❌ Error creating Cashfree order:', error.response?.data || error.message);
      throw new Error(`Failed to create order: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Fetch order details and status
   * @param {string} orderId - Order ID to fetch
   * @returns {Promise<Object>} Order details
   */
  static async fetchOrder(orderId) {
    try {
      const version = "2023-08-01";
      const response = await cashfree.PGFetchOrder(version, orderId, null, null, null);
      
      console.log('✅ Order fetched successfully:', response.data);
      
      return {
        success: true,
        orderData: response.data
      };

    } catch (error) {
      console.error('❌ Error fetching order:', error.response?.data || error.message);
      throw new Error(`Failed to fetch order: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Verify payment status
   * @param {string} orderId - Order ID to verify
   * @returns {Promise<Object>} Payment verification result
   */
  static async verifyPayment(orderId) {
    try {
      const orderData = await this.fetchOrder(orderId);
      
      if (orderData.success && orderData.orderData.order_status === 'PAID') {
        return {
          success: true,
          isPaid: true,
          orderData: orderData.orderData,
          message: 'Payment verified successfully'
        };
      } else {
        return {
          success: true,
          isPaid: false,
          orderData: orderData.orderData,
          message: 'Payment not completed'
        };
      }

    } catch (error) {
      console.error('❌ Error verifying payment:', error.message);
      throw new Error(`Payment verification failed: ${error.message}`);
    }
  }
}

module.exports = CashfreeService;
