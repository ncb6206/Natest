import NicknameEditForm from "../../src/components/commons/units/form/NicknameEditForm";
import FollowList from "../../src/components/commons/units/list/FollowList";
import Head from "next/head";

export default function Profile() {
  const followerList = [
    { nickname: "제로초" },
    { nickname: "바보" },
    { nickname: "노드버드오피셜" },
  ];
  const followingList = [
    { nickname: "제로초" },
    { nickname: "바보" },
    { nickname: "노드버드오피셜" },
  ];

  return (
    <>
      <Head>
        <title> 내 프로필 | NodeBird</title>
      </Head>
      <NicknameEditForm />
      <FollowList header="팔로잉 목록" data={followingList} />
      <FollowList header="팔로워 목록" data={followerList} />
    </>
  );
}
