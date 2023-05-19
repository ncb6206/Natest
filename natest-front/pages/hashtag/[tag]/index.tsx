import { loadHashtagPostsAPI } from "../../../src/commons/reducers/post";
import PostCard from "../../../src/components/units/list/PostCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../../src/commons/reducers/user";
import { END } from "redux-saga";
import { useAppDispatch, useAppSelector } from "../../..//src/commons/reducers";

export default function Hashtag() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useAppSelector((state) => state.post);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch(
            loadHashtagPostsAPI({
              lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
              tag,
            })
          );
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, tag, loadPostsLoading]);

  return (
    <>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log(context);
//   const cookie = context.req ? context.req.headers.cookie : "";
//   console.log(context);
//   axios.defaults.headers.Cookie = "";
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch({
//     type: LOAD_HASHTAG_POSTS_REQUEST,
//     data: context?.params?.tag,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
//   return { props: {} };
// });
