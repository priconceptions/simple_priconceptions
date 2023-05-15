import React from 'react'
import Link from 'next/link'

const PostCard = ({ title, date, description, tags, subdir, slug }) => {
    return (
        <>
            {title && title.length > 0 &&
                <div className='post-card'>
                    <Link href={`/${subdir}/${slug}`}>
                        <a>{title}</a>
                    </Link>
                    <span>
                        {tags && tags.map((tag, index) => <small key={index} style={{ marginRight: "4px", fontStyle: "italic" }}>#{tag}</small>)}
                    </span>
                    <p>{description}</p>
                </div>
            }
        </>
    )
}

export default PostCard
