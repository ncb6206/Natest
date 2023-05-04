import Link from "next/link";
import { Input, Menu } from "antd";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export function LayoutHeader() {
  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <SearchInput />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}
