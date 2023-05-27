import Link from "next/link";
import { Input, Menu, Layout } from "antd";
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

  const onHome = useCallback(() => {
    router.push(`/`);
  }, []);

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={[router.pathname]}
      items={[
        {
          label: (
            <Link href="/">
              <a onClick={onHome}>노드버드</a>
            </Link>
          ),
          key: "/",
        },
        {
          label: (
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          ),
          key: "/profile",
        },
        {
          label: (
            <SearchInput
              enterButton
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
            />
          ),
          key: "/search",
        },
      ]}
    />
  );
}
