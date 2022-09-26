import Editor from '@monaco-editor/react';
import MetadataEditor from './MetadataEditor';

const AddNew = () => {
  return (
    <div className='flex flex-col h-full'>
      <details>
        <summary>Metadata</summary>
        <div className='mb-8'>
          <MetadataEditor
            initialMetadata={{
              title: '',
              desc: '',
              socialImage: '',
              date: '',
              tags: '',
            }}
          />
        </div>
      </details>

      <div className='border rounded-md h-full'>
        <Editor height='100%' defaultLanguage='markdown' defaultValue='# My Post' />
      </div>
    </div>
  );
};

export default AddNew;
