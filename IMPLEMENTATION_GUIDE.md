# HIPAA Compliance Implementation Guide

## Step-by-Step Implementation with Code Examples

---

## Phase 1: Critical Security Fixes (Week 1)

### Step 1.1: Remove localStorage and Implement Secure Session Management

#### Create: `src/app/utils/sessionManager.js`
```javascript
"use client";

/**
 * Session Manager for HIPAA-compliant session handling
 * Uses httpOnly cookies (set by server) instead of localStorage
 */
export class SessionManager {
  static SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  static WARNING_TIME = 2 * 60 * 1000; // Warn 2 minutes before timeout
  static CHECK_INTERVAL = 60 * 1000; // Check every minute

  static timeoutId = null;
  static warningId = null;
  static lastActivity = Date.now();

  /**
   * Start session timer - call after successful login
   */
  static startSessionTimer() {
    this.lastActivity = Date.now();
    this.resetTimer();
    this.setupActivityListeners();
  }

  /**
   * Reset timer on user activity
   */
  static resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.warningId) {
      clearTimeout(this.warningId);
    }

    // Set warning timer
    this.warningId = setTimeout(() => {
      this.showTimeoutWarning();
    }, this.SESSION_TIMEOUT - this.WARNING_TIME);

    // Set logout timer
    this.timeoutId = setTimeout(() => {
      this.logout();
    }, this.SESSION_TIMEOUT);
  }

  /**
   * Setup activity listeners
   */
  static setupActivityListeners() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      this.lastActivity = Date.now();
      this.resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });
  }

  /**
   * Show timeout warning
   */
  static showTimeoutWarning() {
    // Show modal or notification
    const confirmed = window.confirm(
      'Your session will expire in 2 minutes due to inactivity. Click OK to continue.'
    );
    
    if (confirmed) {
      this.resetTimer();
    }
  }

  /**
   * Logout and clear session
   */
  static async logout() {
    try {
      // Call logout API to clear server-side session
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies
      });
    } catch (error) {
      // Log error but continue with logout
      console.error('Logout error:', error);
    } finally {
      // Clear any client-side state
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
        // Redirect to login
        window.location.href = '/login';
      }
    }
  }

  /**
   * Check if session is still valid
   */
  static isSessionValid() {
    const timeSinceActivity = Date.now() - this.lastActivity;
    return timeSinceActivity < this.SESSION_TIMEOUT;
  }

  /**
   * Get remaining session time in seconds
   */
  static getRemainingTime() {
    const timeSinceActivity = Date.now() - this.lastActivity;
    const remaining = this.SESSION_TIMEOUT - timeSinceActivity;
    return Math.max(0, Math.floor(remaining / 1000));
  }
}
```

#### Update: `src/app/services/APIInstance.js`
```javascript
import axios from "axios";
import { SessionManager } from "@/app/utils/sessionManager";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Validate HTTPS in production
if (process.env.NODE_ENV === 'production' && baseURL.startsWith('http://')) {
  throw new Error('API URL must use HTTPS in production');
}

// Create axios instance
export const api = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true, // Include cookies in requests
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Check session validity
    if (!SessionManager.isSessionValid()) {
      SessionManager.logout();
      return Promise.reject(new Error('Session expired'));
    }

    // Cookies are automatically included via withCredentials
    // No need to manually add tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Reset session timer on successful request
    SessionManager.resetTimer();
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      SessionManager.logout();
      return Promise.reject(new Error('Unauthorized'));
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      return Promise.reject(new Error('Access denied'));
    }

    // Sanitize error before returning
    const sanitizedError = {
      status: error.response?.status || 500,
      message: getSafeErrorMessage(error),
      // Never include: request data, user info, tokens, stack traces
    };

    // Log error securely (server-side)
    logErrorSecurely({
      status: sanitizedError.status,
      endpoint: error.config?.url,
      timestamp: new Date().toISOString(),
      // No PHI or sensitive data
    });

    return Promise.reject(sanitizedError);
  }
);

/**
 * Get safe error message without exposing system details
 */
function getSafeErrorMessage(error) {
  // Generic error messages
  if (error.response?.status === 400) {
    return 'Invalid request. Please check your input.';
  }
  if (error.response?.status === 404) {
    return 'Resource not found.';
  }
  if (error.response?.status === 500) {
    return 'Server error. Please try again later.';
  }
  if (error.response?.status === 503) {
    return 'Service temporarily unavailable.';
  }
  
  return 'An error occurred. Please try again.';
}

/**
 * Log error securely (implement server-side)
 */
function logErrorSecurely(errorData) {
  // In production, send to secure logging service
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', errorData);
  }
  // TODO: Implement server-side logging API
  // fetch('/api/logs/error', { method: 'POST', body: JSON.stringify(errorData) });
}

export default api;
```

---

### Step 1.2: Create Secure Logging Utility

#### Create: `src/app/utils/logger.js`
```javascript
/**
 * Secure logging utility for HIPAA compliance
 * Never logs PHI or sensitive data
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

class Logger {
  /**
   * Sanitize data to remove PHI
   */
  sanitize(data) {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const sensitiveKeys = [
      'password',
      'token',
      'authToken',
      'email',
      'phone',
      'ssn',
      'name',
      'fullName',
      'address',
      'medicalRecord',
      'diagnosis',
      'prescription',
    ];

    const sanitized = { ...data };
    
    sensitiveKeys.forEach(key => {
      if (sanitized[key]) {
        sanitized[key] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  /**
   * Log error
   */
  error(message, error = null) {
    const logData = {
      level: LOG_LEVELS.ERROR,
      message,
      timestamp: new Date().toISOString(),
      error: error ? this.sanitize({
        message: error.message,
        status: error.status,
      }) : null,
    };

    if (isDevelopment) {
      console.error(logData);
    } else {
      // Send to secure logging service
      this.sendToLoggingService(logData);
    }
  }

  /**
   * Log info
   */
  info(message, data = null) {
    const logData = {
      level: LOG_LEVELS.INFO,
      message,
      timestamp: new Date().toISOString(),
      data: data ? this.sanitize(data) : null,
    };

    if (isDevelopment) {
      console.log(logData);
    } else {
      this.sendToLoggingService(logData);
    }
  }

  /**
   * Log warning
   */
  warn(message, data = null) {
    const logData = {
      level: LOG_LEVELS.WARN,
      message,
      timestamp: new Date().toISOString(),
      data: data ? this.sanitize(data) : null,
    };

    if (isDevelopment) {
      console.warn(logData);
    } else {
      this.sendToLoggingService(logData);
    }
  }

  /**
   * Send to secure logging service (implement server-side)
   */
  sendToLoggingService(logData) {
    // TODO: Implement server-side logging API
    // fetch('/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(logData),
    // }).catch(() => {
    //   // Fail silently - don't break app if logging fails
    // });
  }
}

export const logger = new Logger();
export default logger;
```

---

### Step 1.3: Update Redux Store with Encryption

#### Update: `src/app/redux/store.js`
```javascript
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { combineReducers } from "redux";
import createEncryptor from "redux-persist-transform-encrypt";

// Use sessionStorage instead of localStorage (cleared on browser close)
const sessionStorage = createWebStorage("session");

// Create encryptor (use environment variable for key)
const encryptor = createEncryptor({
  secretKey: process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default-key-change-in-production",
  onError: (error) => {
    // Log error without exposing details
    if (process.env.NODE_ENV === 'development') {
      console.error("Encryption error:", error);
    }
  },
});

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage, // Use sessionStorage
  stateReconciler: autoMergeLevel2,
  whitelist: ["user"], // Only persist user slice
  transforms: [encryptor], // Encrypt persisted data
  // Blacklist sensitive fields in userSlice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
```

#### Update: `src/app/redux/slices/userSlice.js`
```javascript
import { createSlice } from "@reduxjs/toolkit";

// Only store non-PHI data
const initialState = {
  isAuthenticated: false,
  userId: null, // Only ID, not full user info
  role: null,
  sessionId: null,
  // DO NOT store: name, email, phone, medical records, addresses, etc.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.sessionId = action.payload.sessionId;
      // Never store PHI in state
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
      state.sessionId = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
```

---

### Step 1.4: Add Security Headers

#### Update: `next.config.mjs`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Adjust based on your needs
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              `connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'}`,
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; ')
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

### Step 1.5: Improve Input Sanitization

#### Install DOMPurify:
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

#### Update: `src/app/utils/InputFunction.js`
```javascript
import DOMPurify from 'dompurify';

/**
 * Comprehensive input sanitization for HIPAA compliance
 */
export const sanitizeInput = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value !== 'string') {
    return String(value);
  }

  // Use DOMPurify for HTML sanitization
  let sanitized = DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');

  // Remove data URIs that could contain scripts
  sanitized = sanitized.replace(/data:text\/html/gi, '');

  return sanitized.trim();
};

/**
 * Sanitize HTML tags validation
 */
export const sanitizeHtmlTags = () => ({
  validate: (value) => {
    if (!value || typeof value !== 'string') {
      return true;
    }

    const sanitized = sanitizeInput(value);
    
    // Check if any HTML was removed (indicating malicious input)
    if (sanitized !== value.trim()) {
      return "HTML tags and scripts are not allowed.";
    }

    // Additional security checks
    if (/javascript:/i.test(value)) {
      return "JavaScript code is not allowed.";
    }

    if (/on\w+\s*=/i.test(value)) {
      return "Event handlers are not allowed.";
    }

    if (/<script/i.test(value)) {
      return "Script tags are not allowed.";
    }

    return true;
  },
});

export const handleKeyPress = (e) => {
  const target = e.target;
  if (e.key === " " && target.selectionStart === 0) {
    e.preventDefault();
  }
};

export const handleSpace = (e) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};
```

#### Update: `src/app/components/ui/InputField.js`
```javascript
"use client";

import { sanitizeInput, sanitizeHtmlTags } from "@/app/utils/InputFunction";

export default function InputField({
  label,
  name,
  type = "text",
  placeholder = "",
  error,
  register,
  validationRules = {},
  disabled = false,
  autoComplete,
  onKeyDown,
  className = "",
  watch,
  ...rest
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-[20px] text-(--black)"
        >
          {label}
        </label>
      )}

      <div className="mt-2 relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          autoCorrect="off"
          spellCheck={false}
          onKeyDown={onKeyDown}
          className={`w-full rounded-xl text-[16px] [box-shadow:var(--boxshadow-input)] px-3 h-[60px] outline-none bg-white placeholder:text-(--grayshade)`}
          {...(register
            ? register(name, {
                ...validationRules,
                ...sanitizeHtmlTags(),
                setValueAs: (value) => sanitizeInput(value), // Sanitize on set
                validate: validationRules.validate
                  ? (value) => {
                      const sanitized = sanitizeInput(value);
                      return validationRules.validate(sanitized, { watch });
                    }
                  : undefined,
              })
            : {})}
          {...rest}
        />
      </div>

      {error && (
        <p className="mt-2 text-[12px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

---

### Step 1.6: Update Password Validation

#### Update: `src/app/utils/Validation.js`
```javascript
import { TEXT } from "./Text";

export const validationRules = {
  userType: {
    required: TEXT.USER_TYPE_REQUIRED,
  },
  fullName: {
    required: TEXT.FULL_NAME_REQUIRED,
    minLength: {
      value: 2,
      message: TEXT.FULL_NAME_REQUIRED,
    },
    maxLength: {
      value: 100,
      message: "Name is too long",
    },
  },
  username: {
    required: TEXT.USER_REQUIRED,
    minLength: {
      value: 3,
      message: TEXT.USER_MIN,
    },
    maxLength: {
      value: 30,
      message: TEXT.USER_MAX,
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Username can only contain letters, numbers, and underscores",
    },
  },

  password: {
    required: TEXT.PASSWORD_REQUIRED,
    minLength: {
      value: 12, // HIPAA recommends 12+ characters
      message: "Password must be at least 12 characters long",
    },
    maxLength: {
      value: 128,
      message: "Password is too long",
    },
    validate: {
      hasUpperCase: (value) =>
        /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
      hasLowerCase: (value) =>
        /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
      hasNumber: (value) =>
        /[0-9]/.test(value) || "Password must contain at least one number",
      hasSpecialChar: (value) =>
        /[!@#$%^&*(),.?":{}|<>\[\]\\\/\-_+=~`]/.test(value) ||
        "Password must contain at least one special character",
      noCommonPasswords: (value) => {
        const commonPasswords = [
          'password', '123456', 'qwerty', 'admin', 'letmein',
          'welcome', 'monkey', '1234567890', 'abc123', 'password123'
        ];
        return !commonPasswords.includes(value.toLowerCase()) ||
          "Password is too common. Please choose a stronger password";
      },
      noPersonalInfo: (value, formValues) => {
        // Check if password contains username or email
        const username = formValues?.username || '';
        const email = formValues?.email || '';
        const lowerValue = value.toLowerCase();
        
        if (username && lowerValue.includes(username.toLowerCase())) {
          return "Password cannot contain your username";
        }
        if (email) {
          const emailLocal = email.split('@')[0].toLowerCase();
          if (lowerValue.includes(emailLocal)) {
            return "Password cannot contain your email";
          }
        }
        return true;
      }
    }
  },

  confirmPassword: {
    required: TEXT.CONFIRM_PASSWORD_REQUIRED,
    minLength: {
      value: 12,
      message: "Password must be at least 12 characters long",
    },
    maxLength: {
      value: 128,
      message: "Password is too long",
    },
  },

  email: {
    required: TEXT.PLEASE_ENTER_EMAIL,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: TEXT.ENTER_VALID_EMAIL,
    },
  },
  
  phone: {
    required: TEXT.PHONE_REQUIRED,
    pattern: {
      value: /^\+?[1-9]\d{1,14}$/, // E.164 international format
      message: TEXT.PHONE_INVALID,
    },
    validate: (value) => {
      const cleaned = value.replace(/[^\d+]/g, '');
      if (cleaned.length < 10 || cleaned.length > 15) {
        return 'Phone number must be between 10 and 15 digits';
      }
      return true;
    }
  },
};
```

---

### Step 1.7: Remove Console.log Statements

#### Update: `src/app/components/authComponent/SignUp.js`
```javascript
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/app/components/ui/InputField";
import UserTypeModal from "@/app/components/authComponent/UserTypeModal";
import { validationRules } from "@/app/utils/Validation";
import { TEXT } from "@/app/utils/Text";
import { handleKeyPress } from "@/app/utils/InputFunction";
import { logger } from "@/app/utils/logger";
import { SessionManager } from "@/app/utils/sessionManager";
import { APIClient } from "@/app/services/APIClient";

export default function SignUp({ role }) {
  // Remove: console.log("role", role);
  // Use logger if needed (only in development)
  if (process.env.NODE_ENV === 'development') {
    logger.info('SignUp component rendered', { role }); // No PHI
  }

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      userType: "",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const [isUserTypeOpen, setIsUserTypeOpen] = useState(false);
  const selectedUserType = watch("userType");

  const onSubmit = async (formData) => {
    try {
      // Remove: console.log("SignUp form:", formData);
      // Never log form data containing PHI
      
      // Sanitize data before sending
      const sanitizedData = {
        userType: formData.userType,
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.replace(/[^\d+]/g, ''),
        password: formData.password, // Will be hashed server-side
      };

      // Call API
      const response = await APIClient.post('/auth/signup', sanitizedData);
      
      // Log success (no PHI)
      logger.info('SignUp successful', { userType: sanitizedData.userType });
      
      // Start session timer after successful signup
      SessionManager.startSessionTimer();
      
      // Redirect or show success message
      // ...
    } catch (error) {
      // Handle error without exposing PHI
      logger.error('SignUp failed', error);
      // Show user-friendly error message
      // ...
    }
  };

  // ... rest of component
}
```

---

## Phase 2: Additional Security Enhancements

### Step 2.1: Create Rate Limiting Utility

#### Create: `src/app/utils/rateLimiter.js`
```javascript
"use client";

/**
 * Client-side rate limiting (complement to server-side rate limiting)
 */
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  /**
   * Check if action is allowed
   */
  isAllowed(key) {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record) {
      this.attempts.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    if (now > record.resetAt) {
      // Reset window
      this.attempts.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    if (record.count >= this.maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(key) {
    const record = this.attempts.get(key);
    if (!record) return this.maxAttempts;
    
    if (Date.now() > record.resetAt) {
      return this.maxAttempts;
    }
    
    return Math.max(0, this.maxAttempts - record.count);
  }

  /**
   * Reset attempts for a key
   */
  reset(key) {
    this.attempts.delete(key);
  }
}

// Create instances for different actions
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const signupRateLimiter = new RateLimiter(3, 60 * 60 * 1000); // 3 attempts per hour
export const passwordResetRateLimiter = new RateLimiter(3, 60 * 60 * 1000); // 3 attempts per hour
export const otpRateLimiter = new RateLimiter(3, 15 * 60 * 1000); // 3 attempts per 15 minutes
```

---

### Step 2.2: Create Error Boundary Component

#### Create: `src/app/components/ErrorBoundary.jsx`
```javascript
"use client";

import { Component } from "react";
import { logger } from "@/app/utils/logger";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error securely (no PHI)
    logger.error("React Error Boundary caught an error", {
      error: error.message,
      componentStack: errorInfo.componentStack,
      // Never log: user data, form data, tokens
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## Environment Variables Setup

### Create: `.env.example`
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Encryption (MUST be set in production)
NEXT_PUBLIC_ENCRYPTION_KEY=your-32-character-encryption-key-here

# Environment
NODE_ENV=production
```

### Important Notes:
1. **Never commit `.env` files** to version control
2. **Use strong encryption keys** (32+ characters, random)
3. **Rotate keys regularly**
4. **Use different keys for different environments**

---

## Testing Checklist

After implementing changes, test:

- [ ] Session timeout works correctly
- [ ] Logout clears all data
- [ ] No console.log in production build
- [ ] Security headers are present
- [ ] Input sanitization works
- [ ] Password validation enforces complexity
- [ ] Rate limiting prevents abuse
- [ ] Error messages don't expose PHI
- [ ] HTTPS is enforced in production
- [ ] Cookies are httpOnly (server-side)
- [ ] Redux persist doesn't store PHI
- [ ] Error boundary catches React errors

---

## Next Steps

1. **Server-Side Implementation:**
   - Implement httpOnly cookie authentication
   - Add server-side rate limiting
   - Implement audit logging
   - Add server-side input validation

2. **Security Audit:**
   - Penetration testing
   - Code security review
   - Dependency vulnerability scan

3. **Compliance Documentation:**
   - Update privacy policy
   - Document security measures
   - Create incident response plan

4. **Monitoring:**
   - Set up security monitoring
   - Implement alerting
   - Regular security assessments

---

**Note:** This guide provides client-side fixes. Full HIPAA compliance requires server-side implementation and proper infrastructure setup.

