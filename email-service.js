// ===================================
// BULLETPROOF EMAIL SERVICE MODULE
// ===================================

// EmailJS Configuration - REPLACE WITH YOUR ACTUAL VALUES
const EMAIL_CONFIG = {
  serviceId: "service_eval9v7", // Replace with your actual Service ID
  templateId: "template_8e0uetm", // Replace with your actual Template ID
  publicKey: "768Ia0CEvcaVP0MGO", // Replace with your actual Public Key
}

// Company Configuration
const COMPANY_INFO = {
  email: "orders@wakawakaboyz.com",
  whatsapp: "+233123456789",
  name: "Wakawakaboyz",
  address: "Accra, Ghana",
  phone: "+233 123 456 789",
}

// Email Service Class with Enhanced Error Handling
class EmailService {
  constructor() {
    this.isInitialized = false
    this.isConfigured = false
    this.retryAttempts = 3
    this.retryDelay = 2000
    this.initializationPromise = null
  }

  // Initialize EmailJS with promise-based approach
  async initialize() {
    // Return existing promise if already initializing
    if (this.initializationPromise) {
      return this.initializationPromise
    }

    this.initializationPromise = this._performInitialization()
    return this.initializationPromise
  }

  async _performInitialization() {
    try {
      console.log("🔄 Initializing EmailJS...")

      // Check if EmailJS is loaded
      if (typeof emailjs === "undefined") {
        throw new Error("EmailJS library not loaded")
      }

      // Check if configuration is set
      if (EMAIL_CONFIG.publicKey === "your_public_key_here") {
        throw new Error("EmailJS not configured - please update EMAIL_CONFIG")
      }

      // Initialize EmailJS
      emailjs.init({
        publicKey: EMAIL_CONFIG.publicKey,
        limitRate: {
          id: "wakawakaboyz_app",
          throttle: 3000, // 3 seconds between emails
        },
      })

      this.isInitialized = true
      this.isConfigured = true

      console.log("✅ EmailJS initialized successfully")
      this.showNotification("Email service ready!", "success")
      return true
    } catch (error) {
      console.error("❌ EmailJS initialization failed:", error.message)
      this.showNotification("Email service initialization failed: " + error.message, "error")
      this.isInitialized = false
      this.isConfigured = false
      return false
    }
  }

  // Force re-initialization
  async forceReinitialize() {
    this.isInitialized = false
    this.isConfigured = false
    this.initializationPromise = null
    return await this.initialize()
  }

  // Test email connection with detailed logging
  async testConnection() {
    try {
      console.log("🧪 Testing email connection...")

      const initialized = await this.initialize()
      if (!initialized) {
        throw new Error("EmailJS initialization failed")
      }

      const testParams = {
        to_email: COMPANY_INFO.email,
        from_name: COMPANY_INFO.name,
        subject: "🧪 EmailJS Connection Test - " + new Date().toLocaleTimeString(),
        message: "This is a test email to verify EmailJS is working correctly.",
        test_time: new Date().toLocaleString(),
        order_id: "TEST_" + Date.now(),
        customer_name: "Test Customer",
        customer_email: "test@example.com",
        customer_phone: "+233123456789",
        customer_address: "Test Address, Accra",
        total_amount: "25.00",
        items_summary: "Test Item x1 - GH₵25.00",
        subtotal: "20.00",
        delivery_fee: "5.00",
        payment_status: "✅ TEST",
        payment_reference: "TEST_REF_" + Date.now(),
        special_notes: "This is a test email",
        email_sent_time: new Date().toLocaleString(),
        receipt_html: "<p>Test receipt content</p>",
        items_count: "1",
        priority: "TEST",
        order_date: new Date().toLocaleString(),
        reply_to: "test@example.com",
      }

      this.showNotification("Sending test email...", "info")

      const response = await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, testParams)

      console.log("✅ Email test successful:", response)
      this.showNotification("✅ Email test successful! Check your inbox.", "success")
      return true
    } catch (error) {
      console.error("❌ Email test failed:", error)
      this.showNotification("Email test failed: " + error.message, "error")
      return false
    }
  }

  // Send order receipt email with comprehensive error handling
  async sendOrderReceipt(orderData) {
    try {
      console.log("📧 Starting email send process for order:", orderData.orderId)

      // Ensure EmailJS is initialized
      const initialized = await this.initialize()
      if (!initialized) {
        throw new Error("EmailJS initialization failed")
      }

      this.showNotification("📧 Preparing order receipt...", "info")

      // Validate order data
      if (!orderData || !orderData.orderId) {
        throw new Error("Invalid order data provided")
      }

      // Prepare email parameters
      const emailParams = this.prepareEmailParams(orderData)
      console.log("📋 Email parameters prepared:", emailParams)

      // Send email with retry mechanism
      const result = await this.sendWithRetry(emailParams)

      if (result.success) {
        console.log("✅ Order receipt sent successfully")
        this.showNotification("✅ Order receipt sent successfully!", "success")

        // Send customer copy if different email
        if (orderData.customer.email && orderData.customer.email !== COMPANY_INFO.email) {
          setTimeout(() => {
            this.sendCustomerCopy(orderData, emailParams)
          }, 2000) // Wait 2 seconds before sending customer copy
        }

        return { success: true, message: "Email sent successfully" }
      } else {
        throw new Error(result.error || "Email sending failed")
      }
    } catch (error) {
      console.error("❌ Email sending failed:", error)
      this.showNotification("Email sending failed: " + error.message, "error")
      return { success: false, error: error.message }
    }
  }

  // Prepare comprehensive email parameters
  prepareEmailParams(orderData) {
    const receiptHTML = this.generateReceiptHTML(orderData)

    return {
      // Email routing
      to_email: COMPANY_INFO.email,
      from_name: COMPANY_INFO.name,
      reply_to: orderData.customer.email || COMPANY_INFO.email,

      // Subject
      subject: `🍽️ NEW ORDER #${orderData.orderId} - ${orderData.customer.name}`,

      // Order information
      order_id: orderData.orderId,
      order_date: new Date(orderData.orderDate).toLocaleString(),
      payment_method: orderData.paymentMethod || "Not specified",
      payment_status: orderData.paymentStatus === "paid" ? "✅ PAID" : "💰 Cash on Delivery",
      payment_reference: orderData.paymentReference || "N/A",

      // Customer information
      customer_name: orderData.customer.name || "Not provided",
      customer_email: orderData.customer.email || "Not provided",
      customer_phone: orderData.customer.phone || "Not provided",
      customer_address: orderData.customer.address || "Not provided",

      // Order details
      items_count: orderData.items ? orderData.items.length : 0,
      items_summary: orderData.items
        ? orderData.items
            .map(
              (item, index) =>
                `${index + 1}. ${item.name} x${item.quantity} - GH₵${(item.price * item.quantity).toFixed(2)}`,
            )
            .join("\n")
        : "No items",

      // Financial information
      subtotal: (orderData.subtotal || 0).toFixed(2),
      delivery_fee: (orderData.deliveryFee || 0).toFixed(2),
      total_amount: (orderData.total || 0).toFixed(2),

      // Additional information
      special_notes: orderData.notes || "No special instructions",
      priority: orderData.paymentStatus === "paid" ? "HIGH" : "NORMAL",
      email_sent_time: new Date().toLocaleString(),

      // HTML receipt
      receipt_html: receiptHTML,

      // Plain text message
      message: this.generatePlainTextReceipt(orderData),
    }
  }

  // Enhanced retry mechanism with exponential backoff
  async sendWithRetry(emailParams) {
    let lastError = null

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        console.log(`📤 Sending email attempt ${attempt}/${this.retryAttempts}...`)
        this.showNotification(`📤 Sending email (attempt ${attempt}/${this.retryAttempts})...`, "info")

        const response = await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, emailParams)

        console.log(`✅ Email sent successfully on attempt ${attempt}:`, response)
        return { success: true, response }
      } catch (error) {
        lastError = error
        console.warn(`❌ Email attempt ${attempt} failed:`, error.message)

        if (attempt < this.retryAttempts) {
          const delay = this.retryDelay * attempt // Exponential backoff
          this.showNotification(
            `Retrying email send in ${delay / 1000}s... (${attempt}/${this.retryAttempts})`,
            "warning",
          )
          await this.delay(delay)
        }
      }
    }

    return { success: false, error: lastError ? lastError.message : "Unknown error" }
  }

  // Send customer copy
  async sendCustomerCopy(orderData, originalParams) {
    try {
      console.log("📧 Sending customer copy to:", orderData.customer.email)

      const customerParams = {
        ...originalParams,
        to_email: orderData.customer.email,
        subject: `🍽️ Order Confirmation #${orderData.orderId} - Thank you ${orderData.customer.name}!`,
        message: `Dear ${orderData.customer.name},\n\nThank you for your order! Here are your order details:\n\n${originalParams.message}`,
      }

      const response = await emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, customerParams)
      console.log("✅ Customer copy sent successfully:", response)
      this.showNotification("📧 Confirmation sent to customer!", "success")
    } catch (error) {
      console.warn("⚠️ Customer email failed:", error)
      // Don't fail the whole process if customer email fails
    }
  }

  // Generate HTML receipt
  generateReceiptHTML(orderData) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Receipt - ${orderData.orderId}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .receipt { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 3px solid #ff6b35; padding-bottom: 20px; margin-bottom: 25px; }
        .logo { color: #ff6b35; font-size: 28px; font-weight: bold; margin-bottom: 5px; }
        .tagline { color: #666; font-style: italic; }
        .order-info { background: linear-gradient(135deg, #ff6b35, #e55a2b); color: white; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
        .order-info h2 { margin: 0 0 15px 0; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { background: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #333; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; margin-bottom: 15px; }
        .customer-info { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b35; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .items-table th { background: #ff6b35; color: white; padding: 12px; text-align: left; }
        .items-table td { padding: 12px; border-bottom: 1px solid #eee; }
        .items-table tr:nth-child(even) { background: #f9f9f9; }
        .total-section { background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 20px; border-radius: 8px; border: 2px solid #ff6b35; }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .final-total { font-size: 20px; font-weight: bold; color: #ff6b35; border-top: 2px solid #ff6b35; padding-top: 10px; margin-top: 10px; }
        .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 12px; }
        .status-paid { background: #28a745; color: white; }
        .status-cod { background: #ffc107; color: #333; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #666; }
        .contact-info { display: flex; justify-content: center; gap: 20px; margin-top: 15px; flex-wrap: wrap; }
        .contact-item { display: flex; align-items: center; gap: 5px; }
        .timestamp { font-size: 12px; color: #999; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="logo">${COMPANY_INFO.name}</div>
            <div class="tagline">Authentic West African Cuisine</div>
        </div>
        
        <div class="order-info">
            <h2>🧾 Order Receipt</h2>
            <div class="info-grid">
                <div class="info-item">
                    <strong>Order ID:</strong><br>${orderData.orderId}
                </div>
                <div class="info-item">
                    <strong>Date & Time:</strong><br>${new Date(orderData.orderDate).toLocaleString()}
                </div>
                <div class="info-item">
                    <strong>Payment Status:</strong><br>
                    <span class="status-badge ${orderData.paymentStatus === "paid" ? "status-paid" : "status-cod"}">
                        ${orderData.paymentStatus === "paid" ? "✅ PAID" : "💰 Cash on Delivery"}
                    </span>
                </div>
                ${
                  orderData.paymentReference
                    ? `
                <div class="info-item">
                    <strong>Payment Ref:</strong><br>${orderData.paymentReference}
                </div>
                `
                    : ""
                }
            </div>
        </div>
        
        <div class="section">
            <h3>👤 Customer Information</h3>
            <div class="customer-info">
                <div class="info-grid">
                    <div><strong>Name:</strong> ${orderData.customer.name}</div>
                    <div><strong>Phone:</strong> ${orderData.customer.phone}</div>
                    <div><strong>Email:</strong> ${orderData.customer.email}</div>
                    <div style="grid-column: 1 / -1;"><strong>Delivery Address:</strong> ${orderData.customer.address}</div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h3>🛒 Order Items</h3>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                      orderData.items
                        ? orderData.items
                            .map(
                              (item, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td><strong>${item.name}</strong></td>
                        <td>${item.quantity}</td>
                        <td>GH₵${item.price.toFixed(2)}</td>
                        <td><strong>GH₵${(item.price * item.quantity).toFixed(2)}</strong></td>
                    </tr>
                    `,
                            )
                            .join("")
                        : "<tr><td colspan='5'>No items</td></tr>"
                    }
                </tbody>
            </table>
        </div>
        
        ${
          orderData.notes
            ? `
        <div class="section">
            <h3>📝 Special Instructions</h3>
            <div class="customer-info">
                ${orderData.notes}
            </div>
        </div>
        `
            : ""
        }
        
        <div class="section">
            <h3>💰 Payment Summary</h3>
            <div class="total-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>GH₵${(orderData.subtotal || 0).toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Delivery Fee:</span>
                    <span>GH₵${(orderData.deliveryFee || 0).toFixed(2)}</span>
                </div>
                <div class="total-row final-total">
                    <span>TOTAL AMOUNT:</span>
                    <span>GH₵${(orderData.total || 0).toFixed(2)}</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <h3 style="color: #ff6b35; margin-bottom: 10px;">Thank you for choosing ${COMPANY_INFO.name}!</h3>
            <p>Your delicious meal will be prepared with love and delivered fresh to your doorstep.</p>
            
            <div class="contact-info">
                <div class="contact-item">
                    <span>📞</span>
                    <span>${COMPANY_INFO.phone}</span>
                </div>
                <div class="contact-item">
                    <span>✉️</span>
                    <span>${COMPANY_INFO.email}</span>
                </div>
                <div class="contact-item">
                    <span>📍</span>
                    <span>${COMPANY_INFO.address}</span>
                </div>
            </div>
            
            <div class="timestamp">
                Receipt generated on ${new Date().toLocaleString()} | Order ID: ${orderData.orderId}
            </div>
        </div>
    </div>
</body>
</html>
    `
  }

  // Generate plain text receipt
  generatePlainTextReceipt(orderData) {
    return `
🍽️ NEW ORDER - ${COMPANY_INFO.name.toUpperCase()}

📋 ORDER DETAILS:
Order ID: ${orderData.orderId}
Date: ${new Date(orderData.orderDate).toLocaleString()}
Payment Status: ${orderData.paymentStatus === "paid" ? "✅ PAID" : "💰 Cash on Delivery"}
${orderData.paymentReference ? `Payment Reference: ${orderData.paymentReference}` : ""}

👤 CUSTOMER INFORMATION:
Name: ${orderData.customer.name}
Email: ${orderData.customer.email}
Phone: ${orderData.customer.phone}
Address: ${orderData.customer.address}

🛒 ORDER ITEMS:
${
  orderData.items
    ? orderData.items
        .map(
          (item, index) =>
            `${index + 1}. ${item.name} x${item.quantity} - GH₵${(item.price * item.quantity).toFixed(2)}`,
        )
        .join("\n")
    : "No items"
}

💰 PAYMENT SUMMARY:
Subtotal: GH₵${(orderData.subtotal || 0).toFixed(2)}
Delivery Fee: GH₵${(orderData.deliveryFee || 0).toFixed(2)}
TOTAL: GH₵${(orderData.total || 0).toFixed(2)}

${orderData.notes ? `📝 SPECIAL INSTRUCTIONS: ${orderData.notes}` : ""}

⏰ Expected Delivery: 30-45 minutes
🚚 Status: Pending Confirmation

---
Contact: ${COMPANY_INFO.phone} | ${COMPANY_INFO.email}
    `.trim()
  }

  // Utility function for delays
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Show notification
  showNotification(message, type = "info") {
    console.log(`[${type.toUpperCase()}] ${message}`)

    // Try to use the main app's notification system if available
    if (typeof window !== "undefined" && window.showNotification) {
      window.showNotification(message, type)
    }
  }
}

// Create global email service instance
if (typeof window !== "undefined") {
  window.emailService = new EmailService()

  // Auto-initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        window.emailService.initialize()
      }, 1000)
    })
  } else {
    // DOM already loaded
    setTimeout(() => {
      window.emailService.initialize()
    }, 1000)
  }
}

// Export for module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = EmailService
}
