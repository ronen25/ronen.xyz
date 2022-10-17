import Link from 'next/link';

interface Props {
  name: string;
  title: string;
  description: string;
  author: string;
  publishedAt: Date;
  socialImage: string | undefined;
}

const PostCard = ({ name, title, description, author, publishedAt }: Props) => {
  return (
    <div className='group border border-slate-200 hover:border-hot-pink rounded-md w-full cursor-pointer p-2 transition-colors'>
      <Link href={`/blog/${name}`}>
        <div className='container'>
          <div className='text-sm text-slate-600'>{publishedAt.toDateString()}</div>
          <div className='text-4xl mb-1'>{title}</div>
          <div className='text-lg mb-2'>{description}</div>
          <div className='text-sm text-slate-600 font-bold'>
            Written by {author.split(' ')[0]}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
