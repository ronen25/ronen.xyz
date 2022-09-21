import Footer from './Footer';

type Props = {
  children: JSX.Element;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
