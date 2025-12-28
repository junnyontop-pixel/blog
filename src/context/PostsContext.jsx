import { createContext, useContext, useState } from "react";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([
    { id: 1, title: "파이썬 독학", content: "파이썬 어쩌구저쩌구...." },
    { id: 2, title: "js 독학", content: "js 어쩌구저쩌구...." },
    { id: 3, title: "자바 독학", content: "자바 어쩌구저쩌구...." },
  ]);

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      title: "",
      content: "",
      authorId: null, // 로그인 붙일 때 사용
    };

    setPosts((prev) => [newPost, ...prev]);
    return newPost.id;
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, addPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}