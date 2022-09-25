import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className='border rounded-xl p-4 w-64 flex flex-col items-center justify-center'>
        <h1>Login</h1>
        <button
          className='border rounded-md hover:bg-cornflower-500 hover:text-white p-1'
          onClick={() => signIn()}
        >
          Login with Github
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
