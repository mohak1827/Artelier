# Admin Authentication Testing Guide

## Quick Start

### 1. Create an Admin User in MongoDB

**Option A: Using MongoDB Compass**
1. Open MongoDB Compass
2. Connect to your database
3. Find the `users` collection
4. Find a user or create one
5. Add/Update field: `isAdmin: true`

**Option B: Using MongoDB Shell**
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

**Option C: Create New Admin User**
```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@artelier.com",
  password: "$2a$10$...", // Use bcrypt to hash password
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

### 2. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd ..
npm run dev
```

---

## Test Scenarios

### ✅ Test 1: Admin Login Success
**Steps:**
1. Open http://localhost:5173
2. Click "Login" button in navbar
3. Click "Log in as Admin" link
4. Enter admin credentials (email with `isAdmin: true`)
5. Click "Access Dashboard"

**Expected Result:**
- ✅ Login successful
- ✅ Redirected to `/admin`
- ✅ See "Artelier Admin Dashboard" header
- ✅ See admin name in header
- ✅ See "Logout" button
- ✅ NO navbar visible
- ✅ See order management interface

---

### ✅ Test 2: Admin Login with Normal User Credentials
**Steps:**
1. Open http://localhost:5173
2. Click "Login" button
3. Click "Log in as Admin"
4. Enter normal user credentials (email with `isAdmin: false` or no isAdmin field)
5. Click "Access Dashboard"

**Expected Result:**
- ❌ Login fails
- ✅ Error message: "Access denied. You do not have administrator privileges."
- ✅ Stays on login modal

---

### ✅ Test 3: Normal User Login Success
**Steps:**
1. Open http://localhost:5173
2. Click "Login" button
3. Enter normal user credentials
4. Click "Sign In"

**Expected Result:**
- ✅ Login successful
- ✅ Redirected to `/profile`
- ✅ See navbar at top
- ✅ See sidebar with profile options
- ✅ Can access cart, wishlist, orders

---

### ✅ Test 4: Normal User Login with Admin Credentials
**Steps:**
1. Open http://localhost:5173
2. Click "Login" button
3. Enter admin credentials (email with `isAdmin: true`)
4. Click "Sign In" (NOT "Log in as Admin")

**Expected Result:**
- ❌ Login fails
- ✅ Error message: "Admin users must use the administrator portal login."
- ✅ Stays on login modal

---

### ✅ Test 5: Admin Cannot Access User Routes
**Steps:**
1. Login as admin
2. Verify you're on `/admin`
3. Try to navigate to `/profile` by typing in URL bar
4. Try to navigate to `/cart`
5. Try to navigate to `/wishlist`

**Expected Result:**
- ✅ Automatically redirected back to `/admin`
- ✅ Cannot access any user routes

---

### ✅ Test 6: User Cannot Access Admin Routes
**Steps:**
1. Login as normal user
2. Verify you're on `/profile` or another user page
3. Try to navigate to `/admin` by typing in URL bar

**Expected Result:**
- ✅ Automatically redirected to `/` (home page)
- ✅ Cannot access admin dashboard

---

### ✅ Test 7: Admin Session Persists on Refresh
**Steps:**
1. Login as admin
2. Verify you're on `/admin`
3. Refresh the page (F5 or Ctrl+R)

**Expected Result:**
- ✅ Still on `/admin` after refresh
- ✅ Still see admin dashboard
- ✅ Session maintained

---

### ✅ Test 8: User Session Persists on Refresh
**Steps:**
1. Login as normal user
2. Navigate to `/cart` or `/wishlist`
3. Refresh the page

**Expected Result:**
- ✅ Still logged in
- ✅ Still on the same page
- ✅ Session maintained

---

### ✅ Test 9: Admin Logout
**Steps:**
1. Login as admin
2. Click "Logout" button in admin header

**Expected Result:**
- ✅ Logged out successfully
- ✅ Redirected to `/` (home page)
- ✅ See public navbar with "Login" button
- ✅ Cannot access `/admin` anymore

---

### ✅ Test 10: Unauthenticated Access to Protected Routes
**Steps:**
1. Make sure you're logged out
2. Try to navigate to `/admin`
3. Try to navigate to `/profile`
4. Try to navigate to `/cart`

**Expected Result:**
- ✅ Redirected to `/` (home page)
- ✅ Cannot access any protected routes
- ✅ See login button in navbar

---

### ✅ Test 11: Auto-Redirect on Login
**Steps:**
1. Logout if logged in
2. Navigate to home page `/`
3. Login as admin

**Expected Result:**
- ✅ Immediately redirected to `/admin`
- ✅ No flash of user UI

**Steps:**
1. Logout
2. Navigate to home page
3. Login as normal user

**Expected Result:**
- ✅ Redirected to `/profile`
- ✅ See user dashboard

---

## Browser Console Checks

### Check JWT Token (Chrome DevTools)
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Cookies" → "http://localhost:5173"
4. Find "token" cookie
5. Copy token value
6. Go to https://jwt.io
7. Paste token
8. Check payload contains `isAdmin: true` for admin users

### Check User State in React DevTools
1. Install React DevTools extension
2. Open DevTools
3. Go to "Components" tab
4. Find `AuthProvider` component
5. Check `user` state
6. Verify `isAdmin` field is correct

---

## API Testing with Postman/Thunder Client

### Test Admin Login Endpoint
```http
POST http://localhost:5000/api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@artelier.com",
  "password": "your-password"
}
```

**Expected Response (Success):**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@artelier.com",
    "isAdmin": true,
    ...
  }
}
```

**Expected Response (Failure - Not Admin):**
```json
{
  "message": "Access denied. You do not have administrator privileges."
}
```

### Test User Login Endpoint
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Expected Response (Success):**
```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Normal User",
    "email": "user@example.com",
    "isAdmin": false,
    ...
  }
}
```

**Expected Response (Failure - Is Admin):**
```json
{
  "message": "Admin users must use the administrator portal login."
}
```

### Test Protected Admin Endpoint
```http
GET http://localhost:5000/api/admin/orders
Cookie: token=<your-jwt-token>
```

**Expected Response (Admin):**
```json
{
  "success": true,
  "orders": [...]
}
```

**Expected Response (Non-Admin):**
```json
{
  "message": "Access Denied: Not authorized as an administrator."
}
```

---

## Common Issues & Solutions

### Issue: "Cannot read property 'isAdmin' of null"
**Solution:** User is not logged in. Check if `/auth/me` endpoint is working.

### Issue: Redirects not working
**Solution:** 
1. Clear browser cache and cookies
2. Check React Router version (should be v6)
3. Verify `AutoRedirect` component is rendering

### Issue: Admin login accepts normal users
**Solution:**
1. Check if user has `isAdmin: true` in MongoDB
2. Verify backend `loginAdmin` function checks `user.isAdmin !== true`
3. Check if JWT includes `isAdmin` flag

### Issue: Session not persisting
**Solution:**
1. Check if cookies are enabled
2. Verify `withCredentials: true` in axios config
3. Check CORS settings: `credentials: true`

### Issue: "Access Denied" even for admin
**Solution:**
1. Check JWT payload includes `isAdmin: true`
2. Verify `authMiddleware` attaches `isAdmin` to `req.user`
3. Check `AdminProtectedRoute` logic

---

## Debugging Tips

### Enable Detailed Logging

**Backend (authController.js):**
```javascript
console.log('Login attempt:', { email, isAdmin: user.isAdmin });
```

**Frontend (AuthContext.jsx):**
```javascript
console.log('User logged in:', user);
```

**Frontend (ProtectedRoute.jsx):**
```javascript
console.log('Route protection check:', { user, isAdmin: user?.isAdmin });
```

### Check Network Requests
1. Open DevTools → Network tab
2. Login as admin
3. Check `/auth/admin/login` request
4. Verify response includes `isAdmin: true`
5. Check if cookie is set

---

## Success Criteria

All tests should pass with the following outcomes:

✅ Admin can only login via "Log in as Admin"  
✅ Normal users can only login via "Sign In"  
✅ Admin sees isolated admin UI (no navbar)  
✅ User sees normal UI (navbar + sidebar)  
✅ Admin cannot access user routes  
✅ User cannot access admin routes  
✅ Sessions persist on refresh  
✅ Auto-redirect works correctly  
✅ Logout works for both roles  
✅ Unauthenticated users cannot access protected routes  

---

## Test Credentials Template

Create these test accounts in your database:

**Admin Account:**
- Email: `admin@artelier.com`
- Password: `Admin@123`
- isAdmin: `true`

**Normal User Account:**
- Email: `user@artelier.com`
- Password: `User@123`
- isAdmin: `false` (or not set)

---

## Video Recording Checklist

If recording a demo, show these scenarios:
1. ✅ Admin login → redirects to admin dashboard
2. ✅ Admin logout → redirects to home
3. ✅ User login → redirects to profile
4. ✅ User tries to access `/admin` → blocked
5. ✅ Admin tries to access `/profile` → blocked
6. ✅ Normal user tries admin login → error message
7. ✅ Page refresh maintains session
8. ✅ Logout clears session

---

**Happy Testing! 🎉**
