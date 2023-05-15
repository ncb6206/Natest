import { changeNickname } from "../../../../src/commons/reducers/user";
import useInput from "../../commons/hooks/useInput";
import { Form, Input } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const EditForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

export default function NicknameEditForm() {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

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
