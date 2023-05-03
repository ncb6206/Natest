import PostForm from "../src/components/commons/units/form/PostForm";
import PostCard from "../src/components/commons/units/list/PostCard";
import { useSelector } from "react-redux";

export default function Home() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </>
  );
}
