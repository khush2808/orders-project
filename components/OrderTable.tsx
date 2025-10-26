"use client";

import { observer } from "mobx-react-lite";
import orderStore from "@/stores/OrderStore";

/**
 * 📚 TECHNICAL EXPLANATION: OrderTable Component
 * 
 * This component displays all submitted orders in a table format.
 * 
 * Key Features:
 * 
 * 1. observer() wrapper: Makes it reactive to MobX state changes
 *    - When orderStore.orders changes, this component automatically re-renders
 *    - No need for useState or useEffect to manage the orders list
 * 
 * 2. Conditional Rendering:
 *    - Shows loading state while fetching
 *    - Shows empty state when no orders
 *    - Shows table when orders exist
 * 
 * 3. Responsive Design:
 *    - Uses Tailwind CSS for styling
 *    - Table is scrollable on small screens
 *    - Color-coded Buy (green) and Sell (red) for quick identification
 */

const OrderTable = observer(() => {
  /**
   * Access MobX store data
   * 
   * Because this component is wrapped with observer(),
   * it will automatically re-render when:
   * - orderStore.orders changes (new order added)
   * - orderStore.isLoading changes
   */
  const { orders, isLoading } = orderStore;

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-6xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          📊 Order Summary
        </h2>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600 dark:text-gray-400">
            Loading orders...
          </span>
        </div>
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-6xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          📊 Order Summary
        </h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No orders yet. Submit your first order above!
          </p>
        </div>
      </div>
    );
  }

  /**
   * Helper function to format timestamp
   * Converts ISO string to readable date/time
   */
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  /**
   * Helper function to format price
   * Shows "N/A" if price is not applicable (e.g., Market orders)
   */
  const formatPrice = (price?: number) => {
    return price !== undefined ? `₹${price.toFixed(2)}` : "N/A";
  };

  // Table with orders
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-6xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          📊 Order Summary
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total Orders: <span className="font-semibold">{orders.length}</span>
        </div>
      </div>

      {/* 
        Responsive table wrapper
        - overflow-x-auto: Makes table scrollable on small screens
        - This ensures the table doesn't break the layout on mobile
      */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Order Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Stop Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Side
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {/**
             * Map through orders array and create a row for each order
             * 
             * Key prop: React needs a unique key for each item in a list
             * - Helps React efficiently update the DOM
             * - We use order.id as it's unique for each order
             */}
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {order.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {order.orderType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {formatPrice(order.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {formatPrice(order.stopPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/**
                   * Color-coded side indicator
                   * - Buy orders: Green background
                   * - Sell orders: Red background
                   * This provides quick visual feedback
                   */}
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.side === "Buy"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {order.side}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {formatTimestamp(order.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clear Orders Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => orderStore.clearOrders()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
        >
          Clear All Orders
        </button>
      </div>
    </div>
  );
});

export default OrderTable;
