import "./PostView.css";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import ReactMarkdown from "react-markdown";

function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();

  const post = posts.find((p) => String(p.id) === String(id));

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
          onClick={() => navigate(`/edit/${post.id}`)}
        >
          Edit
        </button>
      </div>

      <div className="post_view_card">
        <h1 className="post_view_title">{post.title}</h1>
        <div className="post_view_content markdown">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default PostView;