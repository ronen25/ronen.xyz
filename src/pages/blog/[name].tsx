import { useCallback } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { get } from 'lodash';
import BlogHeader from '../../features/blog/components/BlogHeader';
import MarkdownView from '../../features/blog/components/MarkdownView';
import Footer from '../../components/Footer';
import getFullPost from '../../lib/blog/getFullPost';
import getPostsNames from '../../lib/blog/getPostsNames';
import PermaLinkIcon from '../../assets/link-45deg.svg';

type PostData = {
  postData: {
    name: string;
    title: string;
    author: string;
    publishedAt: string;
    updatedAt: string;
    views: number;
    content: string;
  };
};

const Post = ({ postData }: PostData) => {
  const { title, name, author, publishedAt, updatedAt, views, content } = postData;

  const onPermalinkClick = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`http://ronen.xyz/blog/${name}`);
    }
  }, [name]);

  return (
    <>
      <Head>
        <title>{`${title} - Ronen\'s Blog`}</title>
        <meta property='og:title' content={title} key='title' />
      </Head>

      <BlogHeader name={name} title={title} />
      <div className='flex flex-col items-center'>
        <main className='max-w-4xl my-12 mx-5 md:mx-0'>
          <div className='flex flex-row text-6xl'>
            {title}
            <PermaLinkIcon
              width={48}
              height={48}
              className='visible md:invisible hover:fill-cyan cursor-pointer transition'
              onClick={onPermalinkClick}
            />
          </div>

          {/* Metadata */}
          <div className='border-b-2'>
            <div className='text-md pt-2'>Written by {author}</div>
            <div className='text-md text-slate-600 pt-4 italic'>
              Published: {new Date(publishedAt).toDateString()}
            </div>
            {publishedAt !== updatedAt ? (
              <div className='text-md text-slate-600 italic pb-4'>
                Last updated: {new Date(updatedAt).toDateString()}
              </div>
            ) : (
              <></>
            )}
          </div>

          <MarkdownView>{content}</MarkdownView>
        </main>
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postName = get(context, 'params.name', '');
  const postData = await getFullPost(postName);

  return {
    props: {
      postData: postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postNames = await getPostsNames();
  const postPaths = postNames.map(({ attributes: { name } }) => ({
    params: { name: name },
  }));

  return {
    paths: postPaths,
    fallback: false,
  };
};

export default Post;
