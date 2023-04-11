import type { CollectionEntry } from 'astro:content';

export default (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => {
  if (a.data.publishedAt.getTime() > b.data.publishedAt.getTime()) {
    return -1;
  }

  if (a.data.publishedAt.getTime() < b.data.publishedAt.getTime()) {
    return 1;
  }

  return 0;
};
