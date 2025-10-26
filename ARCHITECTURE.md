# 🏗️ Project Architecture

This document explains the architecture and data flow of the Trading Order Form application.

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────┐         ┌─────────────────────┐         │
│  │   OrderForm.tsx    │         │  OrderTable.tsx     │         │
│  │  (React Hook Form) │         │   (Display Orders)  │         │
│  └─────────┬──────────┘         └──────────┬──────────┘         │
│            │                               │                     │
│            │ Submits Order                 │ Reads Orders        │
│            ▼                               ▼                     │
│  ┌──────────────────────────────────────────────────────┐       │
│  │            OrderStore.ts (MobX)                       │       │
│  │  ┌──────────────────────────────────────────────┐    │       │
│  │  │  Observable State:                            │    │       │
│  │  │  - orders: Order[]                            │    │       │
│  │  │  - isLoading: boolean                         │    │       │
│  │  │                                                │    │       │
│  │  │  Actions:                                      │    │       │
│  │  │  - addOrder(order)                            │    │       │
│  │  │  - submitOrder(data) → API call               │    │       │
│  │  │  - fetchOrders() → API call                   │    │       │
│  │  └──────────────────────────────────────────────┘    │       │
│  └──────────────────────┬────────────────────────────────┘       │
│                         │                                         │
└─────────────────────────┼─────────────────────────────────────────┘
                          │
                          │ HTTP Requests (JSON)
                          │
┌─────────────────────────▼─────────────────────────────────────────┐
│                    SERVER (Node.js)                                │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │              server.js (Express + Next.js)                │    │
│  │                                                            │    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │  Express Middleware                               │    │    │
│  │  │  - express.json() → Parse JSON bodies            │    │    │
│  │  │  - Logging middleware                             │    │    │
│  │  └──────────────────────────────────────────────────┘    │    │
│  │                                                            │    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │  API Routes                                       │    │    │
│  │  │  - POST /api/order   → Create order              │    │    │
│  │  │  - GET  /api/orders  → Get all orders            │    │    │
│  │  │  - DELETE /api/orders → Clear orders             │    │    │
│  │  └──────────────────────────────────────────────────┘    │    │
│  │                                                            │    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │  Data Storage (In-Memory)                         │    │    │
│  │  │  let orders = [];                                 │    │    │
│  │  │  (In production: use database)                    │    │    │
│  │  └──────────────────────────────────────────────────┘    │    │
│  │                                                            │    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │  Next.js Handler                                  │    │    │
│  │  │  - Handles all other routes                       │    │    │
│  │  │  - Serves pages, static files                     │    │    │
│  │  └──────────────────────────────────────────────────┘    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow: Submitting an Order

```
Step 1: User fills form
┌─────────────────┐
│  OrderForm.tsx  │
│                 │
│  User enters:   │
│  - Symbol       │
│  - Order Type   │
│  - Quantity     │
│  - Price        │
│  - Side         │
└────────┬────────┘
         │
         │ Step 2: Form validation (React Hook Form)
         ▼
┌─────────────────┐
│ Validation      │
│ - Required?     │
│ - Min/Max?      │
│ - Custom rules? │
└────────┬────────┘
         │
         │ ✅ Valid
         ▼
┌─────────────────┐
│ handleSubmit()  │
│ calls           │
│ onSubmit(data)  │
└────────┬────────┘
         │
         │ Step 3: Send to MobX store
         ▼
┌──────────────────────┐
│  OrderStore.ts       │
│                      │
│  submitOrder(data) { │
│    setLoading(true)  │
│    ↓                 │
└──────┬───────────────┘
       │
       │ Step 4: HTTP POST request
       │ POST /api/order
       │ Body: { symbol, orderType, quantity, ... }
       ▼
┌──────────────────────┐
│  server.js           │
│                      │
│  POST /api/order     │
│  ↓                   │
│  Validate data       │
│  ↓                   │
│  Generate ID         │
│  ↓                   │
│  Add timestamp       │
│  ↓                   │
│  Store in array      │
│  ↓                   │
│  Return order        │
└──────┬───────────────┘
       │
       │ Step 5: Response
       │ { success: true, order: {...} }
       ▼
┌──────────────────────┐
│  OrderStore.ts       │
│                      │
│  addOrder(order)     │ ← Step 6: Add to observable
│  ↓                   │
│  orders.push(order)  │
│  ↓                   │
│  setLoading(false)   │
└──────┬───────────────┘
       │
       │ Step 7: MobX notifies observers
       ▼
┌──────────────────────┐
│  OrderTable.tsx      │
│  (observer)          │
│                      │
│  Automatically       │ ← Step 8: Component re-renders
│  re-renders!         │
│                      │
│  Shows new order     │
└──────────────────────┘
```

## 🔍 Component Hierarchy

```
app/layout.tsx (Root Layout)
│
├── app/page.tsx (Home Page)
│   └── Link to /order
│
└── app/order/page.tsx (Order Page)
    │
    ├── OrderForm.tsx
    │   ├── Uses: React Hook Form
    │   ├── Accesses: OrderStore (for submission)
    │   └── Wrapped with: observer()
    │
    └── OrderTable.tsx
        ├── Accesses: OrderStore (for reading orders)
        └── Wrapped with: observer()
```

## 📦 Module Dependencies

```
OrderForm.tsx
├── react-hook-form → useForm, register, handleSubmit
├── mobx-react-lite → observer
└── OrderStore.ts → orderStore

OrderTable.tsx
├── mobx-react-lite → observer
└── OrderStore.ts → orderStore

OrderStore.ts
├── mobx → makeAutoObservable
└── fetch API → HTTP requests

server.js
├── express → Web server
└── next → Next.js integration
```

## 🎯 Request Routing

```
Browser makes request
        │
        ▼
http://localhost:3000/...
        │
        ▼
    server.js (Express)
        │
        ├─→ /api/order (POST) → Custom handler → Create order
        │
        ├─→ /api/orders (GET) → Custom handler → Return orders
        │
        ├─→ /api/orders (DELETE) → Custom handler → Clear orders
        │
        └─→ /* (all others) → Next.js handler
                                    │
                                    ├─→ / → app/page.tsx
                                    ├─→ /order → app/order/page.tsx
                                    ├─→ /_next/static/* → Static files
                                    └─→ /favicon.ico → Public assets
```

## 🔐 State Management Flow (MobX)

```
┌─────────────────────────────────────────────────────────┐
│                    OrderStore                            │
│  (Single source of truth)                                │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Observable State:                                        │
│  ┌─────────────────────────────────────────────┐        │
│  │ orders: Order[] = []                         │        │
│  │ isLoading: boolean = false                   │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
│  Actions (modify state):                                  │
│  ┌─────────────────────────────────────────────┐        │
│  │ addOrder(order)                              │        │
│  │ setOrders(orders)                            │        │
│  │ clearOrders()                                │        │
│  │ setLoading(loading)                          │        │
│  │ submitOrder(data) → async                    │        │
│  │ fetchOrders() → async                        │        │
│  └─────────────────────────────────────────────┘        │
│                                                           │
└───────────────┬─────────────────┬───────────────────────┘
                │                 │
                │                 │
    ┌───────────▼──────┐   ┌─────▼──────────┐
    │  OrderForm.tsx   │   │ OrderTable.tsx │
    │  (observer)      │   │ (observer)     │
    │                  │   │                │
    │  Writes to store │   │ Reads from     │
    │  via actions     │   │ store          │
    └──────────────────┘   └────────────────┘
```

## 🎨 Styling Architecture (Tailwind CSS)

```
tailwind.config.ts
    │
    │ Defines theme, colors, breakpoints
    ▼
app/globals.css
    │
    │ @tailwind base;
    │ @tailwind components;
    │ @tailwind utilities;
    ▼
Components use utility classes
    │
    ├─→ <div className="bg-blue-600 text-white p-4">
    ├─→ <button className="hover:bg-blue-700">
    └─→ <table className="min-w-full divide-y">
```

## 🔄 Form Validation Flow (React Hook Form)

```
User types in input
        │
        ▼
React Hook Form tracks value (via ref)
        │
        │ User clicks Submit
        ▼
handleSubmit() triggered
        │
        ▼
Validation runs
        │
        ├─→ ❌ Invalid → Show errors, don't submit
        │
        └─→ ✅ Valid → Call onSubmit(data)
                            │
                            ▼
                    Data is clean and validated!
```

## 📡 API Communication

```
Client (Browser)                    Server (Node.js)
     │                                    │
     │  POST /api/order                   │
     │  Content-Type: application/json    │
     │  Body: { symbol, quantity, ... }   │
     ├────────────────────────────────────▶
     │                                    │
     │                              Receive request
     │                                    │
     │                              Parse JSON body
     │                                    │
     │                              Validate data
     │                                    │
     │                              Create order
     │                                    │
     │                              Generate ID
     │                                    │
     │                              Store in memory
     │                                    │
     │  HTTP 201 Created                  │
     │  { success: true, order: {...} }   │
     ◀────────────────────────────────────┤
     │                                    │
Update MobX store                         │
     │                                    │
Components re-render                      │
```

## 🚀 Application Startup Sequence

```
1. npm run dev
        │
        ▼
2. Node.js runs server/server.js
        │
        ▼
3. Express server created
        │
        ▼
4. Next.js app.prepare()
        │
        ├─→ Compile TypeScript
        ├─→ Process Tailwind CSS
        ├─→ Set up hot reloading
        └─→ Prepare pages
        │
        ▼
5. Define Express routes
        │
        ├─→ POST /api/order
        ├─→ GET /api/orders
        └─→ DELETE /api/orders
        │
        ▼
6. Set up Next.js catch-all route
        │
        ▼
7. server.listen(3000)
        │
        ▼
8. Server ready! 🚀
        │
        ▼
9. Browser visits http://localhost:3000
        │
        ▼
10. Next.js serves app/page.tsx
        │
        ▼
11. User clicks "Go to Order Form"
        │
        ▼
12. Next.js serves app/order/page.tsx
        │
        ▼
13. useEffect runs → fetchOrders()
        │
        ▼
14. GET /api/orders → Returns existing orders
        │
        ▼
15. OrderStore updates → Components render
        │
        ▼
16. Application ready for user interaction! ✅
```

## 🧩 Technology Integration

```
┌────────────────────────────────────────────────────┐
│                   Next.js                           │
│  (Framework - orchestrates everything)              │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │            React                          │      │
│  │  (UI Library - components)                │      │
│  │                                            │      │
│  │  ┌────────────────────────────────────┐   │      │
│  │  │  MobX                               │   │      │
│  │  │  (State Management)                 │   │      │
│  │  └────────────────────────────────────┘   │      │
│  │                                            │      │
│  │  ┌────────────────────────────────────┐   │      │
│  │  │  React Hook Form                   │   │      │
│  │  │  (Form Management)                  │   │      │
│  │  └────────────────────────────────────┘   │      │
│  │                                            │      │
│  │  ┌────────────────────────────────────┐   │      │
│  │  │  Tailwind CSS                      │   │      │
│  │  │  (Styling)                          │   │      │
│  │  └────────────────────────────────────┘   │      │
│  └──────────────────────────────────────────┘      │
│                                                      │
│  ┌──────────────────────────────────────────┐      │
│  │  Express                                  │      │
│  │  (Custom Server - API endpoints)          │      │
│  └──────────────────────────────────────────┘      │
└────────────────────────────────────────────────────┘
```

## 📝 File Responsibility Matrix

| File | Responsibility | Technologies Used |
|------|---------------|-------------------|
| `server/server.js` | HTTP server, API endpoints, data storage | Express, Next.js |
| `stores/OrderStore.ts` | State management, API calls | MobX, Fetch API |
| `components/OrderForm.tsx` | Form UI, validation, submission | React, React Hook Form, MobX |
| `components/OrderTable.tsx` | Display orders, reactive updates | React, MobX |
| `app/order/page.tsx` | Page layout, component composition | Next.js, React |
| `app/globals.css` | Global styles, Tailwind directives | Tailwind CSS |
| `tailwind.config.ts` | Tailwind configuration | Tailwind CSS |
| `tsconfig.json` | TypeScript configuration | TypeScript |

## 🎓 Key Architectural Decisions

### 1. Why MobX over Redux?
- **Simpler**: Less boilerplate code
- **Intuitive**: Direct state mutation
- **Better for beginners**: Easier learning curve

### 2. Why Custom Server?
- **Learning**: Understand server-client architecture
- **Flexibility**: Full control over API endpoints
- **Real-world**: Most production apps need custom backend logic

### 3. Why React Hook Form?
- **Performance**: Uncontrolled inputs = fewer re-renders
- **DX**: Better developer experience with less code
- **Validation**: Built-in validation rules

### 4. Why Tailwind CSS?
- **Speed**: Rapid UI development
- **Consistency**: Design system built-in
- **Learning**: No need to learn complex CSS architecture

### 5. Why TypeScript?
- **Safety**: Catch errors before runtime
- **Documentation**: Types serve as documentation
- **Tooling**: Better IDE support

---

This architecture provides a solid foundation for building modern web applications! 🚀
