import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import StatLinks from '../components/StatLinks';
import fetchGithubData from '../lib/GithubData';
import Footer from '../components/Footer';

const Home = ({
  githubStars,
  githubRepos,
  mostUsedLanguage,
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>ronen.xyz</title>
        <meta name='description' content="Ronen's Blog and website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col h-[42rem] p-1 bg-cornflower-500 rounded-b-lg'>
        <div className='text-8xl mt-48 text-white text-center'>Ronen Lapushner</div>

        <div className='flex self-center mt-16 mb-16 h-40 w-9/12'>
          <StatLinks
            githubRepos={githubRepos}
            githubStars={githubStars}
            mostUsedLanguage={mostUsedLanguage}
          />
        </div>
      </div>

      <main>TODO</main>

      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const { mostUsedLanguage, githubStars, githubRepos } = await fetchGithubData();
  // TODO: Fetch top 10 blog posts or something (top 10 popular? newest?)

  return {
    props: {
      githubStars: githubStars,
      githubRepos: githubRepos,
      mostUsedLanguage: mostUsedLanguage,
      posts: [],
    },
    revalidate: 360 * 60, // 6 hours = 360 minutes * 60 seconds
  };
};

export default Home;
