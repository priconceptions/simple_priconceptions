import React from 'react'
import Link from 'next/link'

const PostCard = ({ title, date, description, tags, subdir, slug }) => {
    return (
        <div className='post-card' style={{ marginBottom: "2rem" }}>
            <Link href={`/${subdir}/${slug}`}>
                <a>{title}</a>
            </Link>
            {/* <br></br> */}
            {/* {tags && tags.map(tag => <small style={{ marginRight: "4px", fontStyle: "italic" }}>#{tag}</small>)} */}
            <p>{description}</p>
        </div>
    )
}

export default PostCard
