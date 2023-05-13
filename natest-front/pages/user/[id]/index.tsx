import { useEffect } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_POSTS_REQUEST } from "../../../src/commons/reducers/post";
import Head from "next/head";
import { Avatar, Card } from "antd";
import PostCard from "../../../src/components/units/list/PostCard";
import wrapper from "../../../src/commons/store/configureStore";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from "../../../src/commons/reducers/user";
import { END } from "redux-saga";

export default function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const onScroll = () => {
  //     if (
  //       window.scrollY + document.documentElement.clientHeight >
  //       document.documentElement.scrollHeight - 300
  //     ) {
  //       if (hasMorePosts && !loadPostsLoading) {
  //         dispatch({
  //           type: LOAD_USER_POSTS_REQUEST,
  //           lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
  //           data: id,
  //         });
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  function onLoadMore() {
    if (!hasMorePosts) return;

    if (hasMorePosts && !loadPostsLoading) {
      dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
        data: id,
      });
    }
  }

  return (
    <>
      {userInfo && (
        <Head>
          <title>{userInfo.nickname} 님의 글</title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          {/* <meta property="og:image" content="https://natest.com/favicon.png" />
          <meta property="og:url" content={`https://natest.com/user/${id}`} /> */}
        </Head>
      )}
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="followings">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="followers">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={hasMorePosts}
        loader={
          <div className="loader" key={0}>
            로딩중입니다 ...
          </div>
        }
      >
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </>
  );
}
