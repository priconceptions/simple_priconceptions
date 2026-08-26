const EXCERPT_LENGTH = 320

function stripMarkdown(markdown) {
    return markdown
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/^\s{0,3}#{1,6}\s+/gm, '')
        .replace(/^\s{0,3}>\s?/gm, '')
        .replace(/^\s{0,3}([-*+]|\d+\.)\s+/gm, '')
        .replace(/`([^`]*)`/g, '$1')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/(^|\s)__(.+?)__(?=\s|$|[.,;:!?])/g, '$1$2')
        .replace(/(^|\s)_(.+?)_(?=\s|$|[.,;:!?])/g, '$1$2')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

function truncateAtWord(text, maxLength) {
    if (text.length <= maxLength) return text
    const cut = text.slice(0, maxLength)
    const lastSpace = cut.lastIndexOf(' ')
    return lastSpace > 0 ? cut.slice(0, lastSpace) : cut
}

function stripTrailingPunctuation(text) {
    return text.replace(/[\s,;:.!?-]+$/, '')
}

// Builds a short teaser for a post: the frontmatter description verbatim when
// present, otherwise the opening of the body with markdown stripped and "..." appended.
export function makeExcerpt(frontmatter, content, maxLength = EXCERPT_LENGTH) {
    const description = (frontmatter.description || '').trim()
    if (description.length > 0) return description

    const body = stripMarkdown(content || '')
    if (body.length === 0) return ''
    return `${stripTrailingPunctuation(truncateAtWord(body, maxLength))}...`
}
