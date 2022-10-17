import { useMemo } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostShortSchemaType } from '../../lib/blog/schemas/post';
import { groupBy } from 'lodash';
import getPosts from '../../lib/blog/getPosts';
import BlogHeader from '../../components/blog/BlogHeader';
import Footer from '../../components/Footer';
import PostCard from '../../components/blog/PostCard';

type PageProps = {
  postsByYear: { [year: string]: PostShortSchemaType[] };
} & InferGetStaticPropsType<typeof getStaticProps>;

const BlogPage = ({ postsByYear }: PageProps) => {
  const postsCards = useMemo(() => {
    return Object.entries(postsByYear).map(([year, posts]) => {
      const postCards = posts.map(
        ({
          attributes: { title, name, author, description, publishedAt, socialimage },
        }) => (
          <div key={name} className='mb-2'>
            <PostCard
              name={name}
              title={title}
              author={author}
              description={description}
              publishedAt={new Date(Date.parse(publishedAt))}
              socialImage={socialimage}
            />
          </div>
        )
      );

      return (
        <div key={year} className='mb-2'>
          <div className='mb-2 ml-1 text-3xl'>{year}</div>
          {postCards}
        </div>
      );
    });
  }, [postsByYear]);

  return (
    <div className='h-full'>
      <BlogHeader />
      <main className='container flex flex-col items-center mx-auto p-2 m-2 min-w-3xl max-w-5xl h-screen'>
        {postsCards}
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  const postsByYear = groupBy(posts, (post) =>
    new Date(Date.parse(post?.attributes.publishedAt)).getFullYear()
  );

  return {
    props: {
      postsByYear: postsByYear,
    },
  };
};

export default BlogPage;
