import { get } from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import BlogHeader from '../../components/blog/BlogHeader';
import MarkdownView from '../../components/blog/MarkdownView';
import Footer from '../../components/Footer';
import getFullPost from '../../lib/blog/getFullPost';
import getPostsNames from '../../lib/blog/getPostsNames';

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
      </Head>

      <BlogHeader name={name} title={title} />
      <div className='flex justify-center items-center'>
        <div className='min-w-3xl max-w-4xl'>
          <MarkdownView>{content}</MarkdownView>
        </div>
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
