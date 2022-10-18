import { get } from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import BlogHeader from '../../components/blog/BlogHeader';
import MarkdownView from '../../components/blog/MarkdownView';
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

  return (
    <>
      <Head>
        <title>{`${title} - Ronen\'s Blog`}</title>
        <meta property='og:title' content={title} key='title' />
      </Head>

      <BlogHeader name={name} title={title} />
      <div className='flex flex-col items-center'>
        <main className='min-w-3xl max-w-4xl my-12'>
          <div className='text-6xl'>{title}</div>

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
