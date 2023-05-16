import { useCallback } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../../commons/reducers/user";
import { useAppDispatch, useAppSelector } from "../../../..//src/commons/reducers";

export default function FollowButton({ post }) {
  const dispatch = useAppDispatch();
  const { me, followLoading, unfollowLoading } = useAppSelector((state) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollow(post.User.id));
    } else {
      dispatch(follow(post.User.id));
    }
  }, [isFollowing]);

  if (post?.User.id === me.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
}
