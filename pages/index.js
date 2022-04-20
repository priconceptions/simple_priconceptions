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
        Hi, I'm Priyanka 👋
      </h1>
      <h2>
        Welcome to my little corner of the internet 🌐
      </h2>
      <p>
        About me--The TLDR version: I'm a software engineer and writer.
      </p>
      <h1>
        Recent Writing ✍️
      </h1>
      <p>
        Check out more of my writing <Link href="/notebook"><a>here</a></Link>.
      </p>
      <div>
        {posts.slice(0, 5).map((post, index) => {
          const { slug, subdir } = post
          return <PostCard key={index} {...post.frontmatter} subdir={subdir} slug={slug} />
        })}
      </div>
      <h1>
        Now ⌛️
      </h1>
      <p>
        Check out what I'm up to <Link href="/now"><a>these days!</a></Link>
      </p>
      <h1>
        Call me maybe? 📞
      </h1>
      <p>Message me on <Link href='https://twitter.com/priDhulkhed'><a>Twitter</a></Link> or through <Link href='mailto:someone@priyankapdhavingfun@gmail.com'><a>email</a></Link>!</p>
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
