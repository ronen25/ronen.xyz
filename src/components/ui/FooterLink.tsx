interface Props {
  children: JSX.Element;
}

const FooterLink = ({ children }: Props) => {
  return <li className='p-2 lg:p-0'>{children}</li>;
};

export default FooterLink;
