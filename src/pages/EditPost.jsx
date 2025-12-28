import "./EditPost.css";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ setPosts 제거, updatePost 사용
  const { posts, updatePost } = usePosts();

  const post = useMemo(
    () => posts.find((p) => String(p.id) === String(id)),
    [posts, id]
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!post) return;
    setTitle(post.title ?? "");
    setContent(post.content ?? "");
  }, [post]);

  /* =========================
     ✅ 저장 (Supabase update)
  ========================= */
  const handleSave = async () => {
    await updatePost(post.id, {
      title: title.trim(),
      content,
    });

    navigate("/");
  };

  if (!post) {
    return (
      <div className="editor_page">
        <div className="editor_shell">
          <div className="editor_header">
            <button className="btn_ghost" onClick={() => navigate("/")}>
              ← Back
            </button>
          </div>

          <div className="editor_card">
            <h2 className="editor_title">Post not found</h2>
            <p className="editor_desc">
              해당 글이 없어요. 홈으로 돌아가서 다시 선택해줘.
            </p>
            <button className="btn_primary" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor_page">
      <div className="editor_shell">
        {/* 상단 바 */}
        <div className="editor_header">
          <button className="btn_ghost" onClick={() => navigate("/")}>
            ← Home
          </button>

          <div className="editor_header_right">
            <span className="editor_badge">Editing #{post.id}</span>
            <button className="btn_primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>

        {/* 카드 */}
        <div className="editor_card">
          <input
            className="editor_input_title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />

          <div className="editor_meta">
            <span className="meta_item">Draft</span>
            <span className="meta_dot" />
            <span className="meta_item">{content.length} chars</span>
          </div>

          <div className="editor_grid">
            {/* 작성 */}
            <div className="editor_panel">
              <div className="panel_head">
                <span className="panel_title">Write</span>
              </div>

              <textarea
                className="editor_textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요..."
              />
            </div>

            {/* 미리보기 */}
            <div className="editor_panel">
              <div className="panel_head">
                <span className="panel_title">Preview</span>
              </div>

              <div className="editor_preview markdown">
                <h3 className="preview_title">
                  {title || "제목 미리보기"}
                </h3>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {content || "내용 미리보기..."}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* 하단 */}
          <div className="editor_footer">
            <button
              className="btn_danger_outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button className="btn_primary" onClick={handleSave}>
              Save & Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;