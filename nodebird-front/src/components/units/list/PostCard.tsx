import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Card, Comment, List, Modal, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PostImages from "../post/PostImages";
import { useCallback, useState } from "react";
import CommentForm from "../form/CommentForm";
import PostCardContent from "../post/PostCardContent";
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../../../commons/reducers/post";
import styled from "styled-components";
import FollowButton from "../button/FollowButton";
import Link from "next/link";

interface IPostCard {
  post: {
    id: number;
    User: {
      id: number;
      email: string;
      nickname: string;
    };
    content: string;
    createdAt: object;
    Comments: {
      id: number;
      content: string;
    };
    Images: {
      id: number;
      src: string;
    };
  };
}

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return Modal.error({ content: "로그인이 필요합니다." });
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  return (
    <CardWrapper key={post.id}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
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
                {id && post.UserId === id ? (
                  <>
                    <Button>수정</Button>
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
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
}
