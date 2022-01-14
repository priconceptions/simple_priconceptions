import React from 'react'
import { getPathsFrom } from '../../lib/api'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import markdownToHtml from '../../lib/markdownToHtml'

const Note = ({ frontmatter: { title, date }, slug, htmlContent }) => {
    return (
        <>
            <h1 className="post-title">{title}</h1>
            <div className="post-date">{date}</div>
            <div>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
            </div>
        </>
    )
}

export default Note

export async function getStaticPaths() {
    const notebook = getPathsFrom('now')
    const paths = [...notebook]
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join('data', 'now', slug + '.md'), 'utf-8')
    const { data: frontmatter, content } = matter(markdownWithMeta)

    const htmlContent = await markdownToHtml(content)
    return {
        props: {
            frontmatter,
            slug,
            htmlContent
        }
    }
}