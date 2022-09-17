import React from 'react';
import { isNumber } from 'lodash';

import format from '../utils/NumberFormatter';

interface Props {
  title: string;
  url?: string;
  value: number | string;
}

const ValueLink: React.FC<Props> = ({ title, url, value }: Props) => {
  return (
    <div className='flex group transition ease-in-out border border-cyan rounded-md hover:bg-tiffany-blue hover:border-tiffany-blue hover:drop-shadow-xl w-52'>
      <a className='grow flex flex-col p-2 justify-between' href={url}>
        <div className='group-hover:text-black text-white'>{title}</div>
        <div className='group-hover:text-black text-white text-7xl'>
          {isNumber(value) ? format(value) : value}
        </div>
      </a>
    </div>
  );
};

export default ValueLink;
