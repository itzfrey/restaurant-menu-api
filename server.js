const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>🍽️ Restaurant Menu API</h1>
    <p>Welcome to the Restaurant Menu API. Use the routes below to get started:</p>
    <ul>
      <li><a href="/api-docs">/api-docs</a> - API Documentation</li>
      <li><a href="/menu-items">/menu-items</a> - Menu Items</li>
      <li><a href="/categories">/categories</a> - Categories</li>
    </ul>
  `);
});

// Routes
const menuItemsRouter = require('./routes/menuItems');
const categoriesRouter = require('./routes/categories');

// Swagger docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/menu-items', menuItemsRouter);
app.use('/categories', categoriesRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('Connection error:', err));