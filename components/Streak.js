import React from 'react';
import Link from 'next/link';
import colors from './colors';

const Streak = ({ title, date, description, tags, bg, subdir, slug }) => {

    return (
        <div>
            <Link href={`/${subdir}/${slug}`}>
                <a>{title}</a>
            </Link>
        </div>
    );
};

export default Streak;
