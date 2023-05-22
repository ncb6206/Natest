import { loadHashtagPostsAPI } from "../../../src/commons/reducers/post";
import PostCard from "../../../src/components/units/list/PostCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import wrapper from "../../../src/commons/store/configureStore";
import { LOAD_MY_INFO_REQUEST, loadMyInfoAPI } from "../../../src/commons/reducers/user";
import { END } from "redux-saga";
import { useAppDispatch, useAppSelector } from "../../..//src/commons/reducers";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

export default function Hashtag() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ref, inView] = useInView();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useAppSelector((state) => state.post);

  const RefDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      dispatch(
        loadHashtagPostsAPI({
          lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
          tag,
        })
      );
    }
  }, [inView]);

  return (
    <>
      <div>
        {mainPosts.map((c) => (
          <PostCard key={c.id} post={c} />
        ))}
      </div>
      <RefDiv ref={hasMorePosts && !loadPostsLoading ? ref : undefined}>
        {hasMorePosts && <LoadingOutlined style={{ fontSize: "20px" }} />}
      </RefDiv>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
    console.log("되는건가요?");
  }
  await store.dispatch(loadHashtagPostsAPI({ tag: context?.params?.tag }));
  await store.dispatch(loadMyInfoAPI());

  return {
    props: {},
  };
});
