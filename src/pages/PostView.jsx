import "./PostView.css";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // 스타일
import { useAuth } from "../context/AuthContext";

function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();

  const post = posts.find((p) => String(p.id) === String(id));

  const { user } = useAuth();

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

  if (!post) {
    return (
      <div className="post_view_page">
        <div className="post_view_card">
          <h2>Post not found</h2>
          <button className="btn_primary" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post_view_page">
      <div className="post_view_header">
        <button className="btn_ghost" onClick={() => navigate("/")}>
          ← Home
        </button>

        <button
          className="btn_primary"
          onClick={(e) => {
            handleEdit(e, post);}
          }>
          Edit
        </button>
      </div>

      <div className="post_view_card">
        <h1 className="post_view_title">{post.title}</h1>
        <div className="post_view_content markdown">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="author_display">
        {post.author_avatar && (
          <img
            onClick={ () => navigate("/mypage")}
            src={post.author_avatar}
            alt="author avatar"
            className="post_author_avatar large"
          />
        )}
        <span id="author_name">{post.author_name ?? "익명"}</span>
      </div>
    </div>
  );
}

export default PostView;