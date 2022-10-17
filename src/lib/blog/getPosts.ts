import qs from 'qs';
import process from 'process';
import { PostsShortResponse } from './schemas/postApi';

export default async () => {
  const query = qs.stringify(
    {
      fields: ['name', 'title', 'description', 'author', 'publishedAt'],
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

  const postsData = PostsShortResponse.parse(data);
  return postsData.data;
};
