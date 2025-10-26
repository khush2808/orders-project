# 🎨 Visual Guide

A visual representation of how the application works.

## 🖥️ User Interface Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      HOME PAGE (/)                           │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │              Trading Order Form                         │  │
│  │     A learning project with Next.js, MobX,             │  │
│  │           and React Hook Form                           │  │
│  │                                                         │  │
│  │            ┌──────────────────────┐                    │  │
│  │            │ Go to Order Form →   │                    │  │
│  │            └──────────────────────┘                    │  │
│  │                                                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Click button
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   ORDER PAGE (/order)                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 📈 Place Order                        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                        │  │
│  │  Symbol:        [NIFTY ▼]                            │  │
│  │                                                        │  │
│  │  Order Type:    [Market ▼]                           │  │
│  │                                                        │  │
│  │  Quantity:      [____]                                │  │
│  │                                                        │  │
│  │  Side:          ◉ Buy  ○ Sell                        │  │
│  │                                                        │  │
│  │            [Submit Order]                             │  │
│  │                                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                📊 Order Summary                       │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ Symbol │ Type   │ Qty │ Price │ Stop │ Side │ Time  │  │
│  ├────────┼────────┼─────┼───────┼──────┼──────┼───────┤  │
│  │ NIFTY  │ Market │ 10  │ N/A   │ N/A  │ Buy  │ 10:30 │  │
│  │ TCS    │ Limit  │ 5   │ 3500  │ N/A  │ Sell │ 10:31 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Order Type Behavior

### Market Order
```
┌─────────────────────────────┐
│ Order Type: [Market ▼]      │
├─────────────────────────────┤
│ Quantity:   [10]            │
│ Side:       ◉ Buy  ○ Sell  │
│                             │
│ Price field: HIDDEN         │
│ Stop Price:  HIDDEN         │
└─────────────────────────────┘
```

### Limit Order
```
┌─────────────────────────────┐
│ Order Type: [Limit ▼]       │
├─────────────────────────────┤
│ Quantity:   [10]            │
│ Price:      [19500.50]      │ ← SHOWN
│ Side:       ◉ Buy  ○ Sell  │
│                             │
│ Stop Price:  HIDDEN         │
└─────────────────────────────┘
```

### Stop Limit Order
```
┌─────────────────────────────┐
│ Order Type: [Stop Limit ▼]  │
├─────────────────────────────┤
│ Quantity:   [10]            │
│ Price:      [19500.50]      │ ← SHOWN
│ Stop Price: [19450.00]      │ ← SHOWN
│ Side:       ◉ Buy  ○ Sell  │
└─────────────────────────────┘
```

## ✅ Form Validation States

### Empty Form (Invalid)
```
┌─────────────────────────────┐
│ Quantity:   [____]          │
│             ❌ Quantity is   │
│                required     │
│                             │
│ [Submit Order] ← Disabled   │
└─────────────────────────────┘
```

### Invalid Input
```
┌─────────────────────────────┐
│ Quantity:   [-5]            │
│             ❌ Quantity must │
│                be at least 1│
└─────────────────────────────┘
```

### Valid Form
```
┌─────────────────────────────┐
│ Quantity:   [10] ✓          │
│                             │
│ [Submit Order] ← Enabled    │
└─────────────────────────────┘
```

## 🎨 Color Coding

### Buy Orders (Green)
```
┌──────────────────────────────┐
│ NIFTY │ Market │ 10 │ 🟢 Buy │
└──────────────────────────────┘
```

### Sell Orders (Red)
```
┌──────────────────────────────┐
│ TCS   │ Limit  │ 5  │ 🔴 Sell│
└──────────────────────────────┘
```

## 📱 Responsive Design

### Desktop View
```
┌────────────────────────────────────────────────────────┐
│  [Form]                    [Table]                      │
│  ┌──────────┐             ┌────────────────────────┐  │
│  │          │             │                        │  │
│  │  Symbol  │             │  Symbol │ Type │ Qty  │  │
│  │  Type    │             │  ─────────────────────  │  │
│  │  Qty     │             │  NIFTY  │ Mkt  │ 10   │  │
│  │  Side    │             │  TCS    │ Lmt  │ 5    │  │
│  │          │             │                        │  │
│  │ [Submit] │             └────────────────────────┘  │
│  └──────────┘                                         │
└────────────────────────────────────────────────────────┘
```

### Mobile View
```
┌──────────────┐
│   [Form]     │
│  ┌────────┐  │
│  │ Symbol │  │
│  │ Type   │  │
│  │ Qty    │  │
│  │ Side   │  │
│  │[Submit]│  │
│  └────────┘  │
│              │
│   [Table]    │
│  ┌────────┐  │
│  │ NIFTY  │  │
│  │ Market │  │
│  │ 10     │  │
│  │ Buy    │  │
│  ├────────┤  │
│  │ TCS    │  │
│  │ Limit  │  │
│  │ 5      │  │
│  │ Sell   │  │
│  └────────┘  │
└──────────────┘
```

## 🔄 Loading States

### Form Submitting
```
┌─────────────────────────────┐
│                             │
│  [Submitting...] ⏳         │
│                             │
└─────────────────────────────┘
```

### Table Loading
```
┌─────────────────────────────┐
│    📊 Order Summary          │
├─────────────────────────────┤
│                             │
│      ⏳ Loading orders...   │
│                             │
└─────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────┐
│    📊 Order Summary          │
├─────────────────────────────┤
│                             │
│          📭                 │
│   No orders yet.            │
│   Submit your first order!  │
│                             │
└─────────────────────────────┘
```

## ✨ Success/Error Messages

### Success
```
┌─────────────────────────────┐
│ ✅ Order submitted           │
│    successfully!            │
└─────────────────────────────┘
```

### Error
```
┌─────────────────────────────┐
│ ❌ Failed to submit order.   │
│    Please try again.        │
└─────────────────────────────┘
```

## 🎯 Interactive Elements

### Hover States

**Button (Normal)**
```
┌──────────────┐
│ Submit Order │ ← Blue background
└──────────────┘
```

**Button (Hover)**
```
┌──────────────┐
│ Submit Order │ ← Darker blue + shadow
└──────────────┘
```

**Table Row (Normal)**
```
│ NIFTY │ Market │ 10 │ Buy │ ← White background
```

**Table Row (Hover)**
```
│ NIFTY │ Market │ 10 │ Buy │ ← Light gray background
```

## 🌓 Dark Mode

### Light Mode
```
┌─────────────────────────────┐
│  White background           │
│  Dark text                  │
│  Blue accents               │
└─────────────────────────────┘
```

### Dark Mode
```
┌─────────────────────────────┐
│  Dark gray background       │
│  Light text                 │
│  Blue accents               │
└─────────────────────────────┘
```

## 📊 Order Table Details

### Full Table View
```
┌──────────────────────────────────────────────────────────────────┐
│                      📊 Order Summary                             │
│                                          Total Orders: 3          │
├────────┬────────┬─────┬────────┬──────────┬──────┬──────────────┤
│ Symbol │ Type   │ Qty │ Price  │ Stop     │ Side │ Time         │
├────────┼────────┼─────┼────────┼──────────┼──────┼──────────────┤
│ NIFTY  │ Market │ 10  │ N/A    │ N/A      │ 🟢Buy│ 10:30:15 AM  │
│ TCS    │ Limit  │ 5   │ ₹3500  │ N/A      │ 🔴Sel│ 10:31:22 AM  │
│ RELIAN │ Stop L │ 15  │ ₹2450  │ ₹2400    │ 🟢Buy│ 10:32:45 AM  │
└────────┴────────┴─────┴────────┴──────────┴──────┴──────────────┘
                                              [Clear All Orders]
```

## 🔀 State Transitions

### Order Submission Flow
```
Idle State
    ↓
User fills form
    ↓
User clicks Submit
    ↓
Validating... ⏳
    ↓
    ├─→ Invalid ❌
    │   └─→ Show errors
    │       └─→ Stay in form
    │
    └─→ Valid ✓
        └─→ Submitting... ⏳
            ↓
            ├─→ Success ✅
            │   ├─→ Show success message
            │   ├─→ Clear form
            │   └─→ Update table
            │
            └─→ Error ❌
                └─→ Show error message
                    └─→ Stay in form
```

## 🎨 Component Hierarchy Visual

```
app/layout.tsx (Root)
│
├─ app/page.tsx (Home)
│  └─ Link to /order
│
└─ app/order/page.tsx (Order Page)
   │
   ├─ OrderForm.tsx
   │  │
   │  ├─ Symbol Select
   │  ├─ Order Type Select
   │  ├─ Quantity Input
   │  ├─ Price Input (conditional)
   │  ├─ Stop Price Input (conditional)
   │  ├─ Side Radio Buttons
   │  └─ Submit Button
   │
   └─ OrderTable.tsx
      │
      ├─ Table Header
      ├─ Table Body
      │  └─ Order Rows (map)
      └─ Clear Button
```

## 🎯 User Journey Map

```
1. User arrives at homepage
   │
   ├─ Sees project title
   ├─ Reads description
   └─ Clicks "Go to Order Form"
   │
2. Lands on order page
   │
   ├─ Sees empty form
   └─ Sees empty table
   │
3. Fills out form
   │
   ├─ Selects symbol
   ├─ Selects order type
   ├─ Fields appear/hide based on type
   ├─ Enters quantity
   ├─ Enters price (if needed)
   └─ Selects Buy/Sell
   │
4. Clicks Submit
   │
   ├─ Form validates
   ├─ Shows loading state
   └─ Sends to server
   │
5. Server processes
   │
   ├─ Validates data
   ├─ Creates order
   ├─ Stores in memory
   └─ Returns order
   │
6. UI updates
   │
   ├─ Shows success message
   ├─ Clears form
   └─ Order appears in table
   │
7. User sees result
   │
   └─ Can submit more orders
```

## 🎨 Color Palette

```
Primary Colors:
┌────────┐ ┌────────┐ ┌────────┐
│ Blue   │ │ Green  │ │ Red    │
│ #2563eb│ │ #10b981│ │ #ef4444│
└────────┘ └────────┘ └────────┘
 Buttons    Buy        Sell

Neutral Colors:
┌────────┐ ┌────────┐ ┌────────┐
│ White  │ │ Gray   │ │ Black  │
│ #ffffff│ │ #6b7280│ │ #000000│
└────────┘ └────────┘ └────────┘
 Light BG   Text       Dark BG
```

## 📐 Layout Breakpoints

```
Mobile          Tablet          Desktop
0-640px         641-1024px      1025px+

┌─────┐         ┌──────────┐    ┌────────────────┐
│     │         │          │    │                │
│  📱 │         │    💻    │    │      🖥️       │
│     │         │          │    │                │
└─────┘         └──────────┘    └────────────────┘

Stack           Stack           Side by side
vertically      vertically      horizontally
```

## 🎭 Animation Effects

### Button Hover
```
Normal:  [Submit Order]
Hover:   [Submit Order] ← Darker + Shadow
         ↑ Smooth transition (200ms)
```

### Table Row Hover
```
Normal:  │ NIFTY │ Market │ 10 │
Hover:   │ NIFTY │ Market │ 10 │ ← Background change
         ↑ Smooth transition
```

### Loading Spinner
```
    ⏳
   ↻ Spinning animation
   Infinite loop
```

## 🎯 Focus States

### Input Focus
```
Normal:  [________]
         Border: Gray

Focus:   [________]
         Border: Blue + Ring
         ↑ Indicates active field
```

### Button Focus
```
Normal:  [Submit Order]

Focus:   [Submit Order]
         ↑ Outline for accessibility
```

---

This visual guide helps you understand the UI/UX flow of the application! 🎨
