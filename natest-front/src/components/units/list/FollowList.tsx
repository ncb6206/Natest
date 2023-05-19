import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  unfollow,
  removeFollower,
  unfollowAPI,
  removeFollowerAPI,
} from "../../../commons/reducers/user";
import { useAppDispatch } from "../../../../src/commons/reducers";

const FollowListWrapper = styled(List)`
  margin-bottom: 20px;
`;

interface IFollowList {
  header: string;
  data: {
    nickname: string;
  }[];
  onClickMore: () => void;
  loading: boolean;
}

export default function FollowList(props: IFollowList) {
  const dispatch = useAppDispatch();
  const onCancel = (id) => () => {
    if (props.header === "팔로잉") {
      dispatch(unfollowAPI(id));
    }
    dispatch(removeFollowerAPI(id));
  };

  return (
    <FollowListWrapper
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{props.header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button onClick={props.onClickMore} loading={props.loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={props.data}
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
