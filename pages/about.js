import Head from 'next/head'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h2>
      <i>
        Welcome to my online home
      </i>
      </h2>
      <p>
        This is a space dedicated to remembering my learnings, thoughts, and days.
      </p>
      <p><i>I write to forget things now and remember them tomorrow. </i></p>
      <h2>
        Work with me on Focusmate
      </h2>
      <p>
        How Focusmate works-- you book 25/50/75 minute sessions and get paired with random people on the platform. I usually work in 25 minute sessions and this platform has been invaluable to my sanity.
      </p>
      <p>Book sessions and work with me <Link href='https://www.focusmate.com/i/NVx59ZDMqI'><a>here</a></Link>.</p>
      <h2>
        Say hi
      </h2>
      <p> I don't track anything on this site so the only way I'll know you're here is if you <Link href='mailto:someone@priyankapdhavingfun@gmail.com'><a>email me</a></Link>.</p>
    </>
  )
}
