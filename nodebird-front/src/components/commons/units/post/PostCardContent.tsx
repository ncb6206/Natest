import Link from "next/link";

interface IPostData {
  postData: string;
}

export default function PostCardContent({ postData }: IPostData) {
  // 첫 번째 게시글 #해시태그 #익스프레스
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`https://www.google.com/search?q=${v.slice(1)}`} key={i}>
              {v}
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
}
