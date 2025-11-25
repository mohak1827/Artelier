# Admin Authentication Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          AUTH MODAL                                  │
│  ┌──────────────────┐              ┌──────────────────┐            │
│  │   User Login     │              │   Admin Login    │            │
│  │  "Sign In" Tab   │              │ "Log in as Admin"│            │
│  └──────────────────┘              └──────────────────┘            │
│         │                                    │                       │
│         ▼                                    ▼                       │
│  POST /auth/login              POST /auth/admin/login               │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND VALIDATION                              │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  authController.js                                        │      │
│  │  ┌────────────────┐         ┌────────────────┐          │      │
│  │  │  loginUser()   │         │  loginAdmin()  │          │      │
│  │  │                │         │                │          │      │
│  │  │ • Check creds  │         │ • Check creds  │          │      │
│  │  │ • Reject if    │         │ • Reject if    │          │      │
│  │  │   isAdmin=true │         │   isAdmin≠true │          │      │
│  │  │ • Generate JWT │         │ • Generate JWT │          │      │
│  │  │   (isAdmin:    │         │   (isAdmin:    │          │      │
│  │  │    false)      │         │    true)       │          │      │
│  │  └────────────────┘         └────────────────┘          │      │
│  └──────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     JWT TOKEN GENERATION                             │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  generateToken(id, isAdmin)                              │      │
│  │  ┌────────────────────────────────────────────────┐     │      │
│  │  │  JWT Payload:                                   │     │      │
│  │  │  {                                              │     │      │
│  │  │    id: "user_id",                               │     │      │
│  │  │    isAdmin: true/false,                         │     │      │
│  │  │    iat: timestamp,                              │     │      │
│  │  │    exp: timestamp + 30 days                     │     │      │
│  │  │  }                                              │     │      │
│  │  └────────────────────────────────────────────────┘     │      │
│  │  Stored in httpOnly cookie                              │      │
│  └──────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FRONTEND ROUTE DECISION                           │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  AuthModal.jsx - handleLogin()                           │      │
│  │  ┌────────────────────────────────────────────────┐     │      │
│  │  │  if (result.user?.isAdmin === true)            │     │      │
│  │  │    → navigate('/admin')                        │     │      │
│  │  │  else                                           │     │      │
│  │  │    → navigate('/profile')                      │     │      │
│  │  └────────────────────────────────────────────────┘     │      │
│  └──────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                ┌─────────────────┴─────────────────┐
                │                                   │
                ▼                                   ▼
┌───────────────────────────┐       ┌───────────────────────────┐
│      ADMIN ROUTE          │       │       USER ROUTE          │
│      /admin               │       │       /profile            │
└───────────────────────────┘       └───────────────────────────┘
                │                                   │
                ▼                                   ▼
┌───────────────────────────┐       ┌───────────────────────────┐
│  AdminProtectedRoute      │       │  UserProtectedRoute       │
│  ┌─────────────────────┐  │       │  ┌─────────────────────┐  │
│  │ Check:              │  │       │  │ Check:              │  │
│  │ • User logged in?   │  │       │  │ • User logged in?   │  │
│  │ • isAdmin === true? │  │       │  │ • isAdmin !== true? │  │
│  │                     │  │       │  │                     │  │
│  │ If NO:              │  │       │  │ If NO:              │  │
│  │ → Redirect to /     │  │       │  │ → Redirect to /     │  │
│  │                     │  │       │  │                     │  │
│  │ If YES:             │  │       │  │ If isAdmin:         │  │
│  │ → Render children   │  │       │  │ → Redirect to /admin│  │
│  └─────────────────────┘  │       │  │                     │  │
│                           │       │  │ If YES:             │  │
│                           │       │  │ → Render children   │  │
│                           │       │  └─────────────────────┘  │
└───────────────────────────┘       └───────────────────────────┘
                │                                   │
                ▼                                   ▼
┌───────────────────────────┐       ┌───────────────────────────┐
│      AdminLayout          │       │   LayoutWithNavbar        │
│  ┌─────────────────────┐  │       │  ┌─────────────────────┐  │
│  │ • Custom Header     │  │       │  │ • Navbar            │  │
│  │ • Admin Name        │  │       │  │ • Public Links      │  │
│  │ • Logout Button     │  │       │  │                     │  │
│  │ • NO Navbar         │  │       │  └─────────────────────┘  │
│  │ • NO Sidebar        │  │       │           │               │
│  └─────────────────────┘  │       │           ▼               │
│           │               │       │  UserDashboardLayout      │
│           ▼               │       │  ┌─────────────────────┐  │
│  ┌─────────────────────┐  │       │  │ • Sidebar           │  │
│  │  AdminDashboard     │  │       │  │ • Profile Links     │  │
│  │  • Order Management │  │       │  │ • Cart, Wishlist    │  │
│  │  • User Orders      │  │       │  └─────────────────────┘  │
│  │  • Status Updates   │  │       │           │               │
│  └─────────────────────┘  │       │           ▼               │
│                           │       │  ┌─────────────────────┐  │
│                           │       │  │ Profile / Cart /    │  │
│                           │       │  │ Wishlist / Orders   │  │
│                           │       │  └─────────────────────┘  │
└───────────────────────────┘       └───────────────────────────┘
```

---

## Component Hierarchy

```
App.jsx
├── AuthProvider (Context)
│   ├── user state
│   ├── login()
│   ├── loginAdmin()
│   ├── logout()
│   └── loading state
│
├── AutoRedirect (Auto-navigation)
│   └── useEffect → checks user.isAdmin → redirects
│
├── Routes
│   │
│   ├── PUBLIC ROUTES (LayoutWithNavbar)
│   │   ├── / (HomePage)
│   │   ├── /artwork/:id
│   │   ├── /artists
│   │   ├── /auctions
│   │   └── /gallery
│   │
│   ├── USER ROUTES (LayoutWithNavbar + UserProtectedRoute)
│   │   ├── /payment
│   │   └── UserDashboardLayout
│   │       ├── /profile
│   │       ├── /cart
│   │       ├── /wishlist
│   │       ├── /fav-artists
│   │       └── /orders
│   │
│   └── ADMIN ROUTES (AdminLayout + AdminProtectedRoute)
│       └── /admin (AdminDashboard)
│
└── GlobalAuthModal
    ├── Login Tab (calls login())
    ├── Signup Tab (calls signup())
    └── Admin Login (calls loginAdmin())
```

---

## Data Flow

### 1. Login Flow

```
User Input (Email + Password)
        │
        ▼
AuthModal.jsx
        │
        ├─ isAdminLogin === true?
        │  │
        │  ├─ YES → loginAdmin(email, password)
        │  │         │
        │  │         ▼
        │  │    POST /api/auth/admin/login
        │  │         │
        │  │         ▼
        │  │    authController.loginAdmin()
        │  │         │
        │  │         ├─ Validate credentials
        │  │         ├─ Check isAdmin === true
        │  │         ├─ Generate JWT with isAdmin: true
        │  │         └─ Return user object
        │  │
        │  └─ NO → login(email, password)
        │            │
        │            ▼
        │       POST /api/auth/login
        │            │
        │            ▼
        │       authController.loginUser()
        │            │
        │            ├─ Validate credentials
        │            ├─ Check isAdmin !== true
        │            ├─ Generate JWT with isAdmin: false
        │            └─ Return user object
        │
        ▼
AuthContext.setUser(data.user)
        │
        ▼
Navigate based on user.isAdmin
        │
        ├─ isAdmin === true → navigate('/admin')
        └─ isAdmin === false → navigate('/profile')
```

### 2. Session Persistence Flow

```
Page Load / Refresh
        │
        ▼
AuthContext.useEffect()
        │
        ▼
GET /api/auth/me
        │
        ▼
authMiddleware.protect()
        │
        ├─ Extract JWT from cookie
        ├─ Verify JWT
        ├─ Decode payload (id, isAdmin)
        ├─ Fetch user from DB
        └─ Attach isAdmin to req.user
        │
        ▼
authController.getMe()
        │
        └─ Return user object with isAdmin
        │
        ▼
AuthContext.setUser(data.user)
        │
        ▼
AutoRedirect.useEffect()
        │
        ├─ Check current path
        ├─ Check user.isAdmin
        │
        ├─ If admin on / → navigate('/admin')
        └─ If user on /admin → navigate('/')
```

### 3. Route Protection Flow

```
User navigates to protected route
        │
        ▼
ProtectedRoute component
        │
        ├─ UserProtectedRoute
        │  │
        │  ├─ loading? → Show "Loading..."
        │  ├─ !user? → Redirect to /
        │  ├─ isAdmin === true? → Redirect to /admin
        │  └─ else → Render children
        │
        └─ AdminProtectedRoute
           │
           ├─ loading? → Show "Loading..."
           ├─ !user? → Redirect to /
           ├─ isAdmin !== true? → Redirect to /
           └─ else → Render children
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: Frontend Route Protection                      │
│ • UserProtectedRoute blocks admins                      │
│ • AdminProtectedRoute blocks non-admins                 │
│ • AutoRedirect prevents wrong UI loading                │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 2: JWT Token Validation                           │
│ • httpOnly cookie (XSS protection)                      │
│ • isAdmin flag in JWT payload                           │
│ • Token expiry (30 days)                                │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 3: Backend Endpoint Validation                    │
│ • Separate /auth/login and /auth/admin/login            │
│ • loginUser() rejects isAdmin === true                  │
│ • loginAdmin() rejects isAdmin !== true                 │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 4: Backend Middleware Protection                  │
│ • protect middleware validates JWT                      │
│ • admin middleware checks isAdmin === true              │
│ • Applied to all /api/admin/* routes                    │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 5: Database Level                                 │
│ • isAdmin field in User model                           │
│ • Only manually set in database                         │
│ • Cannot be changed via API                             │
└─────────────────────────────────────────────────────────┘
```

---

## State Management

```
┌─────────────────────────────────────────────────────────┐
│                    AuthContext State                     │
├─────────────────────────────────────────────────────────┤
│  user: {                                                 │
│    _id: string,                                          │
│    name: string,                                         │
│    email: string,                                        │
│    isAdmin: boolean,  ← KEY FIELD                       │
│    profileImage: string,                                 │
│    about: string,                                        │
│    cart: array,                                          │
│    wishlist: array,                                      │
│    favArtists: array                                     │
│  }                                                       │
│                                                          │
│  loading: boolean                                        │
│  isModalOpen: boolean                                    │
└─────────────────────────────────────────────────────────┘
                        │
                        ├─ Used by: ProtectedRoute
                        ├─ Used by: AutoRedirect
                        ├─ Used by: Navbar
                        ├─ Used by: AdminLayout
                        └─ Used by: All components
```

---

## API Endpoints Map

```
┌─────────────────────────────────────────────────────────┐
│                   PUBLIC ENDPOINTS                       │
├─────────────────────────────────────────────────────────┤
│ POST /api/auth/signup                                    │
│ POST /api/auth/login          (rejects admins)          │
│ POST /api/auth/admin/login    (rejects non-admins)      │
│ GET  /api/auth/logout                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  PROTECTED ENDPOINTS                     │
├─────────────────────────────────────────────────────────┤
│ GET  /api/auth/me             [protect]                 │
│ PUT  /api/auth/updateProfile  [protect]                 │
│ GET  /api/user/cart           [protect]                 │
│ POST /api/user/cart           [protect]                 │
│ ... (other user endpoints)                              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   ADMIN ENDPOINTS                        │
├─────────────────────────────────────────────────────────┤
│ GET  /api/admin/orders        [protect, admin]          │
│ PUT  /api/admin/order/status  [protect, admin]          │
└─────────────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
Login Attempt
     │
     ├─ Invalid Credentials
     │  └─ 401: "Invalid credentials"
     │
     ├─ Admin using User Login
     │  └─ 403: "Admin users must use the administrator portal login."
     │
     ├─ User using Admin Login
     │  └─ 403: "Access denied. You do not have administrator privileges."
     │
     ├─ No Token on Protected Route
     │  └─ 401: "Not authorized, please login"
     │
     ├─ Invalid/Expired Token
     │  └─ 401: "Not authorized, token failed"
     │
     └─ Non-Admin accessing Admin Route
        └─ 403: "Access Denied: Not authorized as an administrator."
```

---

This architecture ensures complete separation between admin and user flows with multiple layers of security and validation.
