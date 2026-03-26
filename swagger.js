const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Restaurant Menu API',
    description: 'API for managing restaurant menu items and categories'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);