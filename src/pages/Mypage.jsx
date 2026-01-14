import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { stripMarkdown } from "../utils/stripMarkdown";
import { supabase } from "../lib/supabase";
import "./Mypage.css";

function MyPage() {
  const { user, loading } = useAuth();
  const { posts, deletePost } = usePosts();
  const navigate = useNavigate();
  const { userId } = useParams(); // /user/:id → 타인, 없으면 내 페이지

  const [isFollowing, setIsFollowing] = useState(false);

  /* =========================
     페이지 소유자 계산
  ========================= */
  const pageUserId = userId ?? user?.id;
  const isMyPage = !!user && pageUserId === user.id;

  /* =========================
     로그인 가드 (내 마이페이지)
  ========================= */
  useEffect(() => {
    if (!loading && !user && !userId) {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  }, [user, loading, userId, navigate]);

  /* =========================
     팔로우 상태 체크
  ========================= */
  useEffect(() => {
    if (!user || isMyPage || !pageUserId) return;

    const checkFollow = async () => {
      const { data, error } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", user.id)
        .eq("following_id", pageUserId)
        .maybeSingle();

      if (!error) {
        setIsFollowing(!!data);
      }
    };

    checkFollow();
  }, [user, pageUserId, isMyPage]);

  /* =========================
     팔로우 / 언팔로우
  ========================= */
  const handleFollow = async () => {
    if (!user) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }
    if (isFollowing) return;

    const { error } = await supabase.from("follows").insert({
      follower_id: user.id,
      following_id: pageUserId,
    });

    if (!error) setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", user.id)
      .eq("following_id", pageUserId);

    if (!error) setIsFollowing(false);
  };

  /* =========================
     수정 / 삭제 권한 처리
  ========================= */
  const handleEdit = (e, post) => {
    e.stopPropagation();

    if (!user) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    if (post.user_id !== user.id) {
      alert("본인이 작성한 글만 수정할 수 있습니다");
      return;
    }

    navigate(`/edit/${post.id}`);
  };

  const handleDelete = (e, post) => {
    e.stopPropagation();

    if (!user) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    if (post.user_id !== user.id) {
      alert("본인이 작성한 글만 삭제할 수 있습니다");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    deletePost(post.id);
  };

  /* =========================
     해당 유저 글만 필터링
  ========================= */
  const pagePosts = useMemo(() => {
    if (!pageUserId) return [];
    return posts.filter((post) => post.user_id === pageUserId);
  }, [posts, pageUserId]);

  /* =========================
     프로필 정보 (임시: posts 기준)
  ========================= */
  const profile = pagePosts[0];

  if (!pageUserId) return null;

  return (
    <div className="mypage_container">
      {/* ===== 프로필 ===== */}
      <div className="mypage_profile">
        <img
          src={profile?.author_avatar ?? "/default-avatar.png"}
          alt="avatar"
          className="mypage_avatar"
        />
        <h2>{profile?.author_name ?? "User"}</h2>

        {!isMyPage && (
          <button
            className="btn_follow"
            onClick={isFollowing ? handleUnfollow : handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>

      <h3>{isMyPage ? "내가 쓴 글" : "작성한 글"}</h3>

      {pagePosts.length === 0 && (
        <p className="empty_text">아직 작성한 글이 없습니다.</p>
      )}

      {/* ===== 글 목록 ===== */}
      {pagePosts.map((post) => (
        <div
          key={post.id}
          className="contents"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <h4 className="title">{post.title || "(제목 없음)"}</h4>

          <p className="main_content">
            {stripMarkdown(post.content).slice(0, 80)}…
          </p>

          <div className="post_footer">
            {/* 액션 아이콘 */}
            <div className="post_actions">
              {/* 좋아요 */}
              <svg onClick={(e) => { e.stopPropagation(); console.log("좋아요!"); }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" > <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/> </svg>
              
              {/* 최고에요 */}
              <svg onClick={(e) => { e.stopPropagation(); console.log("좋아요!"); }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" > <path d="m713-280 127-297v-23H588l19-134-55 55q-8-8-28-28.5T496-736l144-144 32 32q14 14 19.5 31.5T694-780l-14 100h160q33 0 56.5 23.5T920-600v23q0 8-1.5 16t-4.5 16l-93 216q-10 22-30 35.5T747-280h-34ZM240-120H40v-400h200v80H120v240h120v80Zm267 0H160v-360l240-240 32 32q14 14 19.5 31.5T454-620l-14 100h160q33 0 56.5 23.5T680-440v24q0 8-1.5 15.5T674-385l-93 217q-10 22-30 35t-44 13Zm0-80 93-216v-24H348l19-134-127 127v247h267Zm-267 0v-247 247Z"/> </svg>
              
              {/* edit */}
              <svg onClick={(e) => handleEdit(e, post)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" > <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/> </svg>
              
              {/* delete */}
              <svg onClick={(e) => { handleDelete(e, post); }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" > <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/> </svg>
            </div>

            {/* 작성자 */}
            <div className="post_author_row">
              <img
                src={post.author_avatar}
                alt="author"
                className="post_author_avatar"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/${post.user_id}`);
                }}
              />
              <span
                className="post_author_name"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/${post.user_id}`);
                }}
              >
                {post.author_name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPage;