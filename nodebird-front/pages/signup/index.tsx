import Head from "next/head";
import { Form, Input, Checkbox, Button, Modal } from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useInput from "../../src/components/hooks/useInput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { SIGN_UP_REQUEST } from "../../reducers/user";

const ErrorMessage = styled.div`
  color: red;
`;

const SignupButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, me, signUpError } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      router.push("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      Modal.error({ content: signUpError });
    }
  }, [signUpError]);

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (me) {
      alert("로그인했으니 메인페이지로 이동합니다.");
      router.push("/");
    }
  }, [me && me.id]);

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname,
      },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title> 회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-email">아이디</label>
          <br />
          <Input name="user-email" value={email} onChange={onChangeEmail} required />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} onChange={onChangeNickname} required />
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
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </SignupButtonWrapper>
      </Form>
    </>
  );
}
