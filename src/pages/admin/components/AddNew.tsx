import { useState } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Button from '../../../components/ui/Button';

const AddNew = () => {
  const [editorValue, setEditorValue] = useState<string>('');

  const onEditorChange = (value: any, event: any) => {
    setEditorValue(value);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-row border rounded-md h-full'>
        <div className='w-1/2'>
          <Editor
            height='100%'
            defaultLanguage='markdown'
            defaultValue='# My Post'
            onChange={onEditorChange}
          />
        </div>
        <div className='w-1/2'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{editorValue}</ReactMarkdown>
        </div>
      </div>

      <div className='flex flex-row justify-end mt-2'>
        <Button text='Save' />
      </div>
    </div>
  );
};

export default AddNew;
