# ⚡ Quick Reference Guide

Quick snippets and commands for common tasks in this project.

## 📋 Table of Contents
- [Commands](#commands)
- [Code Snippets](#code-snippets)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Commands

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint
```

### Testing API Endpoints

```bash
# Create an order
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "NIFTY",
    "orderType": "Market",
    "quantity": 10,
    "side": "Buy"
  }'

# Get all orders
curl http://localhost:3000/api/orders

# Clear all orders
curl -X DELETE http://localhost:3000/api/orders
```

---

## 💻 Code Snippets

### Adding a New Field to the Form

**1. Update TypeScript types** (`stores/OrderStore.ts`):
```typescript
export interface Order {
  // ... existing fields
  newField: string; // Add your new field
}
```

**2. Update form interface** (`components/OrderForm.tsx`):
```typescript
interface OrderFormData {
  // ... existing fields
  newField: string;
}
```

**3. Add form input** (`components/OrderForm.tsx`):
```typescript
<div>
  <label className="block text-sm font-medium mb-2">
    New Field
  </label>
  <input
    {...register("newField", { 
      required: "New field is required" 
    })}
    className="w-full px-4 py-2 border rounded-lg"
  />
  {errors.newField && (
    <p className="text-red-600">{errors.newField.message}</p>
  )}
</div>
```

**4. Add column to table** (`components/OrderTable.tsx`):
```typescript
// In table header
<th>New Field</th>

// In table body
<td>{order.newField}</td>
```

### Creating a New MobX Store

```typescript
// stores/NewStore.ts
import { makeAutoObservable } from "mobx";

class NewStore {
  // Observable state
  data: any[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Actions
  addData(item: any) {
    this.data.push(item);
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  // Computed values
  get dataCount() {
    return this.data.length;
  }
}

const newStore = new NewStore();
export default newStore;
```

### Using the Store in a Component

```typescript
"use client";

import { observer } from "mobx-react-lite";
import newStore from "@/stores/NewStore";

const MyComponent = observer(() => {
  const { data, isLoading } = newStore;

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default MyComponent;
```

### Adding a New API Endpoint

**In `server/server.js`**:
```javascript
// GET endpoint
server.get("/api/myendpoint", (req, res) => {
  try {
    const data = { message: "Hello" };
    res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong"
    });
  }
});

// POST endpoint with body
server.post("/api/myendpoint", (req, res) => {
  try {
    const { field1, field2 } = req.body;
    
    // Validation
    if (!field1 || !field2) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }
    
    // Process data
    const result = { field1, field2, id: generateId() };
    
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong"
    });
  }
});
```

### Form Validation Rules

```typescript
// Required field
{...register("field", { required: "This field is required" })}

// Minimum value
{...register("field", { 
  min: { value: 1, message: "Must be at least 1" }
})}

// Maximum value
{...register("field", { 
  max: { value: 100, message: "Must be at most 100" }
})}

// Pattern (regex)
{...register("email", { 
  pattern: { 
    value: /^\S+@\S+$/i, 
    message: "Invalid email" 
  }
})}

// Custom validation
{...register("field", { 
  validate: (value) => value % 2 === 0 || "Must be even"
})}

// Multiple rules
{...register("field", {
  required: "Required",
  min: { value: 1, message: "Min 1" },
  max: { value: 100, message: "Max 100" },
  validate: (value) => value > 0 || "Must be positive"
})}
```

### Tailwind CSS Common Patterns

```html
<!-- Card -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
  Content
</div>

<!-- Button -->
<button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
  Click me
</button>

<!-- Input -->
<input class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />

<!-- Flex center -->
<div class="flex items-center justify-center">
  Centered content
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">
  Responsive heading
</h1>
```

---

## 🔧 Common Tasks

### Task: Add a New Page

**1. Create page file**:
```bash
# Create directory and file
mkdir -p app/newpage
touch app/newpage/page.tsx
```

**2. Add page content** (`app/newpage/page.tsx`):
```typescript
export default function NewPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">New Page</h1>
      <p>Content goes here</p>
    </div>
  );
}
```

**3. Add link from another page**:
```typescript
import Link from "next/link";

<Link href="/newpage">Go to New Page</Link>
```

### Task: Add Loading State

```typescript
const MyComponent = observer(() => {
  const { isLoading } = myStore;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4">Loading...</span>
      </div>
    );
  }

  return <div>Content</div>;
});
```

### Task: Add Error Handling

```typescript
const [error, setError] = useState<string>("");

const handleAction = async () => {
  try {
    setError("");
    await someAsyncOperation();
  } catch (err) {
    setError("Something went wrong. Please try again.");
    console.error(err);
  }
};

// In JSX
{error && (
  <div className="bg-red-100 text-red-800 p-4 rounded-lg">
    {error}
  </div>
)}
```

### Task: Add Conditional Rendering

```typescript
// Show/hide based on condition
{condition && <div>Shown when true</div>}

// Show one or the other
{condition ? <div>True</div> : <div>False</div>}

// Multiple conditions
{condition1 ? (
  <div>Condition 1</div>
) : condition2 ? (
  <div>Condition 2</div>
) : (
  <div>Default</div>
)}
```

### Task: Format Data for Display

```typescript
// Format currency
const formatCurrency = (amount: number) => {
  return `₹${amount.toFixed(2)}`;
};

// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

// Format date and time
const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

// Format number with commas
const formatNumber = (num: number) => {
  return num.toLocaleString();
};
```

---

## 🐛 Troubleshooting

### Problem: Component not re-rendering when state changes

**Solution**: Wrap component with `observer()`
```typescript
import { observer } from "mobx-react-lite";

const MyComponent = observer(() => {
  // Component will now re-render when observables change
});
```

### Problem: Form validation not working

**Solution**: Check that you're using `handleSubmit` correctly
```typescript
const { register, handleSubmit } = useForm();

// ✅ Correct
<form onSubmit={handleSubmit(onSubmit)}>

// ❌ Wrong
<form onSubmit={onSubmit}>
```

### Problem: API endpoint not found (404)

**Solution**: Check server route definition
```javascript
// Make sure route is defined BEFORE the catch-all
server.post("/api/myroute", handler);

// This must come LAST
server.all("*", (req, res) => handle(req, res));
```

### Problem: TypeScript errors

**Solution**: Check types match
```typescript
// If you get type errors, make sure types match

// ✅ Correct
const quantity: number = 10;

// ❌ Wrong
const quantity: number = "10"; // String, not number

// Fix: Convert string to number
const quantity: number = parseInt("10");
// or
const quantity: number = Number("10");
```

### Problem: Styles not applying

**Solution**: Check Tailwind class names
```typescript
// ✅ Correct
<div className="bg-blue-600">

// ❌ Wrong
<div className="background-blue-600">

// Check Tailwind docs for correct class names:
// https://tailwindcss.com/docs
```

### Problem: Server won't start

**Solution**: Check if port is in use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

---

## 📚 Useful Resources

### Documentation Links
- [Next.js Docs](https://nextjs.org/docs)
- [MobX Docs](https://mobx.js.org/)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Docs](https://expressjs.com/)

### Cheat Sheets
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [TypeScript Cheat Sheet](https://www.typescriptlang.org/cheatsheets)
- [React Hook Form Examples](https://react-hook-form.com/get-started)

---

## 🎯 Quick Tips

1. **Always wrap MobX components with `observer()`**
2. **Use TypeScript types for better IDE support**
3. **Validate data on both client and server**
4. **Use Tailwind's responsive classes: `sm:`, `md:`, `lg:`**
5. **Check browser console for errors**
6. **Use React DevTools for debugging**
7. **Test API endpoints with curl or Postman**
8. **Keep components small and focused**
9. **Add comments for complex logic**
10. **Follow the existing code style**

---

**Need more help?** Check the detailed comments in each file! 📖
