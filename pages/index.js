import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import PostCard from '../components/PostCard'
import Link from 'next/link'

import { getPostsFrom } from '../lib/api'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Priyanka's internet home.</title>
      </Head>
      <h1 >
        👋 Hi, I'm Priyanka
      </h1>
      <p>
      <i>
        Welcome to my little corner of the internet
      </i>
      </p>
      {/* <Image
        src={"/postImages/honest_work.jpeg"}
        alt="It ain't much but it's honest work."
        width={800}
        height={450}
        layout="responsive"
   />      */}
      <p>
        Here, I explain, think, practice, and complain (although I'm trying to do this less these days) 🙈
      </p>
      <h2>
        Work with me on Focusmate
      </h2>
      <p>
        How Focusmate works-- you book 25/50 minute sessions and get paired with random people on the platform. I usually work in 25 minute sessions and this platform has been invaluable to my sanity.
      </p>
      <p>Book sessions and work with me <Link href='https://www.focusmate.com/i/NVx59ZDMqI'><a>here</a></Link>!</p>
      {/* <h1>
        Recent Writing
      </h1> */}
      {/* <p>
        Check out more of my writing <Link href="/notebook"><a>here</a></Link>.
      </p>
      <div>
        {posts.slice(0, 5).map((post, index) => {
          const { slug, subdir } = post
          return <PostCard key={index} {...post.frontmatter} subdir={subdir} slug={slug} />
        })}
      </div> */}
      <h2>
        Now ⌛️
      </h2>
      <p>
        Check out what I'm up to <Link href="/now"><a>these days!</a></Link>
      </p>
      <h2>
        Say hi!
      </h2>
      <p><Link href='mailto:someone@priyankapdhavingfun@gmail.com'><a>Email me</a></Link>!</p>
    </>
  )
}

export async function getStaticProps() {

  const notes = getPostsFrom()
  const newsletters = getPostsFrom('newsletters')
  const allPosts = [...notes, ...newsletters].sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))

  return {
    props: {
      posts: allPosts
    }
  }
}
