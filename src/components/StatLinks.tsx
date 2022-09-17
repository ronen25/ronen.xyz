import React from 'react';

import IconLink from './IconLink';
import ValueLink from './ValueLink';

import GithubIcon from '../assets/github.svg';
import LinkedinIcon from '../assets/linkedin.svg';

interface Props {
  githubRepos: number;
  githubStars: number;
  mostUsedLanguage: string;
}

const StatLinks: React.FC<Props> = ({ mostUsedLanguage, githubRepos, githubStars }) => {
  return (
    <div className='grow flex flex-row justify-between items-stretch'>
      <ValueLink title='Most Used Language' value={mostUsedLanguage} />
      <ValueLink
        title='Total Repos'
        value={githubRepos}
        url='https://github.com/ronen25'
      />
      <ValueLink
        title='Total Stars'
        value={githubStars}
        url='https://github.com/ronen25'
      />

      <IconLink
        title='My Github'
        url='https://github.com/ronen25'
        IconComponent={GithubIcon}
      />
      <IconLink
        title='My LinkedIn'
        url='https://www.linkedin.com/in/ronen-lapushner/'
        IconComponent={LinkedinIcon}
      />
    </div>
  );
};

export default StatLinks;
