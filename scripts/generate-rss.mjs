import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Feed } from 'feed';

const SITE_URL = 'https://priconceptions.com';

function getPublishedPosts() {
    const dir = path.join(process.cwd(), 'data', 'notebook');
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('.'));

    const posts = files.map(filename => {
        const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
        const { data: frontmatter } = matter(raw);
        return {
            slug: filename.replace('.md', ''),
            ...frontmatter,
        };
    });

    return posts
        .filter(p => p.publish)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

const posts = getPublishedPosts();

const feed = new Feed({
    title: 'priconceptions',
    description: "Priyanka's blog",
    id: SITE_URL,
    link: SITE_URL,
    language: 'en',
    feedLinks: {
        rss2: `${SITE_URL}/feed.xml`,
    },
    author: {
        name: 'Priyanka',
        link: SITE_URL,
    },
});

posts.forEach(post => {
    feed.addItem({
        title: post.title,
        id: `${SITE_URL}/notebook/${post.slug}`,
        link: `${SITE_URL}/notebook/${post.slug}`,
        description: post.description || '',
        date: new Date(post.date),
        category: post.category ? [{ name: post.category }] : [],
    });
});

fs.writeFileSync(path.join(process.cwd(), 'public', 'feed.xml'), feed.rss2());
console.log('RSS feed generated at public/feed.xml');
