import TextEntry from '../models/TextEntry.js';
import duplicateDetection  from '../utils/duplicateDetection.js';
import crawlWebsite  from '../utils/webCrawler.js';

export const createTextEntry = async (req, res) => {
    try {
        const { title, content, urls } = req.body;
        const textEntries = await TextEntry.find();
        const duplicates = duplicateDetection([...textEntries, { title, content }]);

        if (duplicates.length > 0) {
            const modifiedDuplicates = duplicates
                .filter(duplicate => duplicate.content.includes(content))
                .map(duplicate => ({
                    _id: duplicate._id,
                    uuid: duplicate.uuid,
                    title: duplicate.title,
                    content: duplicate.content.replace(content, `[${content}]`)
                }));
            return res.status(400).json({ error: 'Duplicate content found', duplicates: modifiedDuplicates });
        }

        const crawlResults = await crawlWebsite(urls);
        const similarContent = crawlResults.filter(result => result.textContent.includes(content));

        if (similarContent.length > 0) {
            return res.status(400).json({ error: 'Similar content found on the website', content, similarContent });
        }

        const newTextEntry = new TextEntry({ title, content });
        await newTextEntry.save();
        res.status(201).json(newTextEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTextEntries = async (req, res) => {
    try {
        const textEntries = await TextEntry.find();
        res.status(200).json(textEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const detectDuplicates = async (req, res) => {
    try {
        const textEntries = await TextEntry.find();
        const duplicates = duplicateDetection(textEntries);
        res.status(200).json(duplicates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crawlAndCompare = async (req, res) => {
    try {
        const { urls } = req.body;
        const results = await crawlWebsite(urls);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
