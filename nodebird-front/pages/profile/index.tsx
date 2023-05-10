import { useState, useEffect } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useSWR from "swr";

import NicknameEditForm from "../../src/components/units/form/NicknameEditForm";
import FollowList from "../../src/components/units/list/FollowList";
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST } from "../../src/commons/reducers/user";
import axios from "axios";

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

export default function Profile() {
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);
  const { data: followingsData, error: followingError } = useSWR(
    `http://localhost:3065/user/followings?limit=${followingsLimit}`,
    fetcher
  );
  const { data: followersData, error: followersError } = useSWR(
    `http://localhost:3065/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (!(me && me.id)) {
      router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title> 내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={me.Followings} />
      <FollowList header="팔로워 목록" data={me.Followers} />
    </>
  );
}
