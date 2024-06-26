import React from 'react'
import { getPathsFrom } from '../../lib/api'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import markdownToHtml from '../../lib/markdownToHtml'
import Head from 'next/head'

const Note = ({ frontmatter: { title, date }, slug, htmlContent }) => {
    return (
        <>
            <Head>
               <title>{title}</title>
            </Head>
            <h1 className="post-title">{title}</h1>
            <time className="post-date">Published on {date}</time>
            <div>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
            </div>
        </>
    )
}

export default Note

export async function getStaticPaths() {
    const notebook = getPathsFrom('notebook')
    const paths = [...notebook]
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join('data', 'notebook', slug + '.md'), 'utf-8')
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