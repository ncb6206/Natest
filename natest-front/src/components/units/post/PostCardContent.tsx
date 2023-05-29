import { Button, Input } from "antd";
import { useAppSelector } from "../../../../src/commons/reducers";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import useInput from "../../commons/hooks/useInput";

interface IPostData {
  postData: string;
  editMode: boolean;
  onChangePost: (editText: string) => () => void;
  onCancelUpdate: () => void;
}

export default function PostCardContent(props: IPostData) {
  const { updatePostLoading, updatePostDone } = useAppSelector((state) => state.post);
  const [editText, onChangeEditText, setEditText] = useInput(props.postData);

  useEffect(() => {
    if (updatePostDone) {
      props.onCancelUpdate();
    }
  }, [updatePostDone]);

  const onClickCancel = useCallback(() => {
    setEditText(props.postData);
    props.onCancelUpdate();
  }, []);

  // 첫 번째 게시글 #해시태그 #익스프레스
  return (
    <div>
      {props.editMode ? (
        <>
          <Input.TextArea value={editText} onChange={onChangeEditText} />
          <Button.Group>
            <Button loading={updatePostLoading} onClick={props.onChangePost(editText)}>
              수정
            </Button>
            <Button danger onClick={onClickCancel}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        props.postData?.split(/(#[^\s#]+)/g).map((v) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`https://www.google.com/search?q=${v.slice(1)}`} key={v}>
                <a target="_blank" rel="noopener noreferrer">
                  {v}
                </a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
}
