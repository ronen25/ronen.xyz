import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Footer from '../src/components/Footer';
import StatLinks from '../src/components/StatLinks';
import fetchGithubData from './githubData';

type HomePage = InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ githubStars, githubRepos, mostUsedLanguage, posts }: HomePage) => {
  return (
    <div className='flex flex-col items-stretch h-screen'>
      <Head>
        <title>ronen.xyz</title>
        <meta name='description' content="Ronen's Blog and website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col lg:h-[42rem] p-1 bg-cornflower-500 rounded-b-lg'>
        <div className='text-5xl lg:text-8xl mt-12 lg:mt-48 text-white text-center'>
          Ronen Lapushner
        </div>

        <div className='flex flex-row self-center mt-16 mb-16 lg:h-40 w-9/12 max-w-5xl'>
          <StatLinks
            githubRepos={githubRepos}
            githubStars={githubStars}
            mostUsedLanguage={mostUsedLanguage}
          />
        </div>
      </div>

      <main className='flex flex-col w-full h-64 lg:h-full items-center justify-center'>
        <div className='flex flex-col items-center min-w-3xl max-w-5xl'>
          <div className='py-12'>
            <span className='text-9xl mr-2'>Hi.</span>
            <span>I'm Ronen.</span>
          </div>

          <div className='pb-12 text-center'>
            I am a fullstack developer passionate about web development.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const { mostUsedLanguage, githubStars, githubRepos } = await fetchGithubData();

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
