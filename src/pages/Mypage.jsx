import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Mypage.css";

function MyPage() {
  const { user, loading } = useAuth();
  const { posts } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  }, [user, loading]);

  if (!user) return null;

  const myPosts = posts.filter(
    (post) => post.user_id === user.id
  );

  return (
    <div className="mypage_container">
      <div className="mypage_profile">
        <img
          src={user.user_metadata?.avatar_url}
          alt="avatar"
          className="mypage_avatar"
        />
        <h2>{user.user_metadata?.user_name}</h2>
      </div>

      <h3>내가 쓴 글</h3>

      {myPosts.map((post) => (
        <div
          key={post.id}
          className="mypage_post"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {post.title || "(제목 없음)"}
        </div>
      ))}
    </div>
  );
}

export default MyPage;