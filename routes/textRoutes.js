import express from 'express';
import {
    createTextEntry,
    getTextEntries,
    detectDuplicates,
    crawlAndCompare,
} from '../controllers/textController.js';
import '../docs/textDocs.js'; // Import Swagger documentation

const router = express.Router();

router.post('/text', createTextEntry);
router.get('/text', getTextEntries);
router.post('/text/detect-duplicates', detectDuplicates);
router.post('/text/crawl-and-compare', crawlAndCompare);

export default router;
