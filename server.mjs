import express from 'express';
import { fileURLToPath } from 'url'; // Import the 'fileURLToPath' function from the 'url' module
import path from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to __filename
const __dirname = path.dirname(__filename); // Derive __dirname from __filename

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/data', async (req, res) => {
    try {
        // Replace 'your_client_id' and 'your_client_secret' with your actual credentials
        const clientId = 'X7XBEI853G3G7T2C8K0CUO84FHW9RB3Z';
        const clientSecret = 'IQFFNDNDCN6HFZ01DED83Q5F1LEISF1M';
        const credentials = { id: clientId, secret: clientSecret };

        // Construct the authorization header
        const base64Credentials = Buffer.from(`${credentials.id}:${credentials.secret}`).toString('base64');
        const headers = { 'Authorization': `Basic ${base64Credentials}` };

        // Make API request with user-input value and authorization header
        const response = await fetch('https://api.limblecmms.com:443/v2/tasks/?locations=13425&orderBy=-createdDate&limit=20&completedStart=0&status=0', {
            method: 'GET',
            headers: headers
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
