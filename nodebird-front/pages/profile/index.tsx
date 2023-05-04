import Head from "next/head";

import NicknameEditForm from "../../src/components/commons/units/form/NicknameEditForm";
import FollowList from "../../src/components/commons/units/list/FollowList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

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
      <FollowList header="팔로워 목록" data={me.followers} />
    </>
  );
}
