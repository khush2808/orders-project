# 📈 Trading Order Form

A learning project demonstrating the integration of **Next.js**, **MobX**, **React Hook Form**, and a **custom Express server**.

## 🎯 Project Overview

This application is a simple trading order form where users can:
- Enter trade details (symbol, order type, quantity, price, side)
- Submit orders to a backend API
- View all submitted orders in a table
- Experience real-time reactivity with MobX state management

## 🛠️ Tech Stack

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Next.js 14** | React Framework | Server-side rendering, routing, and optimized performance |
| **TypeScript** | Type Safety | Catch errors during development, better IDE support |
| **MobX** | State Management | Simple, reactive state management with minimal boilerplate |
| **React Hook Form** | Form Handling | Performant forms with easy validation |
| **Express** | Custom Server | Handle custom API endpoints within Next.js |
| **Tailwind CSS** | Styling | Utility-first CSS for rapid UI development |

## 📚 Learning Concepts Explained

### 1. **Next.js - React Framework**

Next.js is a React framework that provides:

- **Server-Side Rendering (SSR)**: Pages can be rendered on the server for better SEO and initial load performance
- **File-Based Routing**: Create a file in `app/` folder, and it automatically becomes a route
- **API Routes**: Build backend endpoints alongside your frontend
- **Automatic Code Splitting**: Only load JavaScript needed for each page

**Example**: Our `app/order/page.tsx` automatically creates the `/order` route.

### 2. **MobX - State Management**

MobX makes state management simple and reactive:

```typescript
// Define observable state
class OrderStore {
  orders: Order[] = [];
  
  constructor() {
    makeAutoObservable(this); // Makes everything reactive
  }
  
  addOrder(order: Order) {
    this.orders.push(order); // Components auto-update!
  }
}
```

**Key Concepts**:
- **Observable**: Data that MobX tracks for changes
- **Actions**: Functions that modify observable data
- **Observer**: React components that automatically re-render when observables change

**Why MobX over Redux?**
- Less boilerplate code
- More intuitive (just modify state directly)
- Automatic optimization (only re-renders what changed)

### 3. **React Hook Form - Form Management**

React Hook Form provides performant form handling:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm();

// Register an input
<input {...register("quantity", { 
  required: "Quantity is required",
  min: { value: 1, message: "Must be at least 1" }
})} />
```

**Benefits**:
- **Performance**: Uses uncontrolled inputs (no re-render on every keystroke)
- **Built-in Validation**: Easy to add validation rules
- **Less Code**: No need to write onChange handlers manually

### 4. **Custom Express Server**

We integrate Express with Next.js to handle custom API endpoints:

```javascript
// Create Express server
const server = express();

// Custom API endpoint
server.post("/api/order", (req, res) => {
  // Handle order creation
});

// Delegate everything else to Next.js
server.all("*", (req, res) => handle(req, res));
```

**Why Custom Server?**
- Full control over API endpoints
- Add custom middleware
- Integrate with other backend services
- Use WebSockets, GraphQL, etc.

### 5. **TypeScript - Type Safety**

TypeScript adds types to JavaScript:

```typescript
interface Order {
  id: string;
  symbol: "NIFTY" | "BANKNIFTY" | "RELIANCE" | "TCS";
  quantity: number;
  // ... more fields
}
```

**Benefits**:
- Catch errors before runtime
- Better IDE autocomplete
- Self-documenting code
- Easier refactoring

## 📁 Project Structure

```
trading-order-form/
├── app/                      # Next.js App Directory
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page (/)
│   └── order/               # Order page route
│       └── page.tsx         # Order form page (/order)
├── components/              # React Components
│   ├── OrderForm.tsx        # Form for creating orders
│   └── OrderTable.tsx       # Table displaying orders
├── stores/                  # MobX Stores
│   └── OrderStore.ts        # Order state management
├── server/                  # Custom Server
│   └── server.js            # Express server with Next.js
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── next.config.js           # Next.js configuration
```

## 🚀 Setup and Run Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Install Dependencies**

```bash
npm install
```

This installs all required packages:
- `next`, `react`, `react-dom` - Next.js and React
- `mobx`, `mobx-react-lite` - MobX state management
- `react-hook-form` - Form handling
- `express` - Custom server
- `tailwindcss` - CSS framework
- TypeScript and type definitions

### Running the Application

2. **Start Development Server**

```bash
npm run dev
```

This starts the custom Express server with Next.js in development mode.

3. **Open in Browser**

Navigate to: `http://localhost:3000`

### What Happens When You Run `npm run dev`?

1. Node.js executes `server/server.js`
2. Express server starts
3. Next.js prepares (compiles pages, sets up hot reloading)
4. Server listens on port 3000
5. You can now access:
   - `http://localhost:3000` - Home page
   - `http://localhost:3000/order` - Order form page
   - `POST http://localhost:3000/api/order` - Create order API
   - `GET http://localhost:3000/api/orders` - Get orders API

## 🎓 How the Application Works

### Data Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. User fills form
       ▼
┌─────────────────┐
│  OrderForm.tsx  │ (React Hook Form validates)
└────────┬────────┘
         │
         │ 2. Form submits
         ▼
┌──────────────────┐
│  OrderStore.ts   │ (MobX store)
└────────┬─────────┘
         │
         │ 3. POST /api/order
         ▼
┌──────────────────┐
│  server.js       │ (Express API)
└────────┬─────────┘
         │
         │ 4. Save to memory
         │ 5. Return order with ID
         ▼
┌──────────────────┐
│  OrderStore.ts   │ (Updates state)
└────────┬─────────┘
         │
         │ 6. MobX notifies observers
         ▼
┌──────────────────┐
│  OrderTable.tsx  │ (Auto re-renders!)
└──────────────────┘
```

### Step-by-Step Explanation

1. **User Interaction**
   - User fills out the order form
   - React Hook Form handles validation in real-time
   - Conditional fields show/hide based on order type

2. **Form Submission**
   - User clicks "Submit Order"
   - React Hook Form validates all fields
   - If valid, calls `orderStore.submitOrder()`

3. **MobX Store Action**
   - `submitOrder()` sends POST request to `/api/order`
   - Includes order data in JSON format

4. **Express Server**
   - Receives POST request
   - Validates data
   - Generates unique ID and timestamp
   - Stores order in memory array
   - Returns order with ID to client

5. **State Update**
   - MobX store receives response
   - Calls `addOrder()` to add to observable array
   - MobX detects the change

6. **Automatic Re-render**
   - OrderTable component is wrapped with `observer()`
   - MobX automatically re-renders it
   - New order appears in table instantly!

## 🔍 Key Features Explained

### 1. Conditional Form Fields

The form shows different fields based on order type:

- **Market Order**: No price fields needed
- **Limit Order**: Requires Price field
- **Stop Limit Order**: Requires both Price and Stop Price

**Implementation**:
```typescript
const orderType = watch("orderType"); // Watch the field

{orderType === "Limit" && (
  <input {...register("price", { required: true })} />
)}
```

### 2. Form Validation

React Hook Form provides built-in validation:

```typescript
<input
  {...register("quantity", {
    required: "Quantity is required",
    min: { value: 1, message: "Must be at least 1" }
  })}
/>
```

### 3. Reactive State Management

MobX makes components reactive:

```typescript
// Wrap component with observer
const OrderTable = observer(() => {
  const { orders } = orderStore; // Access observable
  
  return (
    <table>
      {orders.map(order => <tr>...</tr>)}
    </table>
  );
});
```

When `orders` changes, component automatically re-renders!

### 4. API Endpoints

**POST /api/order** - Create Order
```bash
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "NIFTY",
    "orderType": "Market",
    "quantity": 10,
    "side": "Buy"
  }'
```

**GET /api/orders** - Get All Orders
```bash
curl http://localhost:3000/api/orders
```

## 🎨 UI Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode Support**: Automatically adapts to system theme
- **Color-Coded Orders**: Green for Buy, Red for Sell
- **Loading States**: Shows spinner while fetching data
- **Empty States**: Friendly message when no orders exist
- **Success/Error Messages**: Visual feedback on form submission

## 🧪 Testing the Application

### Manual Testing Steps

1. **Test Market Order**
   - Select "Market" order type
   - Notice Price and Stop Price fields are hidden
   - Enter quantity and side
   - Submit and verify it appears in table

2. **Test Limit Order**
   - Select "Limit" order type
   - Price field should appear
   - Try submitting without price (should show error)
   - Fill price and submit

3. **Test Stop Limit Order**
   - Select "Stop Limit" order type
   - Both Price and Stop Price should appear
   - Test validation on both fields

4. **Test Form Validation**
   - Try submitting empty form (should show errors)
   - Enter negative quantity (should show error)
   - Enter 0 quantity (should show error)

5. **Test State Persistence**
   - Submit multiple orders
   - Verify all appear in table
   - Refresh page - orders should reload from server

## 🔧 Common Issues and Solutions

### Issue: Port 3000 already in use

**Solution**: Kill the process or use a different port
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Module not found errors

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors

**Solution**: Check tsconfig.json has correct settings
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "useDefineForClassFields": true
  }
}
```

## 📖 Further Learning

### Next Steps

1. **Add Database**: Replace in-memory storage with MongoDB or PostgreSQL
2. **Add Authentication**: Implement user login with NextAuth.js
3. **Add Real-Time Updates**: Use WebSockets for live order updates
4. **Add Tests**: Write unit tests with Jest and integration tests with Cypress
5. **Deploy**: Deploy to Vercel, Netlify, or your own server

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MobX Documentation](https://mobx.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Express Documentation](https://expressjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

This is a learning project! Feel free to:
- Add new features
- Improve documentation
- Fix bugs
- Suggest improvements

## 📝 License

MIT License - Feel free to use this project for learning!

---

**Happy Learning! 🚀**

If you have questions or need clarification on any concept, feel free to explore the code - every file has detailed comments explaining what's happening!
