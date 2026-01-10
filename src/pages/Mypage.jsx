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
                  console.log("좋아요!");
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
              </svg>

              {/* 최고에요 */}
              <svg
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("좋아요!");
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="m713-280 127-297v-23H588l19-134-55 55q-8-8-28-28.5T496-736l144-144 32 32q14 14 19.5 31.5T694-780l-14 100h160q33 0 56.5 23.5T920-600v23q0 8-1.5 16t-4.5 16l-93 216q-10 22-30 35.5T747-280h-34ZM240-120H40v-400h200v80H120v240h120v80Zm267 0H160v-360l240-240 32 32q14 14 19.5 31.5T454-620l-14 100h160q33 0 56.5 23.5T680-440v24q0 8-1.5 15.5T674-385l-93 217q-10 22-30 35t-44 13Zm0-80 93-216v-24H348l19-134-127 127v247h267Zm-267 0v-247 247Z"/>
              </svg>

              {/* edit */}
              <svg
                onClick={(e) => handleEdit(e, post)}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
              </svg>

              {/* delete */}
              <svg
                onClick={(e) => {
                  handleDelete(e, post);
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
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