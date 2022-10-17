import qs from 'qs';
import process from 'process';
import { PostFullResponse } from './schemas/postApi';

export default async (name: string) => {
  const query = qs.stringify(
    {
      fiilters: {
        name: {
          $eq: name,
        },
      },
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

  const postsData = PostFullResponse.parse(data);
  return postsData.data[0]?.attributes;
};
