import Comment from "./comment";
import User from "./user";

export default interface Post {
  id: number;
  content: string;
  Likers: Partial<User>[];
  Images: Array<{ src: string }>;
  RetweetId?: number;
  Retweet?: Post;
  User: Partial<User> & { id: number };
  createdAt: string;
  Comment: Comment[];
}
