import { useEffect } from "react";

import PostForm from "../src/components/units/form/PostForm";
import PostCard from "../src/components/units/list/PostCard";
import { loadPosts } from "../src/commons/reducers/post";
import { Modal } from "antd";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { QueryClient } from "react-query";
import wrapper from "../src/commons/store/configureStore";
import { useAppDispatch, useAppSelector } from "../src/commons/reducers";
import { loadMyInfo } from "../src/commons/reducers/user";

export default function Home() {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useAppSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (retweetError) {
      Modal.error({ content: retweetError });
    }
  }, [retweetError]);

  // useEffect(() => {
  //   dispatch(loadPosts());
  // }, []);

  // function onLoadMore() {
  //   if (!hasMorePosts) return;

  //   if (hasMorePosts && !loadPostsLoading) {
  //     const lastId = mainPosts[mainPosts.length - 1]?.id;
  //     dispatch(loadPosts(lastId));
  //   }
  // }

  // function onLoadMore() {}

  // const lastId = mainPosts[mainPosts.length - 1]?.id;
  // useEffect(() => {
  //   const onScroll = () => {
  //     if (
  //       window.pageYOffset + document.documentElement.clientHeight >
  //       document.documentElement.scrollHeight - 300
  //     ) {
  //       if (hasMorePosts && !loadPostsLoading) {
  //         dispatch(loadPosts(lastId));
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, [mainPosts, hasMorePosts, loadPostsLoading]);

  // useEffect(() => {
  //   const lastId = mainPosts[mainPosts.length - 1]?.id;
  //   dispatch({
  //     type: LOAD_POSTS_REQUEST,
  //     lastId,
  //   });
  // }, []);

  return (
    <>
      {me && <PostForm />}
      {/* <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMorePosts}
        loader={
          <div className="loader" key={0}>
            로딩중입니다 ...
          </div>
        }
      > */}
      {mainPosts.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
      {/* </InfiniteScroll> */}
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadPosts());
  // await store.dispatch(loadMyInfo());

  return {
    props: {},
  };
});

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//   const cookie = req ? req.headers.cookie : "";
//   axios.defaults.headers.cookie = "";
//   // 쿠키가 브라우저에 있는경우만 넣어서 실행
//   // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
//   if (req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   await store.dispatch(loadPosts());
//   await store.dispatch(loadMyInfo());

//   return {
//     props: {},
//   };
// });

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log("getServerSideProps start");
//   console.log(context.req.headers);
//   const cookie = context.req ? context.req.headers.cookie : "";
//   axios.defaults.headers.Cookie = "";
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch(loadPosts);
//   context.store.dispatch(END);
//   console.log("getServerSideProps end");
//   await context.store.sagaTask.toPromise();
// });
