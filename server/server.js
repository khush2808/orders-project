/**
 * 📚 TECHNICAL EXPLANATION: Custom Next.js Server with Express
 * 
 * By default, Next.js runs its own server. But sometimes we need more control
 * over the server to add custom API endpoints, middleware, or integrate with
 * other backend services.
 * 
 * This file creates a custom Express server that:
 * 1. Handles our custom API routes (/api/order, /api/orders)
 * 2. Delegates everything else to Next.js
 * 
 * Key Concepts:
 * 
 * 1. Express: A minimal Node.js web framework
 *    - Handles HTTP requests and responses
 *    - Provides middleware support
 *    - Easy to define routes (GET, POST, etc.)
 * 
 * 2. Next.js Integration:
 *    - We create a Next.js app instance
 *    - We prepare it (compiles pages, etc.)
 *    - We use it as a request handler for non-API routes
 * 
 * 3. In-Memory Storage:
 *    - We use a simple array to store orders
 *    - In a real app, you'd use a database (MongoDB, PostgreSQL, etc.)
 *    - This is just for learning purposes
 * 
 * 4. REST API:
 *    - POST /api/order: Create a new order
 *    - GET /api/orders: Get all orders
 *    - These follow RESTful conventions
 */

const express = require("express");
const next = require("next");

// Determine if we're in development or production
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

/**
 * Create Next.js app instance
 * 
 * Parameters:
 * - dev: Enable development mode (hot reloading, better error messages)
 * - hostname: Where the server will run
 * - port: Which port to use
 */
const app = next({ dev, hostname, port });

/**
 * getRequestHandler returns a function that can handle Next.js requests
 * We'll use this for all non-API routes (pages, static files, etc.)
 */
const handle = app.getRequestHandler();

/**
 * In-Memory Data Store
 * 
 * In a real application, this would be a database.
 * For this learning project, we use a simple array.
 * 
 * Note: Data is lost when server restarts!
 */
let orders = [];

/**
 * Helper function to generate unique IDs
 * 
 * In production, you'd use:
 * - Database auto-increment IDs
 * - UUIDs (universally unique identifiers)
 * - MongoDB ObjectIds
 */
function generateId() {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Start the server
 * 
 * Flow:
 * 1. Prepare Next.js app (compile pages, etc.)
 * 2. Create Express server
 * 3. Define API routes
 * 4. Delegate other routes to Next.js
 * 5. Start listening on the port
 */
app
  .prepare()
  .then(() => {
    // Create Express application
    const server = express();

    /**
     * Middleware: express.json()
     * 
     * This parses incoming JSON request bodies.
     * Without this, req.body would be undefined.
     * 
     * Example: When client sends { "symbol": "NIFTY" },
     * this middleware converts it to a JavaScript object.
     */
    server.use(express.json());

    /**
     * Middleware: Logging
     * 
     * Logs every request for debugging purposes.
     * Helps us see what requests are coming in.
     */
    server.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
      next(); // Pass control to next middleware/route
    });

    /**
     * API Route: POST /api/order
     * 
     * Purpose: Create a new order
     * 
     * Request Body Example:
     * {
     *   "symbol": "NIFTY",
     *   "orderType": "Market",
     *   "quantity": 10,
     *   "side": "Buy"
     * }
     * 
     * Response Example:
     * {
     *   "success": true,
     *   "order": {
     *     "id": "order_1234567890_abc123",
     *     "symbol": "NIFTY",
     *     "orderType": "Market",
     *     "quantity": 10,
     *     "side": "Buy",
     *     "timestamp": "2024-01-15T10:30:00.000Z"
     *   }
     * }
     */
    server.post("/api/order", (req, res) => {
      try {
        // Extract order data from request body
        const orderData = req.body;

        /**
         * Validation
         * 
         * In a real app, you'd do more thorough validation:
         * - Check all required fields are present
         * - Validate data types
         * - Check value ranges
         * - Sanitize inputs to prevent injection attacks
         */
        if (!orderData.symbol || !orderData.orderType || !orderData.quantity || !orderData.side) {
          return res.status(400).json({
            success: false,
            error: "Missing required fields",
          });
        }

        /**
         * Create the order object
         * 
         * We add:
         * - id: Unique identifier
         * - timestamp: When the order was created
         * - All the data from the request
         */
        const order = {
          id: generateId(),
          ...orderData, // Spread operator: copies all properties from orderData
          timestamp: new Date().toISOString(),
        };

        // Store the order in our in-memory array
        orders.push(order);

        console.log(`✅ Order created: ${order.id}`);

        /**
         * Send success response
         * 
         * HTTP Status 201: Created (successful creation of a resource)
         * We send back the created order so the client knows the ID and timestamp
         */
        res.status(201).json({
          success: true,
          order: order,
        });
      } catch (error) {
        /**
         * Error handling
         * 
         * If anything goes wrong, we catch the error and send a 500 response.
         * HTTP Status 500: Internal Server Error
         */
        console.error("❌ Error creating order:", error);
        res.status(500).json({
          success: false,
          error: "Failed to create order",
        });
      }
    });

    /**
     * API Route: GET /api/orders
     * 
     * Purpose: Retrieve all orders
     * 
     * Response Example:
     * {
     *   "success": true,
     *   "orders": [
     *     { "id": "order_1", "symbol": "NIFTY", ... },
     *     { "id": "order_2", "symbol": "TCS", ... }
     *   ],
     *   "count": 2
     * }
     */
    server.get("/api/orders", (req, res) => {
      try {
        console.log(`📊 Fetching ${orders.length} orders`);

        /**
         * Send success response with all orders
         * 
         * HTTP Status 200: OK (successful GET request)
         * 
         * We send:
         * - orders: Array of all orders
         * - count: Number of orders (useful for pagination in real apps)
         */
        res.status(200).json({
          success: true,
          orders: orders,
          count: orders.length,
        });
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({
          success: false,
          error: "Failed to fetch orders",
        });
      }
    });

    /**
     * API Route: DELETE /api/orders (Optional - for clearing orders)
     * 
     * Purpose: Clear all orders
     * Useful for testing/development
     */
    server.delete("/api/orders", (req, res) => {
      try {
        const count = orders.length;
        orders = []; // Clear the array
        console.log(`🗑️ Cleared ${count} orders`);

        res.status(200).json({
          success: true,
          message: `Cleared ${count} orders`,
        });
      } catch (error) {
        console.error("❌ Error clearing orders:", error);
        res.status(500).json({
          success: false,
          error: "Failed to clear orders",
        });
      }
    });

    /**
     * Catch-All Route: All other requests go to Next.js
     * 
     * This handles:
     * - Page routes (/, /order, etc.)
     * - Static files (images, CSS, JS)
     * - Next.js API routes (if we had any in pages/api/)
     * 
     * The asterisk (*) means "match everything"
     * We use 'all' to match any HTTP method (GET, POST, etc.)
     */
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    /**
     * Start the server
     * 
     * server.listen() starts the server and makes it listen for requests
     * on the specified port.
     */
    server.listen(port, (err) => {
      if (err) throw err;
      console.log("\n" + "=".repeat(60));
      console.log("🚀 Server is ready!");
      console.log("=".repeat(60));
      console.log(`📍 Local:            http://${hostname}:${port}`);
      console.log(`🔧 Environment:     ${dev ? "development" : "production"}`);
      console.log(`📊 API Endpoints:`);
      console.log(`   POST   /api/order   - Create new order`);
      console.log(`   GET    /api/orders  - Get all orders`);
      console.log(`   DELETE /api/orders  - Clear all orders`);
      console.log("=".repeat(60) + "\n");
    });
  })
  .catch((ex) => {
    console.error("❌ Error starting server:", ex.stack);
    process.exit(1);
  });

/**
 * 📚 ADDITIONAL CONCEPTS EXPLAINED:
 * 
 * 1. Middleware:
 *    - Functions that run before your route handlers
 *    - Can modify request/response objects
 *    - Can end the request-response cycle
 *    - Can call next() to pass control to next middleware
 * 
 * 2. HTTP Status Codes:
 *    - 200: OK (successful GET)
 *    - 201: Created (successful POST)
 *    - 400: Bad Request (client error, invalid data)
 *    - 500: Internal Server Error (server error)
 * 
 * 3. REST API Principles:
 *    - Use HTTP methods semantically:
 *      * GET: Retrieve data (read-only)
 *      * POST: Create new resource
 *      * PUT/PATCH: Update existing resource
 *      * DELETE: Remove resource
 *    - Use meaningful URLs (/api/orders, not /api/getOrders)
 *    - Return appropriate status codes
 *    - Send data as JSON
 * 
 * 4. Async/Await vs Callbacks:
 *    - Express traditionally uses callbacks (req, res) => {}
 *    - Modern JavaScript uses async/await for async operations
 *    - Both work, but async/await is more readable
 * 
 * 5. Error Handling:
 *    - Always use try-catch blocks
 *    - Send appropriate error responses
 *    - Log errors for debugging
 *    - Never expose sensitive error details to clients
 */
