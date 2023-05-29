import { useCallback } from "react";
import { Button } from "antd";
import { followAPI, unfollowAPI } from "../../../commons/reducers/user";
import { useAppDispatch, useAppSelector } from "../../../..//src/commons/reducers";
import { IMainPost } from "../../../../src/commons/reducers/post";

export default function FollowButton({ post }: { post: IMainPost }) {
  const dispatch = useAppDispatch();
  const { me, followLoading, unfollowLoading } = useAppSelector((state) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowAPI(post.User.id));
    } else {
      dispatch(followAPI(post.User.id));
    }
  }, [isFollowing]);

  if (post?.User.id === me?.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
}
