import React, {useState} from 'react'
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
              ({frontmatter}) =>
                selectedTopics.indexOf(frontmatter.category) !== -1 ||
                selectedTopics.length < 1
            )

    return (
        <>
            <div>
                <h3>Topics:</h3>
                {topics.map((topic, index) => {
                    let bgColor =
                      selectedTopics.indexOf(topic) === -1
                        ? 'inherit'
                        : '#d8b9ff';
                    return <button style={{backgroundColor: bgColor}} key={index} onClick={() => toggleSelectedTopics(topic)}>{topic}</button>
                })}
            </div>
            <div style={{marginTop: '20px'}}>
                {posts.map((post, index) => {
                    const { slug, subdir } = post
                    return <PostCard key={index} {...post.frontmatter} subdir={subdir} slug={slug} />
                })}
            </div>
        </>
    )
}

export default Notebook


export async function getStaticProps() {

    const nows = getPostsFrom('notebook')
    const newsletters = getPostsFrom('newsletters')

    const allWriting = [...nows, ...newsletters].sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))

    let topics = [...nows, ...newsletters].filter(post => post.frontmatter.category && post.frontmatter.category != '').map(post => post.frontmatter.category)

    return {
        props: {
            posts: allWriting,
            topics: topics
        }
    }
}