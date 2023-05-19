import { logout, logoutAPI } from "../../../../src/commons/reducers/user";
import { Card, Avatar, Button, Modal } from "antd";
import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../src/commons/reducers";

export default function UserProfile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { me, logOutLoading } = useAppSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    try {
      dispatch(logoutAPI());
      router.replace("/");
      Modal.success({ content: "로그아웃되었습니다." });
    } catch (error) {
      console.error(error);
      Modal.error({ content: "로그아웃 실패하였습니다." });
    }
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`}>
            <a>
              짹짹
              <br />
              {me?.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me?.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followers">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me?.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me?.id}`} prefetch={false}>
            <a>
              <Avatar>{me?.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me?.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
}
