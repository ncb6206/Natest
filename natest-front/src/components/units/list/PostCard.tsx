import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Card, Comment, List, Modal, Popover } from "antd";
import PostImages from "../post/PostImages";
import { useCallback, useState } from "react";
import CommentForm from "../form/CommentForm";
import PostCardContent from "../post/PostCardContent";
import {
  likePostAPI,
  removePostAPI,
  retweetAPI,
  unlikePostAPI,
  updatePostAPI,
} from "../../../commons/reducers/post";
import styled from "styled-components";
import FollowButton from "../button/FollowButton";
import Link from "next/link";
import moment from "moment";
import IPost from "../../../../interface/post";
import { useAppDispatch, useAppSelector } from "../../../../src/commons/reducers";
import userSlice from "../../../../src/commons/reducers/user";

moment.locale("ko");

const CardWrapper = styled.div`
  margin: 10px 0;
`;

export default function PostCard({ post }: IPost) {
  const dispatch = useAppDispatch();
  const { removePostLoading } = useAppSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const id = useAppSelector((state) => state.user.me?.id);
  const { removePostError } = useAppSelector((state) => state.post);
  const liked = post?.Likers?.find((v) => v.id === id);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback(
    (editText: string) => () => {
      dispatch(
        updatePostAPI({
          PostId: post.id,
          content: editText,
        })
      );
    },
    [post]
  );

  const onLike = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    return dispatch(likePostAPI(post.id));
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    return dispatch(unlikePostAPI(post.id));
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(async () => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    await dispatch(removePostAPI({ PostId: post.id }));
    if (!removePostError) dispatch(userSlice.actions.removePostOfMeAPI(post.id));
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    return dispatch(retweetAPI(post.id));
  }, [id]);

  return (
    <CardWrapper key={post?.id}>
      <Card
        cover={post?.Images[0] && <PostImages images={post?.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post?.User?.id === id ? (
                  <>
                    {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post?.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post?.RetweetId && post?.Retweet ? (
          <Card cover={post?.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <span style={{ float: "right" }}>{moment(post.createdAt).format("YYYY.MM.DD.")}</span>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post?.Retweet.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  postData={post?.Retweet.content}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                />
              }
            />
          </Card>
        ) : (
          <>
            <span style={{ float: "right" }}>{moment(post?.createdAt).format("YYYY.MM.DD.")}</span>
            <Card.Meta
              avatar={
                <Link href={`/user/${post?.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post?.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post?.User.nickname}
              description={
                <PostCardContent
                  editMode={editMode}
                  postData={post?.content}
                  onChangePost={onChangePost}
                  onCancelUpdate={onCancelUpdate}
                />
              }
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post?.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post?.Comments}
            renderItem={(item: IPost) => (
              <li>
                {item.User.nickname}
                {item.content}
                {/* <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a>
                        <Avatar>{item?.User?.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                /> */}
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
}
