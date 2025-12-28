// context/PostsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  /* 🔹 초기 로딩 */
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setPosts(data || []);
  };

  /* ✅ 글 추가 */
  const addPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: "",
        content: "",
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    // ✅ prepend
    setPosts((prev) => [data, ...prev]);
    return data.id;
  };

  /* ✅ 글 수정 (🔥 fetchPosts 절대 X) */
  const updatePost = async (id, updates) => {
    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    // ✅ 핵심 코드
    setPosts((prev) =>
      prev.map((p) => (p.id === data.id ? data : p))
    );
  };

  /* ✅ 글 삭제 */
  const deletePost = async (id) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PostsContext.Provider
      value={{ posts, addPost, updatePost, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}