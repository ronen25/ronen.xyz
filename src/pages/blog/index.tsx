import { GetStaticProps, InferGetServerSidePropsType } from 'next';
import BlogHeader from '../../components/blog/BlogHeader';
import Footer from '../../components/Footer';
import { getTop10PopularPosts } from '../../lib/PostData';

type PageProps = InferGetServerSidePropsType<typeof getStaticProps>;

const BlogPage = ({ top10PopularPosts, postsByPage }: PageProps) => {
  return (
    <div>
      <BlogHeader />
      <main className='container mx-auto p-2 m-2 min-w-4xl max-w-8xl'>
        <div className='font-mono text-center'>Under Construction</div>
      </main>
      <Footer />
    </div>
  );
};

const getStaticProps: GetStaticProps = async (context) => {
  const top10PopularPosts = await getTop10PopularPosts();
  const postsByPage: string[] = [];

  return {
    props: {
      top10PopularPosts: top10PopularPosts,
      postsByPage: postsByPage,
    },
  };
};

export default BlogPage;
