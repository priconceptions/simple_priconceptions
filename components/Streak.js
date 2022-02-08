import React from 'react';
import Link from 'next/link';
import colors from './colors';

const Streak = ({ title, date, description, tags, bg, subdir, slug }) => {
    let bgColor = "";
    if (bg) {
        bgColor = colors[bg.split(".")[0]][bg.split(".")[1]]
    }
    return (
        <div style={{ backgroundColor: bgColor }}>
            <Link href={`/${subdir}/${slug}`}>
                <a>{title}</a>
            </Link>
        </div>
    );
};

export default Streak;
