import React from 'react';
import Subscribe from './Subscribe';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <p>Get in touch through <Link href='mailto:someone@priyankapdhavingfun@gmail.com'><a>email</a></Link>!</p>
            <Subscribe />
        </footer>
    )
};

export default Footer;
