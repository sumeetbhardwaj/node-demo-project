const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Demo Project',
      version: '1.0.0',
      description: 'Description of your API',
    },
    servers:[
        {
            api: "http://localhost:3000"
        }
    ]
  },
  // Path to the API docs
  apis: ['./router/routes.js'], // Specify the path to the routes folder where your route files are.
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
