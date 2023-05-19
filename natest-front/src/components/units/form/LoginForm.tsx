import { Form, Input, Button, Modal } from "antd";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logInAPI } from "../../../../src/commons/reducers/user";
import useInput from "../../commons/hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../../../src/commons/reducers";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { logInLoading, logInError } = useAppSelector((state) => state.user);
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (logInError) {
      Modal.error({ content: logInError });
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(logInAPI({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
}
