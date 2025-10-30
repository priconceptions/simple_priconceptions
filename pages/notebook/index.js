import Head from 'next/head';
import React, { useState } from 'react'
import PostCard from '../../components/PostCard'
import { getPostsFrom } from '../../lib/api'

const Notebook = ({ posts, topics }) => {
    const [selectedTopics, setSelectedTopics] = useState([]);

    const toggleSelectedTopics = (topic) => {
        const topicIndex = selectedTopics.indexOf(topic);
        topicIndex === -1
            ? selectedTopics.push(topic)
            : selectedTopics.splice(topicIndex, 1);
        setSelectedTopics([...selectedTopics]);
    };

    topics = [...new Set(topics)]
    posts = posts
        .filter(
            ({ frontmatter }) =>
                selectedTopics.indexOf(frontmatter.category) !== -1 ||
                selectedTopics.length < 1
        )


    return (
        <>
            <Head>
                <title>Notebook</title>
            </Head>
            {/* <h1>Notes</h1> */}
            <div className='notebook-topics-section'>
                <h4>Topics:</h4>
                {topics.map((topic, index) => {
                    return <button className={selectedTopics.indexOf(topic) === -1 ? '' : 'selected-button'} key={index} onClick={() => toggleSelectedTopics(topic)}>{topic}</button>
                })}
            </div>
            <div style={{ marginTop: '20px' }}>
                {posts.map((post, index) => {
                    const { slug, subdir } = post
                    return <PostCard key={index} {...post.frontmatter} subdir={subdir} slug={slug} tags={post.frontmatter.tags} />
                })}
            </div>
        </>
    )
}

export default Notebook


export async function getStaticProps() {

    const notebook = getPostsFrom('notebook').filter(post => post.frontmatter.publish)
    const newsletters = getPostsFrom('newsletters')

    const allWriting = [...notebook, ...newsletters].sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))
    let topics = [...notebook, ...newsletters].filter(post => post.frontmatter.category && post.frontmatter.category != '').map(post => post.frontmatter.category)
    // let tags = [...notebook, ...newsletters].filter(post => post.frontmatter.tags).map(post => post.frontmatter.tags)
    // tags = [...new Set(tags)]
    return {
        props: {
            posts: allWriting,
            topics: topics,
        }
    }
}