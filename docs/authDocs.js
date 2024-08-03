/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *                 minLength: 6  # Optional: specify minimum length for password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully  # Optional: provide an example response
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com  # Optional: provide an example
 *                     uuid:
 *                       type: string
 *                       example: d0e4f2c0-85d3-4f1f-b1f1-77b818cb7b5c  # Optional: provide an example
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:  # Added `/auth/` path to maintain consistency
 *   post:
 *     summary: Login an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *                 minLength: 6  # Optional: specify minimum length for password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful  # Optional: provide an example response
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com  # Optional: provide an example
 *                     uuid:
 *                       type: string
 *                       example: d0e4f2c0-85d3-4f1f-b1f1-77b818cb7b5c  # Optional: provide an example
 *                     token:
 *                       type: string
 *                       example: your.jwt.token.here  # Optional: provide an example for the token
 *       400:
 *         description: User not found or invalid password
 *       500:
 *         description: Internal server error
 */
