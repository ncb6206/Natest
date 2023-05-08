import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostForm from "../src/components/units/form/PostForm";
import PostCard from "../src/components/units/list/PostCard";
import { LOAD_POSTS_REQUEST } from "../src/commons/reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../src/commons/reducers/user";
import { Modal } from "antd";

export default function Home() {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (retweetError) {
      Modal.error({ content: retweetError });
    }
  }, [retweetError]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
