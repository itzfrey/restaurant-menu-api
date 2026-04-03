require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>🍽️ Restaurant Menu API</h1>
    <p>${req.session.user ? `Logged in as ${req.session.user.displayName}` : 'You are logged out'}</p>
    <ul>
      <li><a href="/api-docs">/api-docs</a> - API Documentation</li>
      <li><a href="/menu-items">/menu-items</a> - Menu Items</li>
      <li><a href="/categories">/categories</a> - Categories</li>
      <li><a href="/auth/github">/auth/github</a> - Login with GitHub</li>
      <li><a href="/auth/logout">/auth/logout</a> - Logout</li>
    </ul>
  `);
});

// Routes
app.use('/auth', require('./routes/index'));
app.use('/menu-items', require('./routes/menuItems'));
app.use('/categories', require('./routes/categories'));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.error('Connection error:', err));