import React from 'react'
import Link from 'next/link'

const PostCard = ({ title, date, description, html, subdir, slug }) => {
    const href = `/${subdir}/${slug}`
    const hasTitle = Boolean(title && title.length > 0)

    if (!hasTitle && !html) return null

    return (
        <div className='post-card'>
            {hasTitle
                ? <time>{date}</time>
                : <Link href={href}><a className='post-card-date-link'><time>{date}</time></a></Link>}
            <div className='post-card-body'>
                {hasTitle && <Link href={href}><a>{title}</a></Link>}
                {html
                    ? <div className='post-card-snippet' dangerouslySetInnerHTML={{ __html: html }} />
                    : description && <p className='post-card-description'>{description}</p>}
            </div>
        </div>
    )
}

export default PostCard
