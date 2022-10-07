import { prisma } from '../../db';
import { PostSchemaType } from '../schemas/post';
import addTags from '../tags/addTags';

const tagNameToId = async (tagName: string) => {
  const tagData = await prisma.tags.findUnique({
    where: {
      name: tagName,
    },
  });

  return tagData!.id;
};

export default async (post: PostSchemaType) => {
  const date = new Date();
  const dateUTC = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );

  // Add post
  const postData = await prisma.posts.create({
    data: {
      author: post.author,
      content: post.contents,
      publishdate: dateUTC,
      title: post.title,
      name: post.name,
      views: 0,
      isvisible: post.isVisible,
    },
  });

  // Add tags
  await addTags(post.tags.map((tagName) => ({ name: tagName })));

  // Add tags to the post
  const postId = postData.id;

  const tagIds = await Promise.all(post.tags.map((tag) => tagNameToId(tag)));
  const tagIdToPostIdMapping = tagIds.map((tagId) => ({
    tagid: tagId,
    postid: postId,
  }));

  await prisma.posts_tags.createMany({
    data: tagIdToPostIdMapping,
  });

  return postData;
};
