import Link from "next/link";
import { Input, Menu, Row, Col } from "antd";
import { LayoutHeader } from "./header/LayoutHeader";
import { useState } from "react";
import UserProfile from "../units/userProfile/UserProfile";
import LoginForm from "../units/form/LoginForm";
import { useSelector } from "react-redux";

interface ILayoutProps {
  children: JSX.Element;
}

interface IUserState {
  user: {
    isLoggedIn: boolean;
    user: {};
    signUpData: {};
    loginData: {};
  };
}

export function Layout(props: ILayoutProps) {
  const { isLoggedIn } = useSelector((state: IUserState) => state?.user);

  return (
    <>
      <LayoutHeader />
      <Row>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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
