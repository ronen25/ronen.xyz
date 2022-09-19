import React, { ReactNode } from 'react';

interface Props {
  title: string;
  url: string;
  IconComponent: typeof React.Component;
}

const IconLink: React.FC<Props> = ({ title, url, IconComponent }: Props) => {
  return (
    <div className='flex group transition ease-in-out border border-cyan rounded-md hover:bg-tiffany-blue hover:border-tiffany-blue hover:drop-shadow-xl w-32'>
      <a className='grow flex flex-col p-2 justify-between' href={url}>
        <div className='text-white group-hover:text-black text-center'>{title}</div>
        <IconComponent
          width={64}
          height={64}
          className='self-center group-hover:fill-black fill-white'
        />
      </a>
    </div>
  );
};

export default IconLink;
