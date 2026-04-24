import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'guestbook.json');

function readEntries() {
    const raw = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(raw);
}

function writeEntries(entries) {
    fs.writeFileSync(dataPath, JSON.stringify(entries, null, 2));
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const entries = readEntries();
        return res.status(200).json(entries);
    }

    if (req.method === 'POST') {
        const { username, message, website } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const entry = {
            username: (username && username.trim()) || 'Anonymous',
            message: message.trim(),
            website: (website && website.trim()) || '',
            date: new Date().toISOString(),
        };

        const entries = readEntries();
        entries.unshift(entry);
        writeEntries(entries);

        return res.status(201).json(entry);
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
