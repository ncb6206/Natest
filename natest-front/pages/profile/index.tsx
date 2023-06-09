import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import NicknameEditForm from "../../src/components/units/form/NicknameEditForm";
import FollowList from "../../src/components/units/list/FollowList";
import { loadMyInfoAPI, loadFollowingsAPI } from "../../src/commons/reducers/user";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../src/commons/reducers";
import wrapper from "../../src/commons/store/configureStore";
import { useQuery } from "@tanstack/react-query";
import { useGetFollowersQuery } from "../../src/commons/api/FollowersApi";
import { useGetFollowingsQuery } from "../../src/commons/api/FollowingsApi";

export default function Profile() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  const {
    data: followingsData,
    error: followingsError,
    isLoading: followingsIsLoading,
    isFetching: followingsIsFetching,
  } = useGetFollowingsQuery(followingsLimit);
  const {
    data: followersData,
    error: followersError,
    isLoading: followersIsLoading,
    isFetching: followersIsFetching,
  } = useGetFollowersQuery(followersLimit);
  const { me } = useAppSelector((state) => state.user);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  useEffect(() => {
    if (!me?.id) {
      router.push("/");
    }
  }, [me]);

  if (!me) {
    return "내 정보 로딩중...";
  }

  if (followingsError || followersError) {
    console.error(followingsError || followersError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생했습니다.</div>;
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
        loading={followingsIsLoading}
      />
      <FollowList
        header="팔로워"
        data={followersData}
        onClickMore={loadMoreFollowers}
        loading={!followingsError && !followersData}
      />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadMyInfoAPI());

  return {
    props: {},
  };
});

// export const getStaticProps = wrapper.getStaticProps((store) => async ({ req }) => {
//   const cookie = req ? req.headers.cookie : "";
//   axios.defaults.headers.Cookie = "";
//   if (req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   await store.dispatch(loadMyInfo);

//   return {
//     props: {},
//   };
// });
