import React from 'react';
import Link from 'next/link';

import GithubIcon from '../assets/github.svg';
import LinkedinIcon from '../assets/linkedin.svg';

const Footer = () => {
  return (
    <footer className='flex flex-row bg-cornflower-500 fixed bottom-0 px-2 py-4 w-full'>
      <div className='text-white ml-8 text-4xl align-top'>ronen.xyz</div>
      <ul className='text-white ml-4 mt-2'>
        <li>
          <Link href='/'>
            <a className='hover:font-bold transition hover:text-cyan'>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/blog'>
            <a className='hover:font-bold transition hover:text-cyan'>Blog</a>
          </Link>
        </li>
        <li>Translations</li>
        <li>
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
            <span className='group-hover:text-cyan group-hover:font-bold'>Github</span>
          </a>
        </li>
        <li>
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
            <span className='group-hover:text-cyan group-hover:font-bold'>LinkedIn</span>
          </a>
        </li>
      </ul>
      <div className='grow'></div>
      <div className='self-end text-white text-sm pr-2'>
        Copyright (c) Ronen Lapushner 2022.
        <br />
        Blog posts and translations are provided under the CC-BY-4.0 license.
      </div>
    </footer>
  );
};

export default Footer;
