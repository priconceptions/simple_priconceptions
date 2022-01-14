import React from 'react'
import PostCard from '../../components/PostCard'
import { getPostsFrom } from '../../lib/api'

const Notebook = ({ posts }) => {
    return (
        <div>
            {posts.map((post, index) => {
                const { slug, subdir } = post
                return <PostCard key={index} {...post.frontmatter} subdir={subdir} slug={slug} />
            })}
        </div>
    )
}

export default Notebook


export async function getStaticProps() {

    const nows = getPostsFrom('notebook').sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))


    return {
        props: {
            posts: nows
        }
    }
}