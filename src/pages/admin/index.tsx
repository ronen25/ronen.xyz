import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { getSession, SessionProvider, useSession } from 'next-auth/react';
import Head from 'next/head';

interface Props {
  session: Session;
}

type PageProps = Props & InferGetServerSidePropsType<typeof getServerSideProps>;

const AdminPage = ({ session }: PageProps) => {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <main>
        <div>{JSON.stringify(session)}</div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  // Check if it's me :-)
  // TODO: Figure out a better error handling
  const { user } = session;
  if (user?.email !== 'ronenk17@gmail.com') {
    throw new Error('Bad user');
  }

  return {
    props: {
      session: session,
    },
  };
};

export default AdminPage;
