import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useDispatch, useSelector, Store } from "react-redux";
import { useRouter } from "next/router";
import useSWR from "swr";

import NicknameEditForm from "../../src/components/units/form/NicknameEditForm";
import FollowList from "../../src/components/units/list/FollowList";
import {
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from "../../src/commons/reducers/user";
import axios from "axios";
import wrapper from "../../src/commons/store/configureStore";
import { END } from "redux-saga";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

export default function Profile() {
  const router = useRouter();
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );
  const { data: followersData, error: followerError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      router.push("/");
    }
  }, [me && me.id]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return "팔로잉/팔로워 로딩 중 에러가 발생했습니다.";
  }

  if (!me) {
    return "내 정보 로딩중...";
  }

  return (
    <>
      <Head>
        <title> 내 프로필 | Natest</title>
      </Head>
      <NicknameEditForm />
      <FollowList
        header="팔로잉"
        data={followingsData}
        onClickMore={loadMoreFollowings}
        loading={!followingError && !followingsData}
      />
      <FollowList
        header="팔로워"
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followingError && !followersData}
      />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log("getServerSideProps start");
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log("getServerSideProps end");
  await context.store.sagaTask.toPromise();
});
