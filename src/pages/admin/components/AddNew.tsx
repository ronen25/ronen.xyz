import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { get, debounce } from 'lodash';
import MarkdownView from '../../../components/blog/MarkdownView';
import matter from 'gray-matter';

import Button from '../../../components/ui/Button';
import useFetch from '../../../lib/hooks/useFetch';
import { PostSchema, type PostSchemaType } from '../../../lib/blog/schemas/post';
import StatusIndicator from '../../../components/blog/StatusIndicator';
import { ResponseSchema } from '../../../lib/blog/schemas/response';

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
name: my-post
author: ${author.name!} <${author.email!}>
date: ${dateFormat}
dateUpdated: ${dateFormat}
tags:
  - personal
---
# My Post
  `;
};

const indicator = (isLoading: boolean, doAddPostError: any, editorError: any) => {
  let message = '';
  if (isLoading) {
    message = 'Loading...';
  } else if (doAddPostError) {
    message = JSON.stringify(doAddPostError);
  } else if (editorError) {
    message = JSON.stringify(editorError);
  } else {
    message = 'OK.';
  }

  return (
    <StatusIndicator
      status={doAddPostError || editorError ? 'error' : 'ok'}
      message={message}
    />
  );
};

interface Props {
  user: UserDetails;
}

const AddNew = ({ user }: Props) => {
  const [editorState, setEditorState] = useState<{ contents: string; metadata: Object }>({
    contents: '',
    metadata: {},
  });
  const [editorError, setEditorError] = useState<string | null>(null);
  const {
    doFetch: doAddPost,
    isLoading,
    error: doAddPostError,
  } = useFetch<typeof ResponseSchema>('POST', '/api/blog/posts', ResponseSchema);

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
      setEditorError(error);
    } else {
      window.sessionStorage.removeItem(KEY_EDITOR_ERROR_STATE);
      setEditorError(null);
    }
  };

  const onEditorMount = (editor: any, monaco: any) => {
    const prevValue = window.sessionStorage.getItem(KEY_EDITOR_CONTENTS);
    editor.getModel().setValue(prevValue);
    updateEditorContents(prevValue);
  };

  const onEditorChange = debounce((value: any, event: any) => {
    try {
      updateEditorContents(value);
      updateErrorState(null);
    } catch (error) {
      updateErrorState(get(error, 'message', ''));
    }
  }, 200);

  const onSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();

      const fullData = { ...editorState.metadata, contents: editorState.contents };
      await doAddPost(fullData);
    },
    [editorState]
  );

  return (
    <form onSubmit={onSubmit} className='flex flex-col h-full'>
      <div className='flex flex-row justify-between items-center my-1'>
        {indicator(isLoading, doAddPostError, editorError)}
        <Button type='submit' text='Save' enabled={!isLoading} />
      </div>

      <div className='flex flex-row border rounded-md grow'>
        <div className='w-1/2 '>
          <Editor
            height='100%'
            defaultLanguage='markdown'
            defaultValue={editorState.contents}
            onMount={onEditorMount}
            onChange={onEditorChange}
          />
        </div>
        <div className='w-1/2'>
          <MarkdownView children={editorState.contents} />
        </div>
      </div>
    </form>
  );
};

export default AddNew;
