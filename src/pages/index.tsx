import { ReactElement } from 'react';
import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';
import MainLayout from '../components/MainLayout';
import { NextPageWithLayout } from './_app';
import StatLinks from '../components/StatLinks';
import fetchGithubData from '../lib/GithubData';

type HomePage = NextPageWithLayout & InferGetStaticPropsType<typeof getStaticProps>;

const Home = ({ githubStars, githubRepos, mostUsedLanguage, posts }: HomePage) => {
  return (
    <>
      <Head>
        <title>ronen.xyz</title>
        <meta name='description' content="Ronen's Blog and website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col h-[42rem] p-1 bg-cornflower-500 rounded-b-lg'>
        <div className='text-8xl mt-48 text-white text-center'>Ronen Lapushner</div>

        <div className='flex self-center mt-16 mb-16 h-40 w-9/12 max-w-5xl'>
          <StatLinks
            githubRepos={githubRepos}
            githubStars={githubStars}
            mostUsedLanguage={mostUsedLanguage}
          />
        </div>
      </div>

      <main className='container flex flex-row content-center justify-center h-full'>
        <div className='font-mono h-96'>Under Construction</div>
      </main>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
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
