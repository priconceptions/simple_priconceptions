import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import remark from 'remark';
import html from 'remark-html';
import matter from 'gray-matter'
import markdownToHtml from '../../lib/markdownToHtml'

const read = promisify(fs.readFile);

const Now = ({ htmlContent }) => {
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </>
    );
}

export default Now;

export async function getStaticProps() {
    // Specify the path to your markdown file
    const markdownPath = path.join(process.cwd(), 'data', 'now', 'now.md');

    // Read the markdown file
    const markdownContent = await read(markdownPath, 'utf8');

    const { data: frontmatter, content } = matter(markdownContent)

    const htmlContent = await markdownToHtml(content)
    return {
        props: {
            htmlContent
        }
    }
}
