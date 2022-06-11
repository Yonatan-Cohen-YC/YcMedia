import AddPost from "../AddPost/AddPost";
import LatestPosts from "../LatestPosts/LatestPosts";
import Post from "../Post/Post";
import "./Feed.css";

const Feed = ({ posts, myPosts }) => {
  /* Add user posts and following posts, sort the, by recent date */
  const all = [...posts, ...myPosts];
  const sortedPosts = all.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="feedContainer">
      <LatestPosts posts={sortedPosts} />
      <AddPost />
      <div className="Comments">{/* <CommentsBox /> */}</div>
      <div className="myPosts">
        {sortedPosts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            caption={post.caption}
            postImage={post.image.url}
            likes={post.likes}
            comments={post.comments}
            ownerImage={post.owner.avatar.url}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
