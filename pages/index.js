import Head from 'next/head'
import { useState } from 'react'
import PostCard from '../components/PostCard'
import { getPostsFrom } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

export default function Home({ posts, topics }) {
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
        <title>Priyanka's internet home.</title>
      </Head>
      <div className='notebook-topics-section'>
        <h4>Topics:</h4>
        {topics.map((topic, index) => {
          return <button className={selectedTopics.indexOf(topic) === -1 ? '' : 'selected-button'} key={index} onClick={() => toggleSelectedTopics(topic)}>{topic}</button>
        })}
      </div>
      <div style={{ marginTop: '20px' }}>
        {posts.map((post, index) => {
          const { slug, subdir } = post
          return <PostCard key={index} {...post.frontmatter} description={post.excerpt} html={post.html} subdir={subdir} slug={slug} tags={post.frontmatter.tags} />
        })}
      </div>
    </>
  )
}

export async function getStaticProps() {

  const notebook = getPostsFrom('notebook').filter(post => post.frontmatter.publish)
  const newsletters = getPostsFrom('newsletters')

  const sorted = [...notebook, ...newsletters].sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))

  // Snippets show their whole body inline, so render it here. Raw markdown is
  // left out of the props for every post.
  const allWriting = await Promise.all(sorted.map(async ({ content, ...post }) => ({
    ...post,
    html: post.frontmatter.snippet ? await markdownToHtml(content) : null,
  })))
  const topics = [...notebook, ...newsletters].filter(post => post.frontmatter.category && post.frontmatter.category != '').map(post => post.frontmatter.category)

  return {
    props: {
      posts: allWriting,
      topics: topics,
    }
  }
}
