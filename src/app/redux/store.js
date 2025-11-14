import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { combineReducers } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";

// --------------------------------------------------
// 1. Use sessionStorage instead of localStorage
//    (Safer for HIPAA because it clears on browser close)
// --------------------------------------------------
const sessionStorage = createWebStorage("session");

// --------------------------------------------------
// 2. Create encryption transform
//    Uses secretKey (must be stored in env variables)
// --------------------------------------------------
const encryptor = encryptTransform({
  secretKey:
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY ||
    "default-key-change-in-production",
  onError: (error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Encryption error:", error);
    }
  },
});

// --------------------------------------------------
// 3. Combine reducers
// --------------------------------------------------
const rootReducer = combineReducers({
  user: userSlice,
});

// --------------------------------------------------
// 4. Persist configuration (HIPAA Safe)
// --------------------------------------------------
const persistConfig = {
  key: "root",
  storage: sessionStorage, // HIPAA safer than localStorage
  stateReconciler: autoMergeLevel2,
  whitelist: ["user"], // Only persist user slice
  transforms: [encryptor], // Encrypt persisted data
  // NOTE: Sensitive fields should NOT be stored in userSlice anyway
};

// --------------------------------------------------
// 5. Wrap reducers with persistence
// --------------------------------------------------
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --------------------------------------------------
// 6. Create store
// --------------------------------------------------
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST], // Required for redux-persist
      },
    }),
});

// --------------------------------------------------
// 7. Export persistor instance
// --------------------------------------------------
export const persistor = persistStore(store);
