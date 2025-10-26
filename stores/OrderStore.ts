import { makeAutoObservable } from "mobx";

/**
 * 📚 TECHNICAL EXPLANATION: Order Types
 * 
 * These TypeScript types define the structure of our data:
 * - They provide type safety (TypeScript will warn us if we use wrong data types)
 * - They serve as documentation for what data our app handles
 */

export type OrderType = "Market" | "Limit" | "Stop Limit";
export type OrderSide = "Buy" | "Sell";
export type Symbol = "NIFTY" | "BANKNIFTY" | "RELIANCE" | "TCS";

export interface Order {
  id: string;
  symbol: Symbol;
  orderType: OrderType;
  quantity: number;
  price?: number; // Optional because Market orders don't need a price
  stopPrice?: number; // Optional because only Stop Limit orders need this
  side: OrderSide;
  timestamp: string;
}

/**
 * 📚 TECHNICAL EXPLANATION: MobX Store
 * 
 * MobX is a state management library that makes state "observable".
 * Think of it like Excel: when you change a cell, all formulas that depend on it
 * automatically recalculate. Similarly, when we change MobX state, all React
 * components that use that state automatically re-render.
 * 
 * Key MobX Concepts:
 * 
 * 1. Observable State: Data that MobX tracks for changes
 *    - In our case: the 'orders' array
 * 
 * 2. Actions: Functions that modify observable state
 *    - In our case: addOrder(), setOrders(), clearOrders()
 * 
 * 3. makeAutoObservable: A MobX function that automatically makes:
 *    - All properties observable
 *    - All methods actions
 *    - All getters computed values
 * 
 * Why use MobX instead of useState?
 * - useState is great for local component state
 * - MobX is better for global state shared across multiple components
 * - MobX automatically optimizes re-renders (only components using changed data re-render)
 */

class OrderStore {
  // Observable state: an array of orders
  orders: Order[] = [];

  // Loading state for async operations
  isLoading: boolean = false;

  constructor() {
    /**
     * makeAutoObservable does the magic:
     * - Makes 'orders' and 'isLoading' observable (MobX tracks changes)
     * - Makes all methods below into actions (can modify observable state)
     * - Automatically handles reactivity
     */
    makeAutoObservable(this);
  }

  /**
   * Action: Add a new order to the store
   * 
   * When this is called:
   * 1. The order is added to the orders array
   * 2. MobX detects the change
   * 3. All React components using this data automatically re-render
   */
  addOrder(order: Order) {
    this.orders.push(order);
  }

  /**
   * Action: Replace all orders with a new array
   * Useful when fetching orders from the server
   */
  setOrders(orders: Order[]) {
    this.orders = orders;
  }

  /**
   * Action: Clear all orders
   */
  clearOrders() {
    this.orders = [];
  }

  /**
   * Action: Set loading state
   */
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  /**
   * Async Action: Fetch orders from the server
   * 
   * This demonstrates how to handle async operations in MobX:
   * 1. Set loading to true
   * 2. Make the API call
   * 3. Update the state with the result
   * 4. Set loading to false
   */
  async fetchOrders() {
    this.setLoading(true);
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        this.setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * Async Action: Submit a new order to the server
   * 
   * This shows the typical flow:
   * 1. Send data to server (POST request)
   * 2. If successful, update local state
   * 3. Return success/failure
   */
  async submitOrder(orderData: Omit<Order, "id" | "timestamp">): Promise<boolean> {
    this.setLoading(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the order returned from server (which includes id and timestamp)
        this.addOrder(data.order);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to submit order:", error);
      return false;
    } finally {
      this.setLoading(false);
    }
  }
}

/**
 * Create a single instance of the store
 * 
 * This is the Singleton pattern:
 * - We create ONE instance of OrderStore
 * - All components share this same instance
 * - This ensures consistent state across the entire app
 */
const orderStore = new OrderStore();

export default orderStore;
