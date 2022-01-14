import Link from 'next/link'
import pages from '../siteProps/pages'

export default function Header() {
    return (
        <nav className='navbar'>
            <div className='nav-banner'>
                <Link href='/' passHref>
                    <h2>Priconceptions</h2>
                </Link>
            </div>
            <div className='nav-links'>
                {pages.map(({ link, title }, index) => <Link key={index} href={link}><p>{title}</p></Link>)}
            </div>
        </nav>
    )
}