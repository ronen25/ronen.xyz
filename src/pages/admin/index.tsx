import { GetServerSideProps } from 'next';

const AdminPage = () => {};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://cms.ronen.xyz/admin',
      permanent: true,
    },
  };
};

export default AdminPage;
