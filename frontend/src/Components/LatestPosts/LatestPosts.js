import "./LatestPosts.css";
import DefaultAvatar from "../../img/defaultAvatar.png";

const LatestPosts = ({ posts }) => {
  return (
    posts.length > 0 && (
      <div className="latestPostsContainer">
        <small className="textMuted small">Recent Posts</small>
        {posts.slice(0, 5).map((post) => (
          <div
            key={post._id}
            className="latestPost"
            style={{
              background: `url("${post.image.url}") no-repeat center center/cover`,
            }}
          >
            <div className="profileImage">
              <img
                src={
                  post.owner.avatar.url.includes("http")
                    ? post.owner.avatar.url
                    : DefaultAvatar
                }
                alt=""
              />
            </div>
            <p className="name">{post.owner.name}</p>
          </div>
        ))}
      </div>
    )
  );
};

export default LatestPosts;
