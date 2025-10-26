"use client";

import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import orderStore, { OrderType, OrderSide, Symbol } from "@/stores/OrderStore";
import { useState } from "react";

/**
 * 📚 TECHNICAL EXPLANATION: React Hook Form
 * 
 * React Hook Form is a library for handling forms in React efficiently.
 * 
 * Why use React Hook Form instead of managing form state with useState?
 * 
 * 1. Performance: It minimizes re-renders
 *    - With useState, every keystroke causes a re-render
 *    - React Hook Form uses uncontrolled inputs (refs), so typing doesn't re-render
 * 
 * 2. Built-in Validation: Easy to add validation rules
 *    - Required fields, min/max values, custom validation
 *    - Automatic error message handling
 * 
 * 3. Less Boilerplate: No need to write onChange handlers for each field
 * 
 * Key Concepts:
 * 
 * - register(): Connects an input to the form
 * - handleSubmit(): Wraps your submit function, validates first
 * - formState.errors: Contains validation errors
 * - watch(): Observes field values (useful for conditional fields)
 * - reset(): Clears the form
 */

/**
 * TypeScript interface for our form data
 * This defines what data the form will collect
 */
interface OrderFormData {
  symbol: Symbol;
  orderType: OrderType;
  quantity: number;
  price?: number;
  stopPrice?: number;
  side: OrderSide;
}

/**
 * 📚 TECHNICAL EXPLANATION: observer() wrapper
 * 
 * The observer() function from mobx-react-lite makes this component reactive.
 * 
 * What does it do?
 * - It wraps our component
 * - Tracks which MobX observables the component uses
 * - Automatically re-renders the component when those observables change
 * 
 * Example: If orderStore.isLoading changes from false to true,
 * this component will automatically re-render to show the loading state.
 */
const OrderForm = observer(() => {
  /**
   * useForm hook initialization
   * 
   * This returns several useful functions and objects:
   * - register: Function to register input fields
   * - handleSubmit: Function to handle form submission
   * - formState: Object containing form state (errors, isDirty, etc.)
   * - watch: Function to watch specific field values
   * - reset: Function to reset the form
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<OrderFormData>({
    defaultValues: {
      symbol: "NIFTY",
      orderType: "Market",
      side: "Buy",
      quantity: 1,
    },
  });

  // State for success message
  const [successMessage, setSuccessMessage] = useState<string>("");

  /**
   * watch() allows us to observe field values in real-time
   * We use this to show/hide Price and Stop Price fields based on Order Type
   */
  const orderType = watch("orderType");

  /**
   * Form submission handler
   * 
   * Flow:
   * 1. React Hook Form validates the data first
   * 2. If valid, this function is called with the data
   * 3. We submit to the MobX store
   * 4. Store handles the API call
   * 5. We show success/error message
   * 6. Reset the form
   */
  const onSubmit = async (data: OrderFormData) => {
    // Clear any previous success message
    setSuccessMessage("");

    // Submit to MobX store
    const success = await orderStore.submitOrder(data);

    if (success) {
      setSuccessMessage("✅ Order submitted successfully!");
      reset(); // Clear the form
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setSuccessMessage("❌ Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        📈 Place Order
      </h2>

      {/* Success/Error Message */}
      {successMessage && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            successMessage.includes("✅")
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Symbol Field */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Symbol
          </label>
          <select
            {...register("symbol", { required: "Symbol is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="NIFTY">NIFTY</option>
            <option value="BANKNIFTY">BANKNIFTY</option>
            <option value="RELIANCE">RELIANCE</option>
            <option value="TCS">TCS</option>
          </select>
          {errors.symbol && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.symbol.message}
            </p>
          )}
        </div>

        {/* Order Type Field */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Order Type
          </label>
          <select
            {...register("orderType", { required: "Order type is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="Market">Market</option>
            <option value="Limit">Limit</option>
            <option value="Stop Limit">Stop Limit</option>
          </select>
          {errors.orderType && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.orderType.message}
            </p>
          )}
        </div>

        {/* Quantity Field */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Quantity
          </label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              valueAsNumber: true, // Convert string to number
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter quantity"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* 
          Conditional Fields: Price and Stop Price
          
          These fields are shown/hidden based on the Order Type:
          - Market orders: No price fields needed
          - Limit orders: Need Price field
          - Stop Limit orders: Need both Price and Stop Price fields
        */}
        
        {/* Price Field (shown for Limit and Stop Limit) */}
        {(orderType === "Limit" || orderType === "Stop Limit") && (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required:
                  orderType === "Limit" || orderType === "Stop Limit"
                    ? "Price is required for Limit and Stop Limit orders"
                    : false,
                min: { value: 0.01, message: "Price must be greater than 0" },
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.price.message}
              </p>
            )}
          </div>
        )}

        {/* Stop Price Field (shown only for Stop Limit) */}
        {orderType === "Stop Limit" && (
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Stop Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("stopPrice", {
                required:
                  orderType === "Stop Limit"
                    ? "Stop Price is required for Stop Limit orders"
                    : false,
                min: {
                  value: 0.01,
                  message: "Stop Price must be greater than 0",
                },
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter stop price"
            />
            {errors.stopPrice && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.stopPrice.message}
              </p>
            )}
          </div>
        )}

        {/* Side Field (Buy/Sell) */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Side
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="Buy"
                {...register("side", { required: "Please select Buy or Sell" })}
                className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Buy</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="Sell"
                {...register("side", { required: "Please select Buy or Sell" })}
                className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Sell</span>
            </label>
          </div>
          {errors.side && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.side.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={orderStore.isLoading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {orderStore.isLoading ? "Submitting..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
});

export default OrderForm;
