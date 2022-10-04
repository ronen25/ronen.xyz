import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface Props {
  children: string;
}

// TODO: DARK THEME FOR THE WHOLE THING
const MarkdownView = ({ children }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      children={children}
      className='font-serif'
      components={{
        h1({ children }) {
          return <h1 className='my-6 text-5xl'>{children}</h1>;
        },
        h2({ children }) {
          return <h2 className='my-4 text-4xl'>{children}</h2>;
        },
        h3({ children }) {
          return <h3 className='my-4 text-3xl'>{children}</h3>;
        },
        p({ children }) {
          return <p className='my-4'>{children}</p>;
        },
        a({ children, node }) {
          const href = node?.properties?.href?.toString();
          return (
            <a className='underline text-pink-500 hover:text-pink-800' href={href}>
              {children}
            </a>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className='bg-pink-200 border rounded-md p-2'>
              {children}
            </blockquote>
          );
        },
        li({ children }) {
          return (
            <li>
              {` > `}
              {children}
            </li>
          );
        },
        code({ inline, className, children }) {
          if (inline) {
            return <code className='bg-stone-100 p-1 rounded-md'>{children}</code>;
          }

          const match = /language-(\w+)/.exec(className || '');
          if (match) {
            return (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                PreTag='div'
                showLineNumbers={true}
                customStyle={{
                  borderRadius: '8px',
                }}
              />
            );
          }

          return <code className={className}>{children}</code>;
        },
      }}
    ></ReactMarkdown>
  );
};

export default MarkdownView;
