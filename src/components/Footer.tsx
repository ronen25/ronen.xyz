import Link from 'next/link';

import GithubIcon from '../assets/github.svg';
import LinkedinIcon from '../assets/linkedin.svg';
import FooterLink from './ui/FooterLink';

const Footer = () => {
  return (
    <footer className='bg-cornflower-500 px-2 py-4 w-full flex justify-center'>
      <div className='flex flex-col lg:flex-row flex-1 min-w-3xl max-w-5xl'>
        <div className='text-white ml-4 lg:ml-8 text-4xl align-top'>ronen.xyz</div>
        <ul className='flex flex-row md:flex-col text-white ml-4 mt-2'>
          <FooterLink>
            <Link href='/'>
              <a className='md:hover:font-bold transition hover:text-cyan'>Home</a>
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href='/blog'>
              <a className='md:hover:font-bold transition hover:text-cyan'>Blog</a>
            </Link>
          </FooterLink>
          <FooterLink>
            <a
              href='https://github.com/ronen25'
              className='flex flex-row items-center group transition space-x-1'
            >
              <GithubIcon
                width={16}
                height={16}
                fill={'white'}
                className='group-hover:fill-cyan'
              />
              <span className='group-hover:text-cyan md:group-hover:font-bold'>
                Github
              </span>
            </a>
          </FooterLink>
          <FooterLink>
            <a
              href='https://www.linkedin.com/in/ronen-lapushner/'
              className='flex flex-row items-center group transition space-x-1'
            >
              <LinkedinIcon
                width={16}
                height={16}
                fill={'white'}
                className='group-hover:fill-cyan'
              />
              <span className='group-hover:text-cyan md:group-hover:font-bold'>
                LinkedIn
              </span>
            </a>
          </FooterLink>
        </ul>
        <div className='grow'></div>
        <div className='self-end text-white text-sm pr-2 text-center md:text-left mt-2 md:mt-0'>
          Copyright (c) Ronen Lapushner 2022.
          <br />
          Blog posts and translations are provided under the CC-BY-4.0 license.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
