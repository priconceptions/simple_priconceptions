import React from 'react';
import Subscribe from './Subscribe';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <p>Follow me on <Link href='https://twitter.com/priDhulkhed'><a>Twitter</a></Link> or get in touch through <Link href='mailto:someone@priyankapdhavingfun@gmail.com'><a>email</a></Link>!</p>
            <Subscribe />
        </footer>
    )
};

export default Footer;
