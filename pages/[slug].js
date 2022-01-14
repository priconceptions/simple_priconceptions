import React from 'react'
import { getPathsFrom } from '../lib/api'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const Post = () => {
    return (
        <div>
            Post
        </div>
    )
}

export default Post

export async function getStaticPaths() {
    const notebook = getPathsFrom()
    const newsletters = getPathsFrom('newsletters')
    const paths = [...notebook, ...newsletters]
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join('data', 'notebook', slug + '.md'), 'utf-8')
    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {

        }
    }
}