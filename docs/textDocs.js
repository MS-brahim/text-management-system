/**
 * @swagger
 * tags:
 *   name: Text
 *   description: The text management API
 */

/**
 * @swagger
 * /text:
 *   post:
 *     summary: Create a new text entry
 *     tags: [Text]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the text entry
 *                 example: "Title 1"
 *               content:
 *                 type: string
 *                 description: Content of the text entry
 *                 example: "Fringilla euismod ut duis est habitasse nostra scelerisque a tellus lorem vestibulum himenaeos at ullamcorper diam a cum pulvinar. Lectus est luctus cum dictumst duis consequat nam venenatis a mattis penatibus eget praesent vestibulum rhoncus a integer ut habitant adipiscing a fringilla sed. Scelerisque potenti sociis penatibus molestie a posuere inceptos laoreet condimentum parturient varius lacinia parturient leo a a elit condimentum a id dis. Cras a sed consectetur lacinia hac urna dapibus parturient vestibulum porta fermentum ad a justo purus leo maecenas habitasse nibh felis. Commodo ullamcorper diam quam et."
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: 
 *                      - "https://prisekeys.com/collar-brings-back-coffee-brewing-ritual"
 *                      - "https://prisekeys.com/reinterprets-the-classic-bookshelf"
 *                 description: URLs to crawl for similar content
 *     responses:
 *       201:
 *         description: Text entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: Unique identifier of the text entry
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       400:
 *         description: Duplicate content found or similar content found on the website
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /text:
 *   get:
 *     summary: Retrieve all text entries
 *     tags: [Text]
 *     responses:
 *       200:
 *         description: A list of text entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /text/detect-duplicates:
 *   post:
 *     summary: Detect duplicates in text entries
 *     tags: [Text]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: A list of detected duplicates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /text/crawl-and-compare:
 *   post:
 *     summary: Crawl websites and compare content
 *     tags: [Text]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urls:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example:
*                   - "https://prisekeys.com/collar-brings-back-coffee-brewing-ritual"
*                   - "https://prisekeys.com/reinterprets-the-classic-bookshelf"
 *                 description: List of URLs to crawl
 *     responses:
 *       200:
 *         description: Results of the crawl
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                   textContent:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
