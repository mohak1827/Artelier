import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, loginAdmin, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: 'Enter a password', color: '#ef4444' });

  useEffect(() => {
    if (!isOpen) {
      setLoginForm({ email: '', password: '' });
      setLoginErrors({});
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
      setSignupErrors({});
      setSignupSuccess({});
      setPasswordStrength({ score: 0, text: 'Enter a password', color: '#ef4444' });
      setActiveTab('login');
      setIsAdminLogin(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  const validateEmail = (email) => {
    if (!email) return { valid: false, error: 'Email is required' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { valid: false, error: 'Please enter a valid email address' };
    return { valid: true };
  };

  const validatePassword = (password) => {
    if (!password) return { score: 0, text: 'Enter a password', color: '#ef4444', valid: false };
    let score = 0;
    let feedback = [];
    if (password.length >= 8) score++; else feedback.push('at least 8 characters');
    if (/[a-z]/.test(password)) score++; else feedback.push('lowercase letters');
    if (/[A-Z]/.test(password)) score++; else feedback.push('uppercase letters');
    if (/[0-9]/.test(password)) score++; else feedback.push('numbers');
    if (/[^a-zA-Z0-9]/.test(password)) score++; else feedback.push('special characters');
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    return {
      score,
      text: score < 3 ? `${labels[score - 1] || labels[0]} - Add ${feedback.slice(0, 2).join(' and ')}` : labels[score - 1],
      color: colors[score - 1] || colors[0],
      valid: score >= 3
    };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginErrors({});

    const emailValidation = validateEmail(loginForm.email);
    if (!emailValidation.valid) {
      setLoginErrors({ email: emailValidation.error });
      setIsLoading(false);
      return;
    }

    if (!loginForm.password) {
      setLoginErrors({ password: 'Password is required' });
      setIsLoading(false);
      return;
    }

    const result = isAdminLogin
      ? await loginAdmin(loginForm.email, loginForm.password)
      : await login(loginForm.email, loginForm.password);

    if (result.success) {
      onClose();
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupErrors({});

    const errors = {};
    if (!signupForm.name || signupForm.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    const emailValidation = validateEmail(signupForm.email);
    if (!emailValidation.valid) errors.email = emailValidation.error;
    const passwordValidation = validatePassword(signupForm.password);
    if (!passwordValidation.valid) errors.password = 'Password is too weak';
    if (signupForm.password !== signupForm.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      setIsLoading(false);
      return;
    }

    const result = await signup(signupForm.name, signupForm.email, signupForm.password);

    if (result.success) {
      onClose();
      navigate('/profile');
    } else {
      setSignupErrors({ email: result.error });
    }
    setIsLoading(false);
  };

  const handlePasswordChange = (value) => {
    setSignupForm({ ...signupForm, password: value });
    setPasswordStrength(validatePassword(value));
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const result = await loginWithGoogle();
    setIsLoading(false);
    if (result.success) {
      onClose();
      navigate('/profile');
    }
  };

  if (!isOpen) return null;

  const toggleAdminMode = () => {
    setIsAdminLogin(!isAdminLogin);
    setLoginForm({ email: '', password: '' });
    setLoginErrors({});
    setActiveTab('login');
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>

        <div className="modal-header">
          <div className="modal-logo">
            {isAdminLogin ? 'Admin Portal Access' : 'Welcome to Artelier'}
          </div>
          <div className="modal-subtitle">
            {isAdminLogin ? 'Sign in with your admin credentials' : 'Join our community of art enthusiasts'}
          </div>
        </div>

        {!isAdminLogin && (
          <div className="modal-tabs">
            <button
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
        )}

        {(activeTab === 'login' || isAdminLogin) && (
          <div className="tab-content active">
            <div className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className={loginErrors.email ? 'error' : ''}
                />
                {loginErrors.email && <div className="error-message show">{loginErrors.email}</div>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className={loginErrors.password ? 'error' : ''}
                />
                {loginErrors.password && <div className="error-message show">{loginErrors.password}</div>}

                {!isAdminLogin && (
                  <div className="forgot-password">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Forgot your password?
                    </a>
                  </div>
                )}
              </div>

              <button
                type="button"
                className={`auth-btn ${isLoading ? 'loading' : ''} ${isAdminLogin ? 'admin-btn' : ''}`}
                disabled={isLoading}
                onClick={handleLogin}
              >
                {isLoading ? 'Verifying...' : isAdminLogin ? 'Access Dashboard' : 'Sign In'}
              </button>

              {!isAdminLogin && (
                <button
                  type="button"
                  className={`auth-btn google-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                  onClick={handleGoogleLogin}
                  style={{ marginTop: '0.75rem' }}
                >
                  <span className="google-icon-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        d="M21.35 11.1h-8.9v2.8h5.15c-.25 1.4-.98 2.58-2.1 3.37v2.8h3.4c2-1.84 3.15-4.55 3.15-7.67 0-.65-.06-1.27-.17-1.87z"
                        fill="#111827"
                      />
                      <path
                        d="M12.45 21.5c2.84 0 5.23-.94 6.97-2.53l-3.4-2.8c-.94.63-2.14 1-3.57 1-2.75 0-5.08-1.86-5.91-4.36H3.01v2.86c1.72 3.39 5.14 5.83 9.44 5.83z"
                        fill="#4b5563"
                      />
                      <path
                        d="M6.54 12.81c-.21-.63-.33-1.3-.33-2.01 0-.7.12-1.38.33-2.01V5.93H3.01A9.49 9.49 0 002 10.8c0 1.53.36 2.98 1.01 4.27l3.53-2.26z"
                        fill="#6b7280"
                      />
                      <path
                        d="M12.45 4.34c1.55 0 2.94.53 4.04 1.57l3.02-3.02C17.66 1.7 15.27.7 12.45.7 8.15.7 4.73 3.14 3.01 6.53l3.53 2.86c.83-2.5 3.16-5.05 5.91-5.05z"
                        fill="#9ca3af"
                      />
                    </svg>
                  </span>
                  <span className="google-btn-text">Continue with Google</span>
                </button>
              )}
            </div>

            <div className="admin-toggle-container">
              <span
                className="admin-toggle-link"
                onClick={toggleAdminMode}
              >
                {isAdminLogin ? '← Back to User Login' : 'Log in as Admin'}
              </span>
            </div>

            {!isAdminLogin && (
              <div className="terms-text">
                By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'signup' && !isAdminLogin && (
          <div className="tab-content active">
            <div className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className={signupErrors.name ? 'error' : ''}
                />
                {signupErrors.name && <div className="error-message show">{signupErrors.name}</div>}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className={signupErrors.email ? 'error' : signupSuccess.email ? 'success' : ''}
                  onBlur={(e) => {
                    const validation = validateEmail(e.target.value);
                    if (validation.valid) {
                      setSignupSuccess({ ...signupSuccess, email: 'Email format is valid' });
                    }
                  }}
                />
                {signupErrors.email && <div className="error-message show">{signupErrors.email}</div>}
                {signupSuccess.email && !signupErrors.email && <div className="success-message show">{signupSuccess.email}</div>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={signupErrors.password ? 'error' : ''}
                />
                {signupErrors.password && <div className="error-message show">{signupErrors.password}</div>}
                {signupForm.password && (
                  <div className="password-strength show">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${(passwordStrength.score / 5) * 100}%`,
                          background: passwordStrength.color
                        }}
                      ></div>
                    </div>
                    <div className="strength-text">{passwordStrength.text}</div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                  className={signupErrors.confirmPassword ? 'error' : (signupForm.confirmPassword && signupForm.password === signupForm.confirmPassword) ? 'success' : ''}
                />
                {signupErrors.confirmPassword && <div className="error-message show">{signupErrors.confirmPassword}</div>}
                {signupForm.confirmPassword && signupForm.password === signupForm.confirmPassword && (
                  <div className="success-message show">Passwords match</div>
                )}
              </div>

              <button
                type="button"
                className={`auth-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
                onClick={handleSignup}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="terms-text">
              By creating an account, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;