import BlogHeader from '../../components/blog/BlogHeader';
import Footer from '../../components/Footer';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { isNumber, toNumber } from 'lodash';
import getPosts from '../../lib/blog/posts/getPosts';
import DateBrowser from '../../components/blog/DateBrowser';

type PageProps = { posts: any } & InferGetServerSidePropsType<typeof getServerSideProps>;

const BlogPage = ({ posts, dates }: PageProps) => {
  return (
    <div className='h-full'>
      <BlogHeader />
      <main className='container flex flex-row items-center justify-center mx-auto p-2 m-2 min-w-4xl max-w-8xl'>
        <div className='flex-grow'>Under construction...</div>
        <div className='mx-4 p-2 border-l-2 border-slate-300'>
          <DateBrowser dates={dates} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const requestedPage = isNumber(query['page']) ? toNumber(query['page']) : 1;

  const posts = await getPosts({ page: requestedPage.toString() });
  const dates = posts.map(({ publishdate }) => ({
    year: publishdate.getUTCFullYear(),
    month: publishdate.getUTCMonth(),
  }));

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)), // https://github.com/vercel/next.js/issues/13209
      dates,
    },
  };
};

export default BlogPage;
