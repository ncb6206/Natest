import { loadHashtagPostsAPI } from "../../../src/commons/reducers/post";
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
import { Modal } from "antd";

const RefDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function HashtagDetailPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ref, inView] = useInView();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading, loadPostsDone, loadPostsError } =
    useAppSelector((state) => state.post);

  console.log(tag);

  if (typeof tag !== "string") {
    Modal.error({ content: "올바른 경로로 접속해주세요." });
    return <></>;
  }

  useEffect(() => {
    if (hasMorePosts && inView) {
      dispatch(
        loadHashtagPostsAPI({
          lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
          tag: tag,
        })
      );
    }
  }, [inView]);

  // console.log(mainPosts, hasMorePosts, loadPostsLoading, loadPostsDone, loadPostsError);
  return (
    <>
      <div>
        {mainPosts.length ? (
          mainPosts?.map((c) => <PostCard key={c.id} post={c} />)
        ) : (
          <>
            <span>해당 해시태그로 작성된 글이 없습니다. 첫 글을 게시해보세요!</span>
          </>
        )}
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

  if (typeof params?.tag !== "string") {
    Modal.error({ content: "올바른 경로로 접속해주세요." });
    return <></>;
  }

  await store.dispatch(loadHashtagPostsAPI({ tag: params?.tag }));
  await store.dispatch(loadMyInfoAPI());

  return {
    props: {},
  };
});
