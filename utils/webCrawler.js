import axios from 'axios';
import cheerio from 'cheerio';

const crawlWebsite = async (urls) => {
    const results = [];

    for (const url of urls) {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const paragraphs = $('p,span, h1, h2, h3, h4, h5, h6').map((i, el) => $(el).text().trim()).get();
            const textContent = paragraphs.join(' ').replace(/\s+/g, ' ').trim();
            results.push({ url, textContent });
        } catch (error) {
            console.error(`Error fetching ${url}:`, error.message);
            results.push({ url, error: error.message });
        }
    }

    return results;
};

export default crawlWebsite;