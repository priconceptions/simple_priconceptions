import React from 'react'
import PostCard from '../../components/PostCard'
import { getPostsFrom } from '../../lib/api'
import Link from 'next/link'
import Streak from '../../components/Streak'

const Now = ({ posts }) => {
    return (
        <>
            <h1>What I'm up to</h1>
            <p>This is a <Link href='https://nownownow.com/about'><a>now</a></Link> page. It should tell you what I'm up to these days. To see how I'm doing today, check out the streak section.</p>
            <h2>Writing</h2>
            <p>I'm writing regularly here, on my blog. Hoping to share more about my work and build in public.</p>

            <p>Experimenting with morning pages.</p>

            <p>Participating in London Writer's Salon  everyday-ish.</p>
            <div id="streak">
                <h2>The Streak</h2>
                <p>This section is inspired by <Link href='https://waitbutwhy.com/2015/12/the-tail-end.html'><a>Tim Urban's post, The Tail End</a></Link>. It's a way to visualize my days, months, and years and holistically evaluate how I'm doing.</p>
                {posts.map((post, index) => {
                    const { slug, subdir } = post
                    return <Streak key={index} {...post.frontmatter} subdir={subdir} slug={slug} />
                })}
            </div>
        </>
    )
}

export default Now


export async function getStaticProps() {

    const nows = getPostsFrom('now').sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))


    return {
        props: {
            posts: nows
        }
    }
}