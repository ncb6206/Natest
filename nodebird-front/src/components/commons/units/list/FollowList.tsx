import { StopOutlined } from "@ant-design/icons";
import { List, Button, Card } from "antd";
import styled from "styled-components";

const FollowListWrapper = styled(List)`
  margin-bottom: 20px;
`;

interface IFollowList {
  header: string;
  data: {
    nickname: string;
  }[];
}

export default function FollowList(props: IFollowList) {
  return (
    <FollowListWrapper
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{props.header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={props.data}
      renderItem={(item: any) => (
        <List.Item style={{ marginTop: "20px" }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}
