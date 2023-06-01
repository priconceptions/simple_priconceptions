import Link from 'next/link'
import pages from '../siteProps/pages'
import Image from 'next/image'

export default function Header() {
    return (
        <nav className='navbar'>
            <Link href='/' passHref>
                <div className='nav-banner'>
                    <Image
                        src={"/favicons/apple-touch-icon.png"}
                        alt="pirconceptions image"
                        width={50}
                        height={50}
                        className='nav-banner-icon'
                    />
                    <h2>priconceptions</h2>
                </div>
            </Link>
            <div className='nav-links'>
                {pages.map(({ link, title }, index) => <Link key={index} href={link}><p>{title}</p></Link>)}
            </div>
        </nav>
    )
}