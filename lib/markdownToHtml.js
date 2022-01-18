// import remark from 'remark';
// import html from 'remark-html';
// import prism from 'remark-prism';
// import gfm from 'remark-gfm';

// export default async function markdownToHtml(markdown) {
//     const result = await remark().use(html).use(prism).process(markdown);
//     return result.toString();
// }

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import prism from 'remark-prism'

export default async function markdownToHtml(markdown) {
    const result = await unified()
        .use(remarkParse) // Parse markdown.
        .use(prism)
        .use(remarkGfm) // Support GFM (tables, autolinks, tasklists, strikethrough).
        .use(remarkRehype) // Turn it into HTML.
        .use(rehypeStringify) // Serialize HTML.
        .process(markdown)
    return result.toString();
}