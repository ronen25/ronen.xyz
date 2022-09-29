import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { debounce } from 'lodash';
import MarkdownView from '../../../components/blog/MarkdownView';

import Button from '../../../components/ui/Button';

const AddNew = () => {
  const [editorValue, setEditorValue] = useState<string>('');

  useEffect(() => {
    const storedValue = window.sessionStorage.getItem('addPostEditorValue');
    setEditorValue(storedValue ?? '');
  }, []);

  const onEditorChange = debounce((value: any, event: any) => {
    window.sessionStorage.setItem('addPostEditorValue', value);
    setEditorValue(value);
  }, 200);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-row border rounded-md h-full'>
        <div className='w-1/2'>
          <Editor
            height='100%'
            defaultLanguage='markdown'
            defaultValue={editorValue ?? '# My Post'}
            onChange={onEditorChange}
          />
        </div>
        <div className='w-1/2'>
          <MarkdownView children={editorValue} />
        </div>
      </div>

      <div className='flex flex-row justify-end mt-2'>
        <Button text='Save' />
      </div>
    </div>
  );
};

export default AddNew;
