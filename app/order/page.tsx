"use client";

import { useEffect } from "react";
import OrderForm from "@/components/OrderForm";
import OrderTable from "@/components/OrderTable";
import orderStore from "@/stores/OrderStore";
import Link from "next/link";

/**
 * 📚 TECHNICAL EXPLANATION: Order Page
 * 
 * This is the main page that brings together all our components.
 * 
 * Key Concepts:
 * 
 * 1. "use client" directive:
 *    - Next.js 13+ uses Server Components by default
 *    - "use client" tells Next.js this component needs client-side JavaScript
 *    - We need this because we're using hooks (useEffect) and interactive features
 * 
 * 2. useEffect hook:
 *    - Runs side effects after component mounts
 *    - We use it to fetch existing orders when the page loads
 *    - Empty dependency array [] means it runs only once on mount
 * 
 * 3. Component Composition:
 *    - We combine OrderForm and OrderTable components
 *    - Each component is independent and reusable
 *    - They communicate through the shared MobX store
 * 
 * Data Flow:
 * 1. Page loads → useEffect fetches orders from server
 * 2. User fills form → OrderForm component
 * 3. User submits → Data goes to OrderStore
 * 4. OrderStore sends to server → Server responds
 * 5. OrderStore updates → OrderTable automatically re-renders (MobX magic!)
 */

export default function OrderPage() {
  /**
   * Fetch orders when component mounts
   * 
   * This ensures we load any existing orders from the server
   * when the user first visits the page.
   */
  useEffect(() => {
    orderStore.fetchOrders();
  }, []); // Empty array = run once on mount

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Trading Order Form
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Place your trades and view order history
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Main Content - Form and Table */}
        <div className="space-y-8">
          {/* Order Form Section */}
          <div className="flex justify-center">
            <OrderForm />
          </div>

          {/* Order Table Section */}
          <div className="flex justify-center">
            <OrderTable />
          </div>
        </div>

        {/* Footer with Tech Stack Info */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            Built with Next.js, MobX, React Hook Form, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
