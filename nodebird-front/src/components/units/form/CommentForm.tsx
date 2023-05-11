import { Button, Form, Input, Modal } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../../commons/hooks/useInput";
import { ADD_COMMENT_REQUEST } from "../../../commons/reducers/post";

export default function CommentForm({ post }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    if (!commentText) {
      return Modal.error({ content: "메세지를 입력해주세요!" });
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button
          type="primary"
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          htmlType="submit"
          loading={addCommentLoading}
        >
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
}
