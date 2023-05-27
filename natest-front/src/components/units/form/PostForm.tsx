import postSlice, { addPostAPI, uploadImageAPI } from "../../../commons/reducers/post";
import { Button, Form, Input, Modal } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import useInput from "../../commons/hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../../../src/commons/reducers";
import { loadMyInfoAPI } from "../../../../src/commons/reducers/user";

export default function PostForm() {
  const dispatch = useAppDispatch();
  const [text, onChangeText, setText] = useInput("");
  const { imagePaths, addPostDone, addPostError } = useAppSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(async () => {
    if (!text || !text.trim()) {
      return Modal.error({ content: "게시글을 작성하세요." });
    }

    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append("image", p);
    });

    formData.append("content", text);

    await dispatch(addPostAPI(formData));
    if (!addPostError) await dispatch(loadMyInfoAPI());
  }, [text, imagePaths]);

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch(uploadImageAPI(imageFormData));
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(postSlice.actions.removeImageAPI(index));
    },
    []
  );

  return (
    <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={`http://localhost:3065/${v}`} style={{ width: "200px" }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}
