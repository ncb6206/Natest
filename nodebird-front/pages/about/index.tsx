import { LOAD_USER_REQUEST } from "@/src/commons/reducers/user";
import wrapper from "@/src/commons/store/configureStore";
import { Avatar, Card } from "antd";
import Head from "next/head";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title> NaKyuTae | Natest </title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="followings">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="followers">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="VIP"
          />
        </Card>
      ) : null}
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  console.log("getStaticProps");
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});
