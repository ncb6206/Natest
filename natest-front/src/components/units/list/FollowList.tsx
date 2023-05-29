import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import styled from "styled-components";
import IUser from "../../../../interface/user";

import { unfollowAPI, removeFollowerAPI } from "../../../commons/reducers/user";
import { useAppDispatch } from "../../../../src/commons/reducers";

const ListDiv = styled.div`
  margin-bottom: 20px;
`;

interface IFollowList {
  header: string;
  data: Array<IUser>;
  onClickMore: () => void;
  loading: boolean;
}

export default function FollowList({ header, data, onClickMore, loading }: IFollowList) {
  const dispatch = useAppDispatch();

  const onCancel = (id: number) => () => {
    if (header === "팔로잉") {
      dispatch(unfollowAPI(id));
    }
    dispatch(removeFollowerAPI(id));
  };

  return (
    <ListDiv>
      <List
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>{header}</div>}
        loadMore={
          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <Button onClick={onClickMore} loading={loading}>
              더 보기
            </Button>
          </div>
        }
        bordered
        dataSource={data}
        renderItem={(item: IUser) => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    </ListDiv>
  );
}
