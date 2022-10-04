import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { get, debounce } from 'lodash';
import MarkdownView from '../../../components/blog/MarkdownView';
import matter from 'gray-matter';

import Button from '../../../components/ui/Button';

const KEY_EDITOR_CONTENTS = 'addPostEditorValue';
const KEY_EDITOR_ERROR_STATE = 'addPostEditorValue_error';

type UserDetails = {
  name?: string | null | undefined;
  email?: string | null | undefined;
};

const editorDetaultContents = (author: UserDetails) => {
  const currentDate = new Date();
  const dateFormat = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDay()}`;

  return `
  ---
title: My Post
metaTitle: my-post
author: ${author.name!} <${author.email!}>
date: ${dateFormat}
dateUpdated: ${dateFormat}
tags:
  - personal
---
# My Post
  `;
};

interface Props {
  user: UserDetails;
}

const AddNew = ({ user }: Props) => {
  const [editorState, setEditorState] = useState<{ contents: string; metadata: Object }>({
    contents: '',
    metadata: {},
  });
  const [errorState, setErrorState] = useState<string | null>(null);

  const updateEditorContents = (contents: string | null) => {
    if (contents && contents.length > 0) {
      window.sessionStorage.setItem(KEY_EDITOR_CONTENTS, contents);
    } else {
      window.sessionStorage.setItem(KEY_EDITOR_CONTENTS, editorDetaultContents(user));
    }

    // Parse to retrieve metadata
    const { content, data } = matter(contents ?? '');
    setEditorState({ contents: content, metadata: data });
  };

  const updateErrorState = (error: string | null) => {
    if (error) {
      window.sessionStorage.setItem(KEY_EDITOR_ERROR_STATE, error);
    } else {
      window.sessionStorage.removeItem(KEY_EDITOR_ERROR_STATE);
    }

    setErrorState(error);
  };

  const onEditorMount = (editor: any, monaco: any) => {
    const prevValue = window.sessionStorage.getItem(KEY_EDITOR_CONTENTS);
    editor.getModel().setValue(prevValue);
  };

  const onEditorChange = debounce((value: any, event: any) => {
    try {
      updateEditorContents(value);
      updateErrorState(null);
    } catch (error) {
      updateErrorState(get(error, 'message', ''));
    }
  }, 200);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-row border rounded-md h-full'>
        <div className='w-1/2 '>
          <Editor
            height='100%'
            defaultLanguage='markdown'
            defaultValue={editorState.contents}
            onMount={onEditorMount}
            onChange={onEditorChange}
          />
        </div>
        <div className='w-1/2 overflow-auto'>
          <MarkdownView children={editorState.contents} />
        </div>
      </div>

      <div className='flex flex-row justify-between items-center mt-2'>
        {errorState ? (
          <div className='border rounded-md bg-amber-800 text-white p-1'>
            {errorState}
          </div>
        ) : (
          <div>Done.</div>
        )}
        <Button text='Save' enabled={!errorState} onClick={() => console.log('ok')} />
      </div>
    </div>
  );
};

export default AddNew;
