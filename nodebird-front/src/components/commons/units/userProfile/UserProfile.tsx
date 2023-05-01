import { Card, Avatar, Button } from "antd";
import { Dispatch, SetStateAction, useCallback } from "react";

interface IUserProfile {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function UserProfile(props: IUserProfile) {
  const onLogOut = useCallback(() => {
    props.setIsLoggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>ZC</Avatar>} title="ZeroCho" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
}
