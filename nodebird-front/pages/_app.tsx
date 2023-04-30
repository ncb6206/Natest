import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <Link href="/">노드버드</Link>
        <Link href="/profile">프로필</Link>
        <Link href="/signup">회원가입</Link>
      </div>
      <Component {...pageProps} />
    </>
  );
}
