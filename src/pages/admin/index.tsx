import { useState, useMemo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';

import ToggleButtonGroup from '../../components/ui/ToggleButtonGroup';
import AddNew from './components/AddNew';
import EditExisting from './components/EditExisting';
import RemovePost from './components/RemovePost';

interface Props {
  session: Session;
}

type PageProps = Props & InferGetServerSidePropsType<typeof getServerSideProps>;

type CurrentScreen = 'Add New' | 'Edit Existing' | 'Remove Post';

const AdminPage = ({ session }: PageProps) => {
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('Add New');

  const onCheckedOptionChanged = (currentOption?: string) => {
    setCurrentScreen(currentOption as CurrentScreen);
  };

  const currentScreenComponent = useMemo(() => {
    if (currentScreen === 'Add New') {
      return <AddNew />;
    } else if (currentScreen === 'Edit Existing') {
      return <EditExisting />;
    } else if (currentScreen === 'Remove Post') {
      return <RemovePost />;
    } else {
      return <div>Error</div>;
    }
  }, [currentScreen]);

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <main className='flex flex-col h-screen'>
        <div className='flex flex-row justify-between space-x-2 bg-cornflower-500 text-white p-2 items-center'>
          <div className='text-center'>ronen.xyz Blog Admin Panel</div>
          <div className='flex flex-row items-center'>
            <div className='text-sm mr-4'>{session?.user?.email}</div>
            <button
              className='bg-tiffany-blue-500 hover:bg-tiffany-blue-900 border hover:border-tiffany-blue-900 rounded-md p-1 text-black'
              onClick={() => signOut()}
            >
              Log Out
            </button>
          </div>
        </div>

        <div className='p-2 border-b-2'>
          <ToggleButtonGroup
            options={['Add New', 'Edit Existing', 'Remove Post']}
            initialOption={'Add New'}
            onCheckedOptionChanged={onCheckedOptionChanged}
          />
        </div>

        <div className='h-full w-full'>{currentScreenComponent}</div>
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
