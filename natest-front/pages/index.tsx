import { useEffect } from "react";

import PostForm from "../src/components/units/form/PostForm";
import PostCard from "../src/components/units/list/PostCard";
import { loadPostsAPI } from "../src/commons/reducers/post";
import { Modal } from "antd";
import axios from "axios";
import wrapper from "../src/commons/store/configureStore";
import { useAppDispatch, useAppSelector } from "../src/commons/reducers";
import { loadMyInfoAPI } from "../src/commons/reducers/user";
import { useInView } from "react-intersection-observer";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const RefDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
  const dispatch = useAppDispatch();
  const [ref, inView] = useInView();
  const { me } = useAppSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useAppSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (retweetError) {
      Modal.error({ content: retweetError });
    }
  }, [retweetError]);

  useEffect(() => {
    if (hasMorePosts && inView) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsAPI(lastId));
    }
  }, [inView]);

  return (
    <>
      {me && <PostForm />}
      <div>
        {mainPosts.map((post) => (
          <PostCard key={post?.id} post={post} />
        ))}
      </div>
      <RefDiv ref={hasMorePosts && !loadPostsLoading ? ref : undefined}>
        {hasMorePosts && <LoadingOutlined style={{ fontSize: "20px" }} />}
      </RefDiv>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadPostsAPI());
  await store.dispatch(loadMyInfoAPI());

  return {
    props: {},
  };
});
