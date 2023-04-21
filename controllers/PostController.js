import prisma from "../utils/prismaClient.js";

export const store = async (req, res) => {
  try {
    const { illustration, title, authorId } = req.body;
    // console.log(illustration, title, authorId);
    const post = await prisma.post.create({
      data: {
        illustration: illustration,
        title: title,
        authorId: parseInt(authorId),
      },
    });

    res.json({ post: post });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  const { content } = req.body;
  try {
    const { postId } = req.params;
    const postUpdate = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: {
        content,
      },
    });
    res.status(200).json(postUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const onePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: "Il y a une erreur" });
  }
};

export const posts = async (req, res) => {
  try {
    const { userAuthId } = req.params;
    const posts = await prisma.post.findMany({
      where: { authorId: parseInt(userAuthId) },
    });
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Il y a une lors de récupération de users" });
  }
};

export const publishPosts = async (_, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isPublished: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Il y a une erreur" });
  }
};

export const publishAPost = async (req, res) => {
  try {
    const { postId, isPublished } = req.body;
    const post = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: {
        isPublished,
      },
    });
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: "Il y a une erreur" });
  }
};

export const destroy = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.delete({
      where: { id: parseInt(postId) },
    });
    res.status(200).json({ post: post });
  } catch (error) {
    res.status(500).json({ message: "Il y a une erreur" });
  }
};
