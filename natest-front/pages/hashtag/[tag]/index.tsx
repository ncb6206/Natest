import postSlice, { loadHashtagPostsAPI } from "../../../src/commons/reducers/post";
import PostCard from "../../../src/components/units/list/PostCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import wrapper from "../../../src/commons/store/configureStore";
import { loadMyInfoAPI } from "../../../src/commons/reducers/user";
import { useAppDispatch, useAppSelector } from "../../..//src/commons/reducers";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

const RefDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Hashtag() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ref, inView] = useInView();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading, loadPostsDone, loadPostsError } =
    useAppSelector((state) => state.post);

  useEffect(() => {
    if (hasMorePosts && inView) {
      dispatch(
        loadHashtagPostsAPI({
          lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
          tag,
        })
      );
    }
  }, [inView]);

  console.log(mainPosts, hasMorePosts, loadPostsLoading, loadPostsDone, loadPostsError);
  return (
    <>
      <div>
        {mainPosts?.map((c) => (
          <PostCard key={c.id} post={c} />
        ))}
      </div>
      <RefDiv ref={hasMorePosts && !loadPostsLoading ? ref : undefined}>
        {hasMorePosts && <LoadingOutlined style={{ fontSize: "20px" }} />}
      </RefDiv>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  await store.dispatch(loadHashtagPostsAPI({ tag: params?.tag }));
  await store.dispatch(loadMyInfoAPI());

  return {
    props: {},
  };
});
