# Code Reference - Key Implementations

## Quick Code Snippets for Admin Authentication

---

## Backend Code

### 1. Generate JWT with isAdmin Flag

```javascript
// server/controllers/authController.js

const generateToken = (id, isAdmin = false) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
```

### 2. Admin Login Endpoint

```javascript
// server/controllers/authController.js

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // CRITICAL: Check the user's isAdmin status
    if (user.isAdmin !== true) {
      return res.status(403).json({ 
        message: 'Access denied. You do not have administrator privileges.' 
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### 3. User Login Endpoint (Rejects Admins)

```javascript
// server/controllers/authController.js

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Deny access to admins
    if (user.isAdmin === true) {
      return res.status(403).json({ 
        message: 'Admin users must use the administrator portal login.' 
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### 4. Auth Middleware with isAdmin

```javascript
// server/middleware/authMiddleware.js

const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, please login' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    
    // Attach isAdmin flag from JWT to req.user
    if (req.user) {
      req.user.isAdmin = decoded.isAdmin || req.user.isAdmin || false;
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
```

### 5. Admin Middleware

```javascript
// server/routes/adminRoutes.js

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) { 
    next();
  } else {
    res.status(403).json({ 
      message: 'Access Denied: Not authorized as an administrator.' 
    });
  }
};

// Usage
router.get('/orders', protect, admin, getAllOrders);
```

### 6. Send Token Response with isAdmin

```javascript
// server/controllers/authController.js

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id, user.isAdmin || false);

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode)
    .cookie('token', token, options) 
    .json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        about: user.about,
        cart: user.cart,
        wishlist: user.wishlist,
        favArtists: user.favArtists,
        isAdmin: user.isAdmin || false
      }
    });
};
```

---

## Frontend Code

### 1. AuthContext with loginAdmin

```javascript
// src/AuthContext.jsx

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) setUser(data.user);
      return { success: true, user: data.user }; 
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  const loginAdmin = async (email, password) => {
    try {
      const { data } = await api.post('/auth/admin/login', { email, password });
      if (data.success) setUser(data.user);
      return { success: true, user: data.user }; 
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Admin login failed' };
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, loginAdmin, logout, loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. AuthModal with Admin Mode

```javascript
// src/AuthModal.jsx

const AuthModal = ({ isOpen, onClose }) => {
  const { login, loginAdmin, signup } = useAuth();
  const navigate = useNavigate();
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Call appropriate login function based on admin mode
    const result = isAdminLogin 
      ? await loginAdmin(loginForm.email, loginForm.password)
      : await login(loginForm.email, loginForm.password);

    if (result.success) {
      onClose();
      
      // Redirect based on user role
      if (result.user?.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } else {
      setLoginErrors({ 
        email: result.error, 
        password: 'Check your credentials' 
      });
    }
    
    setIsLoading(false);
  };

  const toggleAdminMode = () => {
    setIsAdminLogin(!isAdminLogin);
    setLoginForm({ email: '', password: '' });
    setLoginErrors({});
  };

  return (
    <div className="modal-overlay">
      {/* ... */}
      <span onClick={toggleAdminMode}>
        {isAdminLogin ? '← Back to User Login' : 'Log in as Admin'}
      </span>
      {/* ... */}
    </div>
  );
};
```

### 3. Protected Route Components

```javascript
// src/ProtectedRoute.jsx

// User-only routes
export const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (user.isAdmin === true) return <Navigate to="/admin" replace />;
  
  return children;
};

// Admin-only routes
export const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;
  if (user.isAdmin !== true) return <Navigate to="/" replace />;
  
  return children;
};
```

### 4. Admin Layout Component

```javascript
// src/AdminLayout.jsx

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1>Artelier Admin Dashboard</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
```

### 5. Auto-Redirect Component

```javascript
// src/App.jsx

const AutoRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!loading && user) {
      const currentPath = window.location.pathname;
      
      // If admin is on homepage, redirect to admin dashboard
      if (user.isAdmin === true && currentPath === '/') {
        navigate('/admin', { replace: true });
      }
      // If normal user is on admin route, redirect to home
      else if (user.isAdmin !== true && currentPath.startsWith('/admin')) {
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, navigate]);
  
  return null;
};
```

### 6. App.jsx Route Structure

```javascript
// src/App.jsx

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AutoRedirect />
        
        <Routes>
          {/* PUBLIC ROUTES WITH NAVBAR */}
          <Route element={<LayoutWithNavbar />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            
            {/* USER ROUTES - Protected */}
            <Route element={
              <UserProtectedRoute>
                <UserDashboardLayout />
              </UserProtectedRoute>
            }>
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Route>
          </Route>

          {/* ADMIN ROUTES - Separate Layout */}
          <Route element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>

        <GlobalAuthModal />
      </Router>
    </AuthProvider>
  );
};
```

---

## Database Setup

### Create Admin User in MongoDB

```javascript
// MongoDB Shell or Compass
db.users.updateOne(
  { email: "admin@artelier.com" },
  { $set: { isAdmin: true } }
)

// Or insert new admin user
db.users.insertOne({
  name: "Admin User",
  email: "admin@artelier.com",
  password: "$2a$10$hashedPasswordHere", // Use bcrypt
  isAdmin: true,
  profileImage: "",
  about: "Administrator",
  cart: [],
  wishlist: [],
  favArtists: [],
  orders: [],
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## Environment Variables

```env
# .env file in server directory
JWT_SECRET=your-super-secret-jwt-key-here
MONGO_URI=mongodb://localhost:27017/artelier
PORT=5000
NODE_ENV=development
```

---

## Axios Configuration

```javascript
// src/api.jsx

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Essential for cookies
  headers: { 'Content-Type': 'application/json' },
});

export default api;
```

---

## CORS Configuration

```javascript
// server/server.js

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Essential for cookies
}));
```

---

## User Model Schema

```javascript
// server/models/User.js

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  about: { type: String, default: 'Art enthusiast and collector.' },
  
  // Admin Flag - Set to true manually in DB for admin users
  isAdmin: { type: Boolean, default: false },

  cart: [{ /* ... */ }],
  wishlist: [{ /* ... */ }],
  favArtists: [{ /* ... */ }],
  orders: [{ /* ... */ }]
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
```

---

## Route Configuration

```javascript
// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  loginAdmin,
  logoutUser, 
  getMe, 
  updateProfile 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);

// Protected Routes
router.get('/logout', logoutUser);
router.get('/me', protect, getMe);
router.put('/updateProfile', protect, updateProfile);

module.exports = router;
```

```javascript
// server/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { getAllOrders, updateOrderStatus } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) { 
    next();
  } else {
    res.status(403).json({ 
      message: 'Access Denied: Not authorized as an administrator.' 
    });
  }
};

router.get('/orders', protect, admin, getAllOrders);
router.put('/order/status', protect, admin, updateOrderStatus);

module.exports = router;
```

---

## Testing with cURL

### Test Admin Login

```bash
# Success case
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@artelier.com","password":"Admin@123"}' \
  -c cookies.txt

# Failure case (non-admin user)
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@artelier.com","password":"User@123"}'
```

### Test User Login

```bash
# Success case
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@artelier.com","password":"User@123"}' \
  -c cookies.txt

# Failure case (admin user)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@artelier.com","password":"Admin@123"}'
```

### Test Protected Admin Endpoint

```bash
curl -X GET http://localhost:5000/api/admin/orders \
  -b cookies.txt
```

---

## Common Patterns

### Check if User is Admin (Frontend)

```javascript
const { user } = useAuth();

if (user?.isAdmin === true) {
  // User is admin
} else {
  // User is not admin
}
```

### Conditional Rendering Based on Role

```javascript
const Navbar = () => {
  const { user } = useAuth();
  
  return (
    <nav>
      {user?.isAdmin === true ? (
        <Link to="/admin">Admin Dashboard</Link>
      ) : (
        <Link to="/profile">My Profile</Link>
      )}
    </nav>
  );
};
```

### Protect API Call (Frontend)

```javascript
const fetchAdminData = async () => {
  try {
    const { data } = await api.get('/admin/orders');
    setOrders(data.orders);
  } catch (err) {
    if (err.response?.status === 403) {
      alert('Access denied: Admin only');
      navigate('/');
    }
  }
};
```

---

## Debugging Snippets

### Log User State

```javascript
// In any component
const { user } = useAuth();
console.log('Current user:', user);
console.log('Is admin?', user?.isAdmin);
```

### Log JWT Payload

```javascript
// In browser console
const token = document.cookie
  .split('; ')
  .find(row => row.startsWith('token='))
  ?.split('=')[1];

if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log('JWT Payload:', payload);
}
```

### Check Protected Route

```javascript
// In ProtectedRoute.jsx
console.log('Route check:', {
  user,
  isAdmin: user?.isAdmin,
  loading,
  currentPath: window.location.pathname
});
```

---

## Error Messages Reference

| Scenario | Status | Message |
|----------|--------|---------|
| Invalid credentials | 401 | "Invalid credentials" |
| Admin using user login | 403 | "Admin users must use the administrator portal login." |
| User using admin login | 403 | "Access denied. You do not have administrator privileges." |
| No token | 401 | "Not authorized, please login" |
| Invalid token | 401 | "Not authorized, token failed" |
| Non-admin accessing admin route | 403 | "Access Denied: Not authorized as an administrator." |

---

## Quick Commands

```bash
# Start backend
cd server && npm start

# Start frontend
npm run dev

# Check MongoDB users
mongosh
use artelier
db.users.find({}, { name: 1, email: 1, isAdmin: 1 })

# Set user as admin
db.users.updateOne({ email: "user@example.com" }, { $set: { isAdmin: true } })

# Remove admin privileges
db.users.updateOne({ email: "admin@example.com" }, { $set: { isAdmin: false } })
```

---

This reference covers all the key code implementations for the admin authentication system.
