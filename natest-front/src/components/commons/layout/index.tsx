import { Input, Menu, Row, Col } from "antd";
import { LayoutHeader } from "./header/LayoutHeader";
import UserProfile from "../../units/userProfile/UserProfile";
import LoginForm from "../../units/form/LoginForm";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";

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

export function Layout(props: ILayoutProps) {
  const { me } = useSelector((state) => state?.user);

  return (
    <>
      <Global />
      <LayoutHeader />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {props.children}
        </Col>
        <Col xs={24} md={6}>
          {/* 보안을 위해서 noreferrer와 noopener를 사용 */}
          <a href="https://github.com/ncb6206" target="_blank" rel="noreferrer noopener">
            ncb6206's Github
          </a>
        </Col>
      </Row>
    </>
  );
}
