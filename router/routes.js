const express = require("express");
const { addUser, login, logout } = require("../controller/userController");
const { createProduct, gatAllProducts } = require("../controller/projectsController");
const { isAuth } = require("../meddleware/authMeddleware");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

const Router = express.Router();

// Use Swagger UI Express for API documentation
Router.route('/swagger').get(swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * @swagger
 * /add_user:
 *   post:
 *     summary: Create a new resource
 *     description: Endpoint to create a new resource
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: JSON object containing data for creating the resource
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *       '400':
 *         description: Bad request, invalid input
 */
Router.route("/add_user").post(addUser)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Create a new resource
 *     description: Endpoint to create a new resource
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: JSON object containing data for creating the resource
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *       '400':
 *         description: Bad request, invalid input
 */
Router.route("/login").post(login)

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Create a new resource
 *     description: Endpoint to create a new resource
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *       '400':
 *         description: Bad request, invalid input
 */
Router.route("/logout").get(isAuth, logout)


/**
 * @swagger
 * /api/project/create:
 *   post:
 *     summary: Create a new resource
 *     description: Endpoint to create a new resource
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *       - in: body
 *         name: body
 *         required: true
 *         description: JSON object containing data for creating the resource
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *       '400':
 *         description: Bad request, invalid input
 */

Router.route("/api/project/create").post(isAuth, createProduct)
/**
 * @swagger
 * /api/project/get:
 *   get:
 *     summary: Create a new resource
 *     description: Endpoint to create a new resource
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     responses:
 *       '201':
 *         description: Resource created successfully
 *       '400':
 *         description: Bad request, invalid input
 */

Router.route("/api/project/get").get(isAuth,gatAllProducts)

module.exports = Router