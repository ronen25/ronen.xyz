import { useState, useMemo } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Session } from 'next-auth';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';

import ToggleButtonGroup from '../../components/ui/ToggleButtonGroup';
import AddNew from './components/AddNew';
import EditExisting from './components/EditExisting';
import RemovePost from './components/RemovePost';
import Button from '../../components/ui/Button';

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
      return <AddNew user={session?.user!} />;
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
            <div className='text-black'>
              <Button text='Log Out' onClick={() => signOut()} />
            </div>
          </div>
        </div>

        <div className='p-2 border-b-2'>
          <ToggleButtonGroup
            options={['Add New', 'Edit Existing', 'Remove Post']}
            initialOption={'Add New'}
            onCheckedOptionChanged={onCheckedOptionChanged}
          />
        </div>

        <div className='h-full w-full p-1'>{currentScreenComponent}</div>
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

  const authorizedUsers = process.env.ADMIN_AUTHORIZED_USERS?.split(',') ?? [];
  const { user } = session;
  if (!authorizedUsers.includes(user?.email!)) {
    throw new Error('Bad user');
  }

  return {
    props: {
      session: session,
    },
  };
};

export default AdminPage;
