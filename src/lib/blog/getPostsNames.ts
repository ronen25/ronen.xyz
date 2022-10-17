import qs from 'qs';
import process from 'process';
import { PostsNamesResponse } from './schemas/postApi';

export default async () => {
  const query = qs.stringify(
    {
      fields: ['name'],
    },
    { encodeValuesOnly: true }
  );
  const endpoint = `http://cms.ronen.xyz/api/posts?${query}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.CMS_API_KEY || ''}`,
      Mode: 'cors',
    },
  });
  const data = await response.json();

  const postsData = PostsNamesResponse.parse(data);
  return postsData.data;
};
