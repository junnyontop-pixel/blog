import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Mypage.css";
import { stripMarkdown } from "../utils/stripMarkdown";

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
          className="contents"
          key={post.id}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {/* 제목 */}
          <h4 className="title">
            {post.title || "(제목 없음)"}
          </h4>

          {/* 본문 미리보기 */}
          <p className="main_content">
            {stripMarkdown(post.content).slice(0, 80)}…
          </p>

          {/* footer */}
          <div className="post_footer">
            {/* 왼쪽: 액션 아이콘 */}
            <div className="post_actions">
              {/* 좋아요 */}
              <svg
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("좋아요");
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 -960 960 960"
                width="22"
              >
                <path d="M720-120H280v-520l280-280 50 50..." />
              </svg>

              {/* 수정 */}
              <svg
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit/${post.id}`);
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 -960 960 960"
                width="22"
              >
                <path d="M200-200h57l391-391..." />
              </svg>

              {/* 삭제 */}
              <svg
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("정말 삭제할까요?")) {
                    deletePost(post.id);
                  }
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 -960 960 960"
                width="22"
              >
                <path d="M280-120q-33 0-56.5..." />
              </svg>
            </div>

            {/* 오른쪽: 작성자 (내 마이페이지니까 나) */}
            <div className="post_author_row">
              {user.user_metadata?.avatar_url && (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  className="post_author_avatar"
                />
              )}
              <span className="post_author_name">
                {user.user_metadata?.user_name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPage;