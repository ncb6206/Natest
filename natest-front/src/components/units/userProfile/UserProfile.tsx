import { LOG_OUT_REQUEST } from "../../../..//src/commons/reducers/user";
import { Card, Avatar, Button, Modal } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

export default function UserProfile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    try {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
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
              {me.Posts.length}
            </a>
          </Link>
        </div>,
        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,
        <div key="followers">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
}
