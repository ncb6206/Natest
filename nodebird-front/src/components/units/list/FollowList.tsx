import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../../../commons/reducers/user";
import { useDispatch } from "react-redux";

const FollowListWrapper = styled(List)`
  margin-bottom: 20px;
`;

interface IFollowList {
  header: string;
  data: {
    nickname: string;
  }[];
}

export default function FollowList({ header, data }: IFollowList) {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === "팔로잉") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <FollowListWrapper
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: "20px" }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}
