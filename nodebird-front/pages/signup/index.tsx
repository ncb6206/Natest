import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import { ChangeEvent, useCallback, useState } from "react";
import useInput from "../../src/components/hooks/useInput";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
`;

const SignupButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default function Signup() {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, []);

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title> 회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nickname} onChange={onChangeNickname} required />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            required
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <SignupButtonWrapper>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </SignupButtonWrapper>
      </Form>
    </>
  );
}
