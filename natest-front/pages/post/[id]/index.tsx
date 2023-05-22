import axios from "axios";
import { useAppSelector } from "../../../src/commons/reducers";
import { LOAD_POST_REQUEST, loadPostAPI } from "../../../src/commons/reducers/post";
import { LOAD_MY_INFO_REQUEST, loadMyInfoAPI } from "../../../src/commons/reducers/user";
import Head from "next/head";
import { useRouter } from "next/router";
import wrapper from "../../../src/commons/store/configureStore";

export default function Post() {
  const { singlePost } = useAppSelector((state) => state.post);
  const router = useRouter();
  const { id } = router.query;

  //   if(router.isFallback){
  //     return <div>Loading...</div>
  //   }

  return (
    <>
      <Head>
        <title>{singlePost?.User.nickname} 님의 글</title>
        <meta name="description" content={singlePost?.content} />
        <meta property="og:title" content={`${singlePost?.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost?.content} />
        {/* <meta
          property="og:image"
          content={
            singlePost.Images[0] ? singlePost.Images[0].src : "https://natest.com/favicon.png"
          }
        /> 
        <meta property="og:url" content={`https://natest.com/post/${id}`} /> */}
      </Head>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : "";
  axios.defaults.headers.cookie = "";
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(loadMyInfoAPI());
  await store.dispatch(loadPostAPI(params?.id));

  return {
    props: {},
  };
});

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : "";
//   console.log(context);
//   axios.defaults.headers.Cookie = "";
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch({
//     type: LOAD_POST_REQUEST,
//     data: context?.params?.tag,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
//   return { props: {} };
// });

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id: "1" } },
//       { params: { id: "2" } },
//       { params: { id: "3" } },
//       { params: { id: "4" } },
//     ],
//     fallback: true,
//   };
// }
