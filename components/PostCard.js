import React from 'react'
import Link from 'next/link'

const PostCard = ({ title, date, subdir, slug }) => {
    return (
        <div>
            <Link href={`/${subdir}/${slug}`}>
                <a>{title}</a>
            </Link>
        </div>
    )
}

export default PostCard
