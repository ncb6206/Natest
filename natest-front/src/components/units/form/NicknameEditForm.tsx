import { useAppDispatch, useAppSelector } from "../../../../src/commons/reducers";
import { changeNickname } from "../../../../src/commons/reducers/user";
import useInput from "../../commons/hooks/useInput";
import { Form, Input } from "antd";
import { useCallback } from "react";
import styled from "styled-components";

const EditForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

export default function NicknameEditForm() {
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");

  const onSubmit = useCallback(() => {
    dispatch(changeNickname(nickname));
  }, [nickname]);

  return (
    <EditForm>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </EditForm>
  );
}
