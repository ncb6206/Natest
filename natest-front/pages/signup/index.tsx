import Head from "next/head";
import { Form, Input, Checkbox, Button, Modal } from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import useInput from "../../src/components/commons/hooks/useInput";
import styled from "styled-components";
import { useRouter } from "next/router";
import wrapper from "../../src/commons/store/configureStore";
import { LOAD_MY_INFO_REQUEST, loadMyInfo, signup } from "../../src/commons/reducers/user";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../src/commons/reducers";

const ErrorMessage = styled.div`
  color: red;
`;

const SignupButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default function Signup() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { signUpLoading, signUpDone, me, signUpError } = useAppSelector((state) => state.user);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    if (me && me.id) {
      router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Modal.success({ content: "회원가입되었습니다." });
      router.replace("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      Modal.error({ content: signUpError });
    }
  }, [signUpError]);

  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

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
    return dispatch(signup({ email, password, nickname }));
  }, [email, nickname, password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title> 회원가입 | Natest</title>
      </Head>
      <Form onFinish={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
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

export const getStaticProps = wrapper.getStaticProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  await store.dispatch(loadMyInfo());

  return {
    props: {},
  };
});

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   console.log("getServerSideProps start");
//   console.log(context.req.headers);
//   const cookie = context.req ? context.req.headers.cookie : "";
//   axios.defaults.headers.Cookie = "";
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch(END);
//   console.log("getServerSideProps end");
//   await context.store.sagaTask.toPromise();
// });
