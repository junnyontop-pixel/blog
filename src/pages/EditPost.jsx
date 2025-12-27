import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { useState } from "react";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts } = usePosts();

  const post = posts.find((p) => p.id === Number(id));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSave = () => {
    setPosts(
      posts.map((p) =>
        p.id === post.id ? { ...p, title, content } : p
      )
    );
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>글 편집</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "12px" }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "200px" }}
      />

      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default EditPost;