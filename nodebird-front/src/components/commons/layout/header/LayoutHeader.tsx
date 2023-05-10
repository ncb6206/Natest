import Link from "next/link";
import { Input, Menu } from "antd";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { useCallback } from "react";
import { useRouter } from "next/router";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export function LayoutHeader() {
  const [searchInput, onChangeSearchInput] = useInput("");
  const router = useRouter();

  const onSearch = useCallback(() => {
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
      </Menu>
    </>
  );
}
