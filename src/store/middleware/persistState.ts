// src/store/middlewares/persistState.ts
import { StateCreator, StoreApi } from 'zustand';

export const persist = <T>(
  config: StateCreator<T>,
  storageKey: string
): StateCreator<T> => (set, get, api) => {
  // Create a temporary object to hold the initial state
  const initialState = config(set, get, api);
  // Check if we are on the client side to access localStorage
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem(storageKey);
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        // Merge the stored state with the initial state
        Object.assign(initialState as object, parsedState);
      } catch (e) {
        console.error("Failed to parse stored state from localStorage", e);
      }
    }
  }

  // The original state creator function
  const originalSet = set;
  set = (updater) => {
    originalSet(updater);
    const state = get();
    // Save the new state to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  };

  return initialState; // Return the hydrated initial state
};