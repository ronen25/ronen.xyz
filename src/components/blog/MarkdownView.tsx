import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface Props {
  children: string;
}

const MarkdownView = ({ children }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      children={children}
      components={{
        h1({ children }) {
          return <h1 className='mb-4 text-5xl'>{children}</h1>;
        },
        p({ children }) {
          return <p className='my-3'>{children}</p>;
        },
      }}
    ></ReactMarkdown>
  );
};

export default MarkdownView;
