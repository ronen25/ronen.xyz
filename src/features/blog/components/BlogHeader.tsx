import { useCallback } from 'react';
import HomeIcon from '../../../assets/house-heart.svg';
import PermaLinkIcon from '../../../assets/link-45deg.svg';

interface Props {
  title?: string;
  name?: string;
}

const BlogHeader = ({ title, name }: Props) => {
  const onPermalinkClick = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`http://ronen.xyz/blog/${name}`);
    }
  }, [name]);

  return (
    <div className='flex flex-row bg-cornflower-500 px-2 py-2 w-full space-x-2'>
      <a href='/' className='text-white flex flex-row justify-center group'>
        <HomeIcon width={24} height={24} className='group-hover:fill-cyan transition' />
        <div className='ml-1 group-hover:text-cyan transition'>Home</div>
      </a>

      <div className='text-white'>/</div>

      <a href='/blog' className='text-white group'>
        <div className='group-hover:text-cyan transition'>Ronen's Blog</div>
      </a>

      {title && (
        <>
          <div className='text-white'>/</div>
          <div className='flex flex-row group'>
            <div className='text-white'>{title}</div>
            <PermaLinkIcon
              width={16}
              height={16}
              fill='white'
              className='opacity-0 group-hover:opacity-100 group-hover:fill-cyan transition cursor-pointer'
              onClick={onPermalinkClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlogHeader;
