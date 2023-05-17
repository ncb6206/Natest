import { Input, Menu, Row, Col, Layout } from "antd";
import { LayoutHeader } from "./header/LayoutHeader";
import UserProfile from "../../units/userProfile/UserProfile";
import LoginForm from "../../units/form/LoginForm";
import { useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { useAppSelector } from "../../../../src/commons/reducers";

interface ILayoutProps {
  children: JSX.Element;
}

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child{
    padding-left: 0 !important;
  }

  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const Header = styled(Layout.Header)`
  margin: 0 50px;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled(Layout.Content)`
  padding: 0 50px;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

export function AppLayout(props: ILayoutProps) {
  const { me } = useAppSelector((state) => state?.user);

  return (
    <Layout className="layout" style={{ backgroundColor: "#ffffff" }}>
      <Global />
      <Header>
        <LayoutHeader />
      </Header>
      <Content>
        <Row gutter={8}>
          <Col xs={24} sm={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} sm={24} md={12}>
            {props.children}
          </Col>
          <Col xs={24} sm={24} md={6}>
            {/* 보안을 위해서 noreferrer와 noopener를 사용 */}
            <a href="https://github.com/ncb6206" target="_blank" rel="noreferrer noopener">
              ncb6206's Github
            </a>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
