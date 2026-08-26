import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { makeExcerpt } from './excerpt'

export function getPostsFrom(subdir = 'notebook') {
    const notebook = fs.readdirSync(path.join('data', subdir))

    const notes = notebook.map(filename => {
        const slug = filename.replace('.md', '')

        const markdownWithMeta = fs.readFileSync(path.join('data', subdir, filename), 'utf-8')
        const { data: frontmatter, content } = matter(markdownWithMeta)

        return {
            slug,
            subdir,
            frontmatter,
            content,
            excerpt: makeExcerpt(frontmatter, content)
        }
    })
    return notes
}

export function getPathsFrom(subdir = 'notebook') {
    const files = fs.readdirSync(path.join('data', subdir))

    return files.map(filename => ({
        params: {
            slug: filename.replace('.md', ''),
            subdir: subdir
        }
    }))
}