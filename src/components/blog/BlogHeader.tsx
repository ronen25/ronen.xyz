interface Props {
  postTitle?: string;
}

const BlogHeader = ({ postTitle }: Props) => {
  return (
    <div className='flex flex-row bg-cornflower-500 px-2 py-2 w-full space-x-2'>
      <a href='/blog' className='text-white'>
        Ronen's Blog
      </a>
      {postTitle && (
        <>
          <div className='text-white'>/</div>
          <div className='text-white'>TODO</div>
        </>
      )}
    </div>
  );
};

export default BlogHeader;
