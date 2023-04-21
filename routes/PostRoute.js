import { Router } from "express";
import {
  store,
  updatePost,
  posts,
  onePost,
  destroy,
  publishPosts,
  publishAPost,
} from "../controllers/PostController.js";
const router = Router();

router.route("/posts").post(store);
router.route("/posts/:postId").put(updatePost);
router.route("/posts/:postId").get(onePost);
router.route("/postsAuthor/:userAuthId").get(posts);
router.route("/posts").put(publishAPost);
router.route("/pubPosts").get(publishPosts);
router.route("/posts/:postId").delete(destroy);

export default router;
